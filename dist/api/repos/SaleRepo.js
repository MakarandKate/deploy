"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRepo = void 0;
const typedi_1 = require("typedi");
const SaleDao_1 = require("../daos/SaleDao");
let SaleRepo = class SaleRepo {
    constructor(dao) {
        this.dao = dao;
    }
    getAllByPromise(phone, profileId) {
        return this.dao.getAllByProfile(phone, profileId);
    }
    getByUUID(phone, profileId, uuid) {
        return this.dao.getByUUID(phone, profileId, uuid);
    }
    getByBillDateRange(phone, profileId, startTime, endTime) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let allDocs = yield this.dao.getAllByProfile(phone, profileId);
                if (allDocs != null) {
                    let filteredDocs = allDocs.filter(doc => doc.billDateStamp >= startTime && doc.billDateStamp < endTime);
                    return resolve(filteredDocs);
                }
                else {
                    return resolve(null);
                }
            }
            catch (error) {
                return resolve(null);
            }
        }));
    }
};
SaleRepo = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [SaleDao_1.SaleDao])
], SaleRepo);
exports.SaleRepo = SaleRepo;
//# sourceMappingURL=SaleRepo.js.map