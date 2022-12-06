"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellEngine = void 0;
const chalk_1 = __importDefault(require("chalk"));
const node_fs_1 = require("node:fs");
const node_process_1 = require("node:process");
const readline = __importStar(require("node:readline"));
const node_util_1 = require("node:util");
const supportedCmd_1 = __importDefault(require("../logic/supportedCmd"));
const parsing_1 = require("./parsing");
const command_1 = require("../class/command");
function shellEngine() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userInput = readline.createInterface({
            input: node_process_1.stdin,
            output: node_process_1.stdout
        });
        const question = (0, node_util_1.promisify)(userInput.question).bind(userInput);
        while (true) {
            const input = yield question(chalk_1.default.blueBright(process.cwd() + "> "));
            const command = (0, parsing_1.parseCommand)(input);
            // Check if the command is empty
            if (input === "") {
                continue;
            }
            // If path to binary is passed
            if ((0, node_fs_1.existsSync)(command.name)) {
                command_1.executeFileCommand.execute(command);
                continue;
            }
            if (supportedCmd_1.default.has(command.name)) {
                (_a = supportedCmd_1.default.get(command.name)) === null || _a === void 0 ? void 0 : _a.execute(command);
                continue;
            }
            console.log(chalk_1.default.redBright("Command not found"));
        }
    });
}
exports.shellEngine = shellEngine;
//# sourceMappingURL=shellEngine.js.map