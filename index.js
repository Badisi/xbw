// @ts-check

const xbw = require('node-gyp-build')(__dirname);
const { lstatSync, readdirSync, existsSync } = require('fs');
const { join } = require('path');

/** @param {string[]} args */
const getIsoFilesFromArgs = (args = []) => {
    const files = [];
    args
        .filter(arg => !arg.startsWith('-'))
        .forEach(arg => {
            if (existsSync(arg) && lstatSync(arg).isDirectory()) {
                files.push(...readdirSync(arg).reduce((files, itemName) => {
                    const itemPath = join(arg, itemName);
                    if (lstatSync(itemPath).isDirectory()) {
                        return [...files, ...getIsoFilesFromArgs([itemPath])];
                    }
                    return /** @type {string[]} */(itemName.endsWith('.iso') ? [...files, itemPath] : files);
                }, /** @type {string[]} */([])));
            } else {
                files.push(arg);
            }
        });
    return files;
};

/** @type {import('./index').verifyWithAbgx360} */
const verifyWithAbgx360 = (args = [], options, onProgress) => {
    if (Array.isArray(args)) {
        const isoPaths = args.filter(arg => !arg.startsWith('-'));
        const files = getIsoFilesFromArgs(isoPaths);
        if (isoPaths.length && !files.length) {
            throw new Error('Error: xbw.verifyWithAbgx360: no ISO files were found');
        }

        let abgxOptions = ['--help'];
        if (files.length) {
            abgxOptions = args.filter(arg => arg.startsWith('-'));
            if (options) {
                /**
                 * TypeScript is not smart enough to figure out what filter() does.
                 * So we need to cast the result as being string[] and not (string | undefined)[].
                 */
                const items = /** @type {string[]} */(Object
                    .keys(options)
                    .map(key => {
                        if (typeof options[key] === 'string') {
                            return `--${key} ${options[key]}`;
                        } else if (typeof options[key] === 'number') {
                            return `--${key} ${String(options[key])}`;
                        } else if (options[key] === false) {
                            return undefined; // no-op
                        }
                        return `--${key}`;
                    })
                    .filter(option => option)); // filter out the no-op
                abgxOptions.push(...items);
            }
        }
        return new Promise((resolve, reject) => {
            xbw.verifyWithAbgx360(
                abgxOptions.concat(files),
                (/** @type {any} */ error, /** @type {any[]} */ results, /** @type {string} */ progress) => {
                    if (progress && onProgress) {
                        if (progress.includes('<loader>')) {
                            progress = progress.replace(' ', '&nbsp;');
                        }
                        onProgress(progress);
                    }
                    if (error) {
                        return reject(error);
                    }
                    if (results) {
                        return resolve(files.map((file, index) => {
                            return { file, status: results?.[index] ?? -1 };
                        }));
                    }
                }
            );
        });
    } else {
        throw new Error('Error: xbw.verifyWithAbgx360: `args` parameter should be of type Array');
    }
};

/** @type {import('./index').getIsosInfo} */
const getIsosInfo = (isoPaths = []) => {
    if (Array.isArray(isoPaths)) {
        const files = getIsoFilesFromArgs(isoPaths);
        if (files.length) {
            return files.map(file => {
                try {
                    return {
                        ...xbw.getIsoInfo(file),
                        isValid: true
                    };
                } catch (error) {
                    console.error(`Error: xbw.getIsosInfo: ${error.message}\n    for file: ${file}`);
                    return { file, isValid: false };
                }
            });
        } else {
            throw new Error('Error: xbw.getIsosInfo: no ISO files were found');
        }
    } else {
        throw new Error('Error: xbw.getIsosInfo: `isoPaths` parameter should be of type Array');
    }
};

module.exports = {
    verifyWithAbgx360,
    getIsosInfo
};
