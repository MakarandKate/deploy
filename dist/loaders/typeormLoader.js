"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.db = exports.connectDBs = exports.typeormLoader = void 0;
const DataSource_1 = require("../lib/DataSource");
const mongoose = __importStar(require("mongoose"));
const typeormLoader = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield DataSource_1.AppDataSource.initialize();
        console.info("Db connected");
    }
    catch (err) {
        console.error("Db not connected", err);
    }
});
exports.typeormLoader = typeormLoader;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let configObj = {};
let configPath = path_1.default.join(__dirname, '../../', './') + 'config.json';
if (fs_1.default.existsSync(configPath)) {
    try {
        configObj = JSON.parse(fs_1.default.readFileSync(configPath, 'utf8'));
    }
    catch (err) {
    }
}
const connectDBs = () => {
    try {
        const ezoDb = mongoose.createConnection(configObj.dbConnectionConfigs.primary.url, {
            readPreference: 'primary',
            dbName: 'ezo_db'
        });
        const ezoDbR = mongoose.createConnection(configObj.dbConnectionConfigs.primary.url, {
            readPreference: 'secondary',
            dbName: 'ezo_db'
        });
        return { ezoDb, ezoDbR };
    }
    catch (error) {
        console.error(`Error:${error.message}`);
    }
};
exports.connectDBs = connectDBs;
exports.db = (0, exports.connectDBs)();
//# sourceMappingURL=typeormLoader.js.map