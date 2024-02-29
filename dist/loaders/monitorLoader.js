"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorLoader = void 0;
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const statusMonitor = require('express-status-monitor')();
const monitorLoader = (settings) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp.use(statusMonitor);
        expressApp.get('/monitor', (0, express_basic_auth_1.default)({
            users: {
                [`admin`]: `1234`,
            },
            challenge: true,
        }), statusMonitor.pageRoute);
    }
};
exports.monitorLoader = monitorLoader;
//# sourceMappingURL=monitorLoader.js.map