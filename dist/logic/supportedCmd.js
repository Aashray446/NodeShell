"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../class/command");
const node_os_1 = __importDefault(require("node:os"));
//  Executable Command List
let executeAbleCommandsList;
(() => {
    if (node_os_1.default.type() == 'Windows_NT') {
        executeAbleCommandsList = ['cls', 'dir', 'echo', 'find', 'mkdir', 'move', 'rd', 'ren', 'rmdir', 'start', 'type', 'ver', 'vol', 'chdir'];
        return;
    }
    executeAbleCommandsList = [
        'ls', 'pwd', 'mkdir', 'rmdir', 'rm', 'touch', 'cat', 'cp', 'mv', 'echo', 'fg'
    ];
})();
//  Custom Command List
const supportedCmd = new Map([
    ['cd', command_1.changeDirectoryCommand],
    ['exit', command_1.exitCommand],
]);
for (let cmd of executeAbleCommandsList) {
    supportedCmd.set(cmd, command_1.executeAbleCommands);
}
exports.default = supportedCmd;
//# sourceMappingURL=supportedCmd.js.map