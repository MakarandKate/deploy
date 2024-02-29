"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectID = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ObjectID = require('mongodb').ObjectID;
exports.ObjectID = ObjectID;
let configObj = {};
let configPath = path_1.default.join(__dirname, '../../', './') + 'config.json';
if (fs_1.default.existsSync(configPath)) {
    try {
        configObj = JSON.parse(fs_1.default.readFileSync(configPath, 'utf8'));
    }
    catch (err) {
    }
}
let dbConfig = {};
if ((_b = (_a = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.url) {
    dbConfig = {
        type: "mongodb",
        url: (_d = (_c = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.url,
        useNewUrlParser: true,
        synchronize: true,
        useUnifiedTopology: true,
        database: (_f = (_e = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.database,
        entities: [path_1.default.join(__dirname, '..', 'api/models/**/*.js')],
    };
}
else {
    dbConfig = {
        type: "mongodb",
        host: (_h = (_g = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _g === void 0 ? void 0 : _g.primary) === null || _h === void 0 ? void 0 : _h.host,
        port: (_k = (_j = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _j === void 0 ? void 0 : _j.primary) === null || _k === void 0 ? void 0 : _k.port,
        username: (_m = (_l = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.user,
        password: encodeURIComponent((_p = (_o = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _o === void 0 ? void 0 : _o.primary) === null || _p === void 0 ? void 0 : _p.password),
        database: (_r = (_q = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _q === void 0 ? void 0 : _q.primary) === null || _r === void 0 ? void 0 : _r.database,
        entities: [path_1.default.join(__dirname, '..', 'api/models/**/*.js')],
        replicaSet: (_t = (_s = configObj === null || configObj === void 0 ? void 0 : configObj.dbConnectionConfigs) === null || _s === void 0 ? void 0 : _s.primary) === null || _t === void 0 ? void 0 : _t.replicaSet,
        synchronize: true,
        //bigNumberStrings:false,
    };
}
const AppDataSource = new typeorm_1.DataSource(dbConfig);
exports.AppDataSource = AppDataSource;
//# sourceMappingURL=DataSource.js.map