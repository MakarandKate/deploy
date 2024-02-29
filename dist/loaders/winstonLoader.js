"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLoader = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const Winston_1 = require("../lib/Winston");
const winstonLoader = (settings) => {
    const logger = (0, winston_1.createLogger)({
        levels: {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6
        },
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({
                filename: 'logs/combined.log'
            }),
            new winston_1.transports.DailyRotateFile({
                filename: 'logs/app-%DATE%.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
            })
        ]
    });
    Winston_1.Winston.init(logger);
};
exports.winstonLoader = winstonLoader;
//# sourceMappingURL=winstonLoader.js.map