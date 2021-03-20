const xbw = require('bindings')('xbw');

function verifyWithAbgx360(isoPaths, options, onProgress) {
    if (Array.isArray(isoPaths)) {
        const abgxOptions = (!options) ? [] : Object
            .keys(options)
            .map((key) => {
                if (typeof options[key] === 'string') {
                    return `--${key} ${options[key]}`;
                } else if (typeof options[key] === 'number') {
                    return `--${key} ${String(options[key])}`;
                }
                return `--${key}`;
            })
            .join(' ')
            .split(' ');

        return new Promise((resolve, reject) => {
            xbw.verifyWithAbgx360(
                abgxOptions.concat(isoPaths),
                (results, error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(isoPaths.map((isoPath, index) => {
                        return { file: isoPath, status: results[index] };
                    }));
                },
                (progress) => {
                    if (onProgress) {
                        onProgress(progress);
                    }
                }
            );
        });
    } else {
        throw 'Error: verifyWithAbgx360: `files` parameter should be of type Array';
    }
}

function getIsosInfo(isoPaths) {
    if (Array.isArray(isoPaths)) {
        return isoPaths?.map(isoPath => {
            try {
                return {
                    ...xbw.getIsoInfo(isoPath),
                    isValid: true
                };
            } catch (error) {
                console.error(`${error.message}\n${isoPath}`);
                return { file: isoPath, isValid: false };
            }
        });
    } else {
        throw 'Error: getIsosInfo: `files` parameter should be of type Array';
    }
}

module.exports = {
    verifyWithAbgx360,
    getIsosInfo
};
