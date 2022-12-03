import chalk from "chalk";
import { exec, spawn } from "child_process";
import { CommandInterface } from "./command-interface";


const handler = (err:Error, stdout:string, stderr:string) => {

    if(err) {
        console.log( chalk.redBright(err.message) );
    }

    if(stderr) {
        console.log( chalk.redBright(stderr) );
    }

    if(stdout) {
        console.log( chalk.yellow(stdout) );
    }

}
export abstract class Command {

    command:string;

    abstract execute(command:CommandInterface):void;

}

class ExecutableCommands extends Command {

    constructor() {
        super();
    }

    execute(command:CommandInterface) {
    
        this.command = command.name;

        for (let arg of command.args) {
            console.log(arg);
            this.command += " " + arg;
        }

        for (let flag of command.flags) {
            this.command += " " + flag;
        }
        exec(this.command, handler)

    }

}

class ExitCommand extends Command {

    constructor() {
        super();
    }

    execute(command:CommandInterface) {
        process.exit(0);
    }

}

class ChangeDirectoryCommand extends Command {

    constructor() {
        super();
    }

    execute(command:CommandInterface) {
        process.chdir(command.args[0]);
    }

}

class ExecuteFileCommand extends Command {

    constructor() {
        super();
    }

    execute(command:CommandInterface) {
       const  child  = spawn(command.name, command.args, {stdio: "inherit", shell: true});

         child.on("error", (err) => {
            console.log(chalk.redBright(err.message));
        })


        child.on("exit", (code) => {
            console.log(chalk.yellowBright("Process exited with code: " + code));
        }
        )

    }

}


export const executeAbleCommands = new ExecutableCommands();
export const exitCommand = new ExitCommand();
export const changeDirectoryCommand = new ChangeDirectoryCommand();
export const executeFileCommand = new ExecuteFileCommand();

