"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeFileCommand = exports.changeDirectoryCommand = exports.exitCommand = exports.executeAbleCommands = exports.Command = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const handler = (err, stdout, stderr) => {
    if (err) {
        console.log(chalk_1.default.redBright(err.message));
    }
    if (stderr) {
        console.log(chalk_1.default.redBright(stderr));
    }
    if (stdout) {
        console.log(chalk_1.default.yellow(stdout));
    }
};
class Command {
}
exports.Command = Command;
class ExecutableCommands extends Command {
    constructor() {
        super();
    }
    execute(command) {
        this.command = command.name;
        for (let arg of command.args) {
            console.log(arg);
            this.command += " " + arg;
        }
        for (let flag of command.flags) {
            this.command += " " + flag;
        }
        (0, child_process_1.exec)(this.command, handler);
    }
}
class ExitCommand extends Command {
    constructor() {
        super();
    }
    execute(command) {
        process.exit(0);
    }
}
class ChangeDirectoryCommand extends Command {
    constructor() {
        super();
    }
    execute(command) {
        process.chdir(command.args[0]);
    }
}
class ExecuteFileCommand extends Command {
    constructor() {
        super();
    }
    execute(command) {
        const child = (0, child_process_1.spawn)(command.name, command.args, { stdio: "ignore", detached: true });
        if (child.pid) {
            console.log(chalk_1.default.greenBright("Process started with pid: " + child.pid));
        }
        child.on("error", (err) => {
            console.log(chalk_1.default.redBright(err.message));
        });
        child.on("exit", (code) => {
            console.log(chalk_1.default.yellowBright("Process exited with code: " + code));
        });
    }
}
exports.executeAbleCommands = new ExecutableCommands();
exports.exitCommand = new ExitCommand();
exports.changeDirectoryCommand = new ChangeDirectoryCommand();
exports.executeFileCommand = new ExecuteFileCommand();
//# sourceMappingURL=command.js.map