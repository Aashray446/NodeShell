import { CommandInterface } from "../class/command-interface";
import {existsSync } from 'node:fs';
import { promisify } from 'node:util';

export function parseCommand( input:String ):CommandInterface {

    const pathRegex = "([a-zA-Z]:)?(\\\\[a-zA-Z0-9_.-]+)+\\\\?";

    let args = process.argv.slice(2);



    // If no arguments are passed via the command line, then use the input string
    if(args.length === 0) {
        args = input.split(" ");
    }

    if(args.length === 0) {
        throw new Error("No arguments were passed to the program");
    }

    const command:CommandInterface = {
        name: args[0],
        args: args.slice(1, args.length),
        flags: [],
    };

    return command;
}