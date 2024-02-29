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
exports.MoneyOutDao = void 0;
const typedi_1 = require("typedi");
const MoneyOutRepository_1 = require("../repositories/MoneyOutRepository");
let MoneyOutDao = class MoneyOutDao {
    constructor() { }
    getByUUID(phone, profileId, uuid) {
        return new Promise((resolve, reject) => {
            try {
                let moneyOut = MoneyOutRepository_1.MoneyOutRepository.findOneBy({
                    userId: phone,
                    profileId,
                    _localUUID: uuid,
                });
                resolve(moneyOut);
            }
            catch (err) {
                resolve(null);
            }
        });
    }
    getAll(phone) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let moenyOuts = yield MoneyOutRepository_1.MoneyOutRepository.find({
                    where: {
                        userId: phone,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moenyOuts == null) {
                    moenyOuts = [];
                }
                let docs = moenyOuts.map(x => {
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
                let docs = yield this.getAll(phone);
                docs = docs.filter(x => !x.deletedStamp && x.profileId == profileId);
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
                let moenyOuts = yield MoneyOutRepository_1.MoneyOutRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moenyOuts == null) {
                    moenyOuts = [];
                }
                let docs = moenyOuts.map(x => {
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
    getAllByPurchase(phone, profileId, purchaseUUID) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let moenyOuts = yield MoneyOutRepository_1.MoneyOutRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        linkedPurchaseUUID: purchaseUUID,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (moenyOuts == null) {
                    moenyOuts = [];
                }
                let docs = moenyOuts.map(x => {
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
MoneyOutDao = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], MoneyOutDao);
exports.MoneyOutDao = MoneyOutDao;
//# sourceMappingURL=MoneyOutDao.js.map