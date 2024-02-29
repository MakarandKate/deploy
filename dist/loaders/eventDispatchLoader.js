"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDispatchLoader = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const RedisApp_1 = require("../lib/RedisApp");
const eventDispatchLoader = (settings) => {
    if (settings) {
        const patterns = [path_1.default.join(__dirname, '..', 'api/subscribers/**/*Subscriber.js')];
        patterns.forEach((pattern) => {
            (0, glob_1.default)(pattern, (err, files) => {
                for (const file of files) {
                    require(file);
                }
            });
        });
        RedisApp_1.RedisApp.init();
        //SocketApp.init();
    }
};
exports.eventDispatchLoader = eventDispatchLoader;
//# sourceMappingURL=eventDispatchLoader.js.map