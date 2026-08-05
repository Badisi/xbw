import { getIsosInfo, verifyWithAbgx360 } from "@badisi/xbw";
//#region package.json
var version = "3.0.1";
//#endregion
//#region src/cli.ts
const colorize = (message, color) => process.stdout.isTTY ? `${color}${message}\x1b[0m` : message;
const blue = (message) => colorize(message, "\x1B[34m");
const bold = (message) => colorize(message, "\x1B[1m");
const cyan = (message) => colorize(message, "\x1B[36m");
const dim = (message) => colorize(message, "\x1B[2m");
const gray = (message) => colorize(message, "\x1B[90m");
const green = (message) => colorize(message, "\x1B[32m");
const italic = (message) => colorize(message, "\x1B[3m");
const red = (message) => colorize(message, "\x1B[31m");
const white = (message) => colorize(message, "\x1B[37m");
(async () => {
	const args = process.argv.slice(2);
	const originalConsoleError = console.error;
	console.error = (message) => originalConsoleError(red(message));
	try {
		switch (args.shift()) {
			case "verify":
				await verifyWithAbgx360(args, void 0, console.log);
				break;
			case "info":
				console.log(cyan(JSON.stringify(await getIsosInfo(args), null, 2)));
				break;
			default:
				console.log(blue(bold("        _")));
				console.log(blue(bold("  __  _| |____      __")));
				console.log(blue(bold("  \\ \\/ / '_ \\ \\ /\\ / /")));
				console.log(blue(bold("   >  <| |_) \\ V  V / ")));
				console.log(`${blue(bold("  /_/\\_\\_.__/ \\_/\\_/"))} ${green(italic(`v${version}`))}`);
				console.log();
				console.log(`  ${white(bold("Usage:"))}`);
				console.log();
				console.log(`    ${gray("$")} ${cyan("xbw <command> <file|folder...>")} ${cyan(dim("[options] [--help]"))}`);
				console.log();
				console.log(`  ${white(bold("Commands:"))}`);
				console.log();
				console.log(`    ${cyan("info")} ${gray(".".repeat(6))} ${white("Extract information from backup iso files")}`);
				console.log(`    ${cyan("verify")} ${gray(".".repeat(4))} ${white("Verify backup iso files integrity against abgx360")}`);
				console.log();
				console.log(`  ${white(bold("Examples:"))}`);
				console.log();
				console.log(`    ${gray("$")} ${cyan("xbw info .")}`);
				console.log(`    ${gray("$")} ${cyan("xbw info backup1.iso backup2.iso path/to/backups/folder/")}`);
				console.log(`    ${gray("$")} ${cyan("xbw verify backup.iso --corrupt --af3 --patchgarbage --patchitanyway")}`);
				console.log(`    ${gray("$")} ${cyan("xbw verify backup1.iso backup2.iso path/to/backups/folder")}`);
				console.log(`    ${gray("$")} ${cyan("xbw verify backup.iso --html > output-file.html")}`);
				console.log();
		}
	} catch (error) {
		const msg = error instanceof Error ? error.message : String(error);
		console.error(msg);
	}
})();
//#endregion
export {};
