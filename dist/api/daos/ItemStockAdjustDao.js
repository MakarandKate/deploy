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
exports.ItemStockAdjustDao = void 0;
const typedi_1 = require("typedi");
const ItemStockAdjustRepository_1 = require("../repositories/ItemStockAdjustRepository");
let ItemStockAdjustDao = class ItemStockAdjustDao {
    constructor() { }
    getByUUID(phone, profileId, uuid) {
        return new Promise((resolve, reject) => {
            try {
                let itemStockAdjust = ItemStockAdjustRepository_1.ItemStockAdjustRepository.findOneBy({
                    userId: phone,
                    profileId,
                    _localUUID: uuid,
                });
                resolve(itemStockAdjust);
            }
            catch (err) {
                resolve(null);
            }
        });
    }
    getAll(phone) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let itemStockAdjusts = yield ItemStockAdjustRepository_1.ItemStockAdjustRepository.find({
                    where: {
                        userId: phone,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (itemStockAdjusts == null) {
                    itemStockAdjusts = [];
                }
                let docs = itemStockAdjusts.map(x => {
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
                let itemStockAdjusts = yield ItemStockAdjustRepository_1.ItemStockAdjustRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (itemStockAdjusts == null) {
                    itemStockAdjusts = [];
                }
                let docs = itemStockAdjusts.map(x => {
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
                let ItemStockAdjusts = yield ItemStockAdjustRepository_1.ItemStockAdjustRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (ItemStockAdjusts == null) {
                    ItemStockAdjusts = [];
                }
                let docs = ItemStockAdjusts.map(x => {
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
    getAllByLinkedItemUUID(phone, profileId, linkedItemUUID) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let itemStockAdjusts = yield ItemStockAdjustRepository_1.ItemStockAdjustRepository.find({
                    where: {
                        userId: phone,
                        profileId,
                        linkedItemUUID: linkedItemUUID,
                        updatedStamp: {
                            $gt: 0
                        }
                    }
                });
                if (itemStockAdjusts == null) {
                    itemStockAdjusts = [];
                }
                let docs = itemStockAdjusts.map(x => {
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
ItemStockAdjustDao = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], ItemStockAdjustDao);
exports.ItemStockAdjustDao = ItemStockAdjustDao;
//# sourceMappingURL=ItemStockAdjustDao.js.map