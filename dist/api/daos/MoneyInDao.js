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
exports.MoneyInDao = void 0;
const typedi_1 = require("typedi");
const MoneyInRepository_1 = require("../repositories/MoneyInRepository");
let MoneyInDao = class MoneyInDao {
    constructor() { }
    getByUUID(phone, profileId, uuid) {
        return new Promise((resolve, reject) => {
            try {
                let moenyIn = MoneyInRepository_1.MoneyInRepository.findOneBy({
                    userId: phone,
                    profileId,
                    _localUUID: uuid,
                });
                resolve(moenyIn);
            }
            catch (err) {
                resolve(null);
            }
        });
    }
    getAll(phone) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let moenyIns = yield MoneyInRepository_1.MoneyInRepository.find({
                    where: {
                        userId: phone,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moenyIns == null) {
                    moenyIns = [];
                }
                let docs = moenyIns.map(x => {
                    x._serverIdRef = x._id.toString();
                    delete x._id;
                    return x;
                });
                docs = docs.filter(x => !x.deletedStamp);
                docs.sort((a, b) => b.createdStamp - a.createdStamp);
                resolve(docs);
            }
            catch (err) {
                resolve(null);
            }
        }));
    }
    getAllByProfile(phone, profileId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let moenyIns = yield MoneyInRepository_1.MoneyInRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moenyIns == null) {
                    moenyIns = [];
                }
                let docs = moenyIns.map(x => {
                    x._serverIdRef = x._id.toString();
                    delete x._id;
                    return x;
                });
                docs = docs.filter(x => !x.deletedStamp);
                docs.sort((a, b) => b.createdStamp - a.createdStamp);
                resolve(docs);
            }
            catch (err) {
                resolve(null);
            }
        }));
    }
    getAllWithDeletedByProfile(phone, profileId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let moneyIns = yield MoneyInRepository_1.MoneyInRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moneyIns == null) {
                    moneyIns = [];
                }
                let docs = moneyIns.map(x => {
                    x._serverIdRef = x._id.toString();
                    delete x._id;
                    return x;
                });
                docs.sort((a, b) => b.createdStamp - a.createdStamp);
                resolve(docs);
            }
            catch (err) {
                resolve(null);
            }
        }));
    }
    getAllBySale(phone, profileId, invoiceUUID) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let moenyIns = yield MoneyInRepository_1.MoneyInRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        linkedSaleUUID: invoiceUUID,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moenyIns == null) {
                    moenyIns = [];
                }
                let docs = moenyIns.map(x => {
                    x._serverIdRef = x._id.toString();
                    delete x._id;
                    return x;
                });
                docs = docs.filter(x => !x.deletedStamp);
                docs.sort((a, b) => b.createdStamp - a.createdStamp);
                resolve(docs);
            }
            catch (err) {
                resolve(null);
            }
        }));
    }
};
MoneyInDao = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], MoneyInDao);
exports.MoneyInDao = MoneyInDao;
//# sourceMappingURL=MoneyInDao.js.map