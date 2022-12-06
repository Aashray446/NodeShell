import chalk from 'chalk';
import { existsSync } from 'node:fs';
import { stdin, stdout } from 'node:process';
import * as readline from 'node:readline';
import { promisify } from 'node:util';
import supportedCmd from '../logic/supportedCmd';
import { parseCommand } from './parsing';
import {executeFileCommand} from '../class/command';


export async function shellEngine( ) {


    const userInput = readline.createInterface({
		input: stdin,
		output: stdout
	})

    const question = promisify(userInput.question).bind(userInput);

    while(true) {
        const input = await question(chalk.blueBright(process.cwd() + "> "));
        const command = parseCommand(input);

        // Check if the command is empty
        if(input === "") {
            continue;
        }

        // If path to binary is passed
        if(existsSync(command.name)) {
            executeFileCommand.execute(command);
            continue;
        }

        if(supportedCmd.has(command.name)) {
            supportedCmd.get(command.name)?.execute(command);
            continue;
        }
        

        console.log(chalk.redBright("Command not found"));
    
       

    }


}

