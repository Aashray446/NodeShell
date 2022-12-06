import { executeAbleCommands, exitCommand, Command, changeDirectoryCommand } from "../class/command";
import os from "node:os";


//  Executable Command List
let executeAbleCommandsList;
( ()=> {

    if (os.type() == 'Windows_NT') {
        executeAbleCommandsList = ['cls', 'dir', 'echo', 'find', 'mkdir', 'move', 'rd', 'ren', 'rmdir', 'start', 'type', 'ver', 'vol', 'chdir'];
        return;
    }

    executeAbleCommandsList = [
        'ls', 'pwd', 'mkdir', 'rmdir', 'rm', 'touch', 'cat', 'cp', 'mv', 'echo', 'fg'
    ]

} )()


//  Custom Command List
const supportedCmd : Map<string, Command> = new Map(
    [
        ['cd', changeDirectoryCommand],
        ['exit', exitCommand],
    ]
);


for( let cmd of executeAbleCommandsList) {
    supportedCmd.set( cmd, executeAbleCommands )
}

export default supportedCmd;
