"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Requirements
const shellEngine_1 = require("./util/shellEngine");
(0, shellEngine_1.shellEngine)();
process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
});
process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});
//# sourceMappingURL=index.js.map