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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.IngredientService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const IngredientRepository_1 = require("../repositories/IngredientRepository");
const IngredientStockAdjust_1 = require("../models/IngredientStockAdjust");
const IngredientStockAdjustRepository_1 = require("../repositories/IngredientStockAdjustRepository");
const Ingredient_1 = require("../modelsv2/Ingredient");
let IngredientService = class IngredientService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(IngredientRepository_1.IngredientRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield IngredientRepository_1.IngredientRepository.findDeleted();
        });
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return IngredientRepository_1.IngredientRepository.findOneBy({
                _localUUID: uuid,
                deletedStamp: 0,
            });
        });
    }
    getWithOpeningStockByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let ingredient = yield IngredientRepository_1.IngredientRepository.findOneBy({
                _localUUID: uuid,
                deletedStamp: 0,
            });
            if (ingredient != null) {
                ingredient.yesterdayEOD = yield this.getYesterdayEOD(ingredient === null || ingredient === void 0 ? void 0 : ingredient._localUUID);
                ingredient.todayEOD = yield this.getTodayEOD(ingredient === null || ingredient === void 0 ? void 0 : ingredient._localUUID);
            }
            return ingredient;
        });
    }
    updateStock(uuid, incrementBy) {
        return __awaiter(this, void 0, void 0, function* () {
            incrementBy = Utils_1.default.capFractionsToSix(incrementBy);
            let ingredient = yield this.getByUUID(uuid);
            if (ingredient === null || ingredient === void 0 ? void 0 : ingredient.stock) {
                ingredient.stock += incrementBy;
            }
            else {
                ingredient.stock = incrementBy;
            }
            ingredient.updatedStamp = +new Date();
            return this.save(ingredient);
        });
    }
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            document = Utils_1.default.removeNullKeysRecursively(document);
            document.syncStamp = +new Date();
            if (document.deviceSyncStartStamp) {
                document.syncStamp = document.deviceSyncStartStamp;
            }
            let localId = document._localId;
            delete document._localId;
            let checkDocument = yield IngredientRepository_1.IngredientRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                    profileId: document.profileId
                },
                order: {
                    updatedStamp: -1
                }
            });
            let returnDocument = checkDocument;
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    document._is = +new Date();
                    let updateResult = yield IngredientRepository_1.IngredientRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield IngredientRepository_1.IngredientRepository.findOne({
                        where: {
                            _localUUID: document._localUUID,
                            profileId: document.profileId
                        },
                        order: {
                            updatedStamp: -1
                        }
                    });
                    savedDocument._serverIdRef = savedDocument._id.toString();
                    savedDocument._localId = localId;
                    returnDocument = savedDocument;
                }
                else {
                    returnDocument._serverIdRef = returnDocument._id.toString();
                }
            }
            else {
                document._is = +new Date();
                let savedDocument = yield IngredientRepository_1.IngredientRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                returnDocument = savedDocument;
            }
            try {
                let collectionName = 'Ingredient';
                let latestDocumentUpdateStamp = document.updatedStamp;
                let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.userId}_${collectionName}`);
                let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                }
                let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.profileId}_${collectionName}`);
                let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                if (profileIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.profileId}_${collectionName}`, latestDocumentUpdateStamp + '');
                }
            }
            catch (err) {
            }
            if (document.deviceSyncStartStamp) {
                if (returnDocument.syncStamp < document.deviceSyncStartStamp) {
                    returnDocument.syncStamp = document.deviceSyncStartStamp;
                }
            }
            return returnDocument;
        });
    }
    saveAll(items, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedItems = [];
            for (let i = 0; i < (items === null || items === void 0 ? void 0 : items.length); i++) {
                const item = items[i];
                if (!item.userId) {
                    item.userId = phone;
                }
                savedItems.push(yield this.save(item));
            }
            return savedItems;
        });
    }
    getAllBySyncStamp(phone, serverSyncStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = yield IngredientRepository_1.IngredientRepository.find({
                where: {
                    userId: phone,
                    updatedStamp: {
                        $gt: (serverSyncStamp - 10000)
                    }
                }
            });
            if (items == null) {
                items = [];
            }
            return items.map(x => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                return x;
            });
        });
    }
    getAllByProfile(phone, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawDocuments = yield IngredientRepository_1.IngredientRepository.find({
                where: {
                    userId: phone,
                    profileId,
                    deletedStamp: 0,
                }
            });
            if (rawDocuments == null) {
                rawDocuments = [];
            }
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    getAllWithOpeningStockByProfile(phone, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawDocuments = yield IngredientRepository_1.IngredientRepository.find({
                where: {
                    userId: phone,
                    profileId,
                    deletedStamp: 0,
                }
            });
            if (rawDocuments == null) {
                rawDocuments = [];
            }
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            for (let i = 0; i < (rawDocuments === null || rawDocuments === void 0 ? void 0 : rawDocuments.length); i++) {
                let ingredient = rawDocuments[i];
                if (ingredient != null) {
                    ingredient.yesterdayEOD = yield this.getYesterdayEOD(ingredient === null || ingredient === void 0 ? void 0 : ingredient._localUUID);
                    ingredient.todayEOD = yield this.getTodayEOD(ingredient === null || ingredient === void 0 ? void 0 : ingredient._localUUID);
                }
            }
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Ingredient';
            let items = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                items = yield IngredientRepository_1.IngredientRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted)
                });
            }
            if (items == null) {
                items = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileItems = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileItems = yield IngredientRepository_1.IngredientRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted)
                        });
                    }
                    if (profileItems && profileItems.length) {
                        items.push(...profileItems);
                    }
                }
            }
            let rawDocuments = items;
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAllv3(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Ingredient';
            let items = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                items = yield IngredientRepository_1.IngredientRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (items == null) {
                items = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileItems = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileItems = yield IngredientRepository_1.IngredientRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profileItems && profileItems.length) {
                        items.push(...profileItems);
                    }
                }
            }
            let rawDocuments = items;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAllv4(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Ingredient';
            let documents = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                let qr = yield Ingredient_1.IngredientRepo.find(Object.assign({ userId: phone, updatedStamp: {
                        $gt: lastSyncStamp || 0
                    } }, includeDeleted)).sort({
                    updatedStamp: 1
                }).limit(500);
                if (qr && qr.length) {
                    qr.map((el) => { documents.push(el.toObject()); });
                }
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileDocuments = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        let qr = yield Ingredient_1.IngredientRepo.find(Object.assign({ profileId, updatedStamp: {
                                $gt: lastSyncStamp || 0
                            } }, includeDeleted)).sort({
                            updatedStamp: 1
                        }).limit(500);
                        if (qr && qr.length) {
                            qr.map((el) => { profileDocuments.push(el.toObject()); });
                        }
                    }
                    if (profileDocuments && profileDocuments.length) {
                        documents.push(...profileDocuments);
                    }
                }
            }
            let rawDocuments = documents;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    getYesterdayEOD(linkedIngredientUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let startTime = this.dayFilter['yesterday'].startTime();
                let endTime = this.dayFilter['yesterday'].endTime();
                let ingredientStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                    where: {
                        linkedIngredientUUID,
                        actionType: IngredientStockAdjust_1.ActionType.EOD,
                        createdStamp: {
                            $gte: startTime,
                            $lte: endTime,
                        }
                    },
                    order: {
                        createdStamp: -1
                    }
                });
                if (ingredientStockAdjusts === null || ingredientStockAdjusts === void 0 ? void 0 : ingredientStockAdjusts.length) {
                    ingredientStockAdjusts.sort((a, b) => (b === null || b === void 0 ? void 0 : b.updatedStamp) - (a === null || a === void 0 ? void 0 : a.updatedStamp));
                    return resolve(ingredientStockAdjusts[0]);
                }
                return resolve(null);
            }));
        });
    }
    getTodayEOD(linkedIngredientUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let startTime = this.dayFilter['today'].startTime();
                let endTime = this.dayFilter['today'].endTime();
                let ingredientStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                    where: {
                        linkedIngredientUUID,
                        actionType: IngredientStockAdjust_1.ActionType.EOD,
                        createdStamp: {
                            $gte: startTime,
                            $lte: endTime,
                        }
                    },
                    order: {
                        createdStamp: -1
                    }
                });
                if (ingredientStockAdjusts === null || ingredientStockAdjusts === void 0 ? void 0 : ingredientStockAdjusts.length) {
                    ingredientStockAdjusts.sort((a, b) => (b === null || b === void 0 ? void 0 : b.updatedStamp) - (a === null || a === void 0 ? void 0 : a.updatedStamp));
                    return resolve(ingredientStockAdjusts[0]);
                }
                return resolve(null);
            }));
        });
    }
};
IngredientService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], IngredientService);
exports.IngredientService = IngredientService;
//# sourceMappingURL=IngredientService.js.map