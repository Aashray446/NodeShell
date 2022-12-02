import { exec } from "child_process";

export interface CommandInterface {
    name: string;
    args: string[];
    flags: string[];
}

