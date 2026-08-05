Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let node_module = require("node:module");
let node_fs_promises = require("node:fs/promises");
let node_path = require("node:path");
let node_url = require("node:url");
//#region src/index.ts
let Region = /* @__PURE__ */ function(Region) {
	Region["REGION_FREE"] = "REGION_FREE";
	Region["OTHER"] = "OTHER";
	Region["OTHER_UNKNOWN"] = "OTHER_UNKNOWN";
	Region["PAL"] = "PAL";
	Region["PAL_EXCLUDE_AUS_NZ"] = "PAL_EXCLUDE_AUS_NZ";
	Region["PAL_ONLY_AUS_NZ"] = "PAL_ONLY_AUS_NZ";
	Region["PAL_UNKNOWN"] = "PAL_UNKNOWN";
	Region["NTSC_J"] = "NTSC_J";
	Region["NTSC_J_EXCLUDE_CHINA"] = "NTSC_J_EXCLUDE_CHINA";
	Region["NTSC_J_EXCLUDE_JAPAN"] = "NTSC_J_EXCLUDE_JAPAN";
	Region["NTSC_J_EXCLUDE_JAPAN_CHINA"] = "NTSC_J_EXCLUDE_JAPAN_CHINA";
	Region["NTSC_J_ONLY_JAPAN"] = "NTSC_J_ONLY_JAPAN";
	Region["NTSC_J_ONLY_CHINA"] = "NTSC_J_ONLY_CHINA";
	Region["NTSC_J_ONLY_JAPAN_CHINA"] = "NTSC_J_ONLY_JAPAN_CHINA";
	Region["NTSC_J_UNKNOWN"] = "NTSC_J_UNKNOWN";
	Region["NTSC_U"] = "NTSC_U";
	Region["NTSCU_UNKNOW"] = "NTSCU_UNKNOW";
	return Region;
}({});
let AbgxStatus = /* @__PURE__ */ function(AbgxStatus) {
	AbgxStatus[AbgxStatus["VERIFIED"] = 0] = "VERIFIED";
	AbgxStatus[AbgxStatus["ERROR"] = -1] = "ERROR";
	AbgxStatus[AbgxStatus["DATA_ERROR"] = -2] = "DATA_ERROR";
	AbgxStatus[AbgxStatus["STEALTH_ERROR"] = -3] = "STEALTH_ERROR";
	return AbgxStatus;
}({});
let _xbw;
const getXbw = () => {
	if (!_xbw) {
		const __dirname = (0, node_path.dirname)((0, node_url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
		_xbw = (0, node_module.createRequire)(require("url").pathToFileURL(__filename).href)("node-gyp-build")(__dirname);
	}
	return _xbw;
};
const getIsoFilesFromArgs = async (args = []) => {
	const files = [];
	for (const arg of args.filter((a) => !a.startsWith("-"))) try {
		if ((await (0, node_fs_promises.lstat)(arg)).isDirectory()) for (const itemName of await (0, node_fs_promises.readdir)(arg)) try {
			const itemPath = (0, node_path.join)(arg, itemName);
			if ((await (0, node_fs_promises.lstat)(itemPath)).isDirectory()) files.push(...await getIsoFilesFromArgs([itemPath]));
			else if (itemName.endsWith(".iso")) files.push(itemPath);
		} catch {}
		else files.push(arg);
	} catch {
		files.push(arg);
	}
	return files;
};
const verifyWithAbgx360 = async (args = [], options, onProgress) => {
	if (Array.isArray(args)) {
		const isoPaths = args.filter((arg) => !arg.startsWith("-"));
		const files = await getIsoFilesFromArgs(isoPaths);
		if (isoPaths.length && !files.length) throw new Error("Error: xbw.verifyWithAbgx360: no ISO files were found");
		let abgxOptions = ["--help"];
		if (files.length) {
			abgxOptions = args.filter((arg) => arg.startsWith("-"));
			if (options) {
				const items = Object.keys(options).map((key) => {
					const value = options[key];
					if (typeof value === "string") return `--${key} ${value}`;
					else if (typeof value === "number") return `--${key} ${String(value)}`;
					else if (value === false) return;
					return `--${key}`;
				}).filter((option) => option !== void 0);
				abgxOptions.push(...items);
			}
		}
		return new Promise((resolve, reject) => {
			getXbw().verifyWithAbgx360(abgxOptions.concat(files), (error, results, progress) => {
				if (progress && onProgress) {
					if (progress.includes("<loader>")) progress = progress.replace(" ", "&nbsp;");
					onProgress(progress);
				}
				if (error) return reject(error);
				if (results) return resolve(files.map((file, index) => {
					var _results$index;
					return {
						file,
						status: (_results$index = results === null || results === void 0 ? void 0 : results[index]) !== null && _results$index !== void 0 ? _results$index : -1
					};
				}));
			});
		});
	} else throw new Error("Error: xbw.verifyWithAbgx360: `args` parameter should be of type Array");
};
const getIsosInfo = async (isoPaths = []) => {
	if (Array.isArray(isoPaths)) {
		const files = await getIsoFilesFromArgs(isoPaths);
		if (files.length) return files.map((file) => {
			try {
				return {
					...getXbw().getIsoInfo(file),
					isValid: true
				};
			} catch (error) {
				const msg = error instanceof Error ? error.message : String(error);
				console.error(`Error: xbw.getIsosInfo: ${msg}\n    for file: ${file}`);
				return {
					file,
					isValid: false
				};
			}
		});
		else throw new Error("Error: xbw.getIsosInfo: no ISO files were found");
	} else throw new Error("Error: xbw.getIsosInfo: `isoPaths` parameter should be of type Array");
};
//#endregion
exports.AbgxStatus = AbgxStatus;
exports.Region = Region;
exports.getIsosInfo = getIsosInfo;
exports.verifyWithAbgx360 = verifyWithAbgx360;
