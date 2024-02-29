"use strict";
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
exports.BaseService = void 0;
const Utils_1 = __importDefault(require("../../lib/Utils"));
const Winston_1 = require("../../lib/Winston");
class BaseService {
    constructor(repo) {
        this.repo = repo;
        this.dayFilter = {
            "today": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp,
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp,
            },
            "yesterday": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp - 86400000,
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - 86400000,
            },
            "3days": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp - (2 * 86400000),
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - (2 * 86400000),
            },
            "4days": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp - (3 * 86400000),
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - (3 * 86400000),
            },
            "5days": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp - (4 * 86400000),
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - (4 * 86400000),
            },
            "6days": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp - (5 * 86400000),
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - (5 * 86400000),
            },
            "7days": {
                startTime: () => Utils_1.default.getTodaysStampBound().startStamp - (6 * 86400000),
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - (6 * 86400000),
            },
            "old": {
                startTime: () => 1,
                endTime: () => Utils_1.default.getTodaysStampBound().endStamp - (7 * 86400000),
            },
        };
        this.baseRepo = repo;
    }
    checkService(arr, classRef) {
        arr.forEach((serivceToCheckName) => {
            let serivceToCheck = classRef[serivceToCheckName];
            var x = {};
            x[serivceToCheck] = '';
            var className = this.constructor.name;
            if (!serivceToCheck.getName) {
                Winston_1.Jot.warn(`${className}::ServiceUndefined->${serivceToCheckName}`);
            }
        });
    }
    getName() {
        return this.constructor.name;
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let e2 = entity;
            e2.createdStamp = +new Date();
            return yield this.baseRepo.save(e2);
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let e2 = entity;
            e2.updatedStamp = +new Date();
            return yield this.baseRepo.save(e2);
        });
    }
    delete(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            let e2 = entity;
            e2.deletedStamp = +new Date();
            return yield this.baseRepo.save(e2);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let tablename = this.baseRepo.metadata.tableName;
            let rows = yield this.baseRepo.manager.query(`SELECT * FROM ${tablename} WHERE id=${id}`);
            if (rows[0]) {
                return this.baseRepo.create(rows[0]);
            }
            return null;
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map