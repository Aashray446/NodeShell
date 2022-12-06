"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = void 0;
;
function parseCommand(input) {
    let args = process.argv.slice(2);
    // If no arguments are passed via the command line, then use the input string
    if (args.length === 0) {
        args = input.split(" ");
    }
    if (args.length === 0) {
        throw new Error("No arguments were passed to the program");
    }
    const command = {
        name: args[0],
        args: args.slice(1, args.length),
        flags: [],
    };
    return command;
}
exports.parseCommand = parseCommand;
//# sourceMappingURL=parsing.js.map