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
exports.IngredientsStockAdjustService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const IngredientStockAdjust_1 = require("../models/IngredientStockAdjust");
const IngredientStockAdjustRepository_1 = require("../repositories/IngredientStockAdjustRepository");
const IngredientService_1 = require("./IngredientService");
const IngredientStockAdjust_2 = require("../modelsv2/IngredientStockAdjust");
let IngredientsStockAdjustService = class IngredientsStockAdjustService extends BaseService_1.BaseService {
    constructor(eventDispatcher, ingredientService) {
        super(IngredientStockAdjustRepository_1.IngredientStockAdjustRepository);
        this.eventDispatcher = eventDispatcher;
        this.ingredientService = ingredientService;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.findDeleted();
        });
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.findOneBy({
                _localUUID: uuid,
                deletedStamp: 0,
            });
        });
    }
    getTransactions(linkedIngredientUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let ingredientStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                where: {
                    linkedIngredientUUID,
                    deletedStamp: 0,
                },
                order: {
                    updatedStamp: -1
                }
            });
            let currentStock = 0;
            if (ingredientStockAdjusts.length && Array.isArray(ingredientStockAdjusts)) {
                ingredientStockAdjusts.forEach(ingredientStockAdjust => {
                    if ((ingredientStockAdjust === null || ingredientStockAdjust === void 0 ? void 0 : ingredientStockAdjust.actionType) !== "EOD") {
                        let qty = Number(ingredientStockAdjust === null || ingredientStockAdjust === void 0 ? void 0 : ingredientStockAdjust.quantity);
                        qty = Utils_1.default.isNumber(qty) ? qty : 0;
                        currentStock += qty;
                    }
                });
            }
            let ingredient = yield this.ingredientService.getWithOpeningStockByUUID(linkedIngredientUUID);
            if (ingredient != null) {
                ingredient.stock = currentStock;
                ingredient.updatedStamp = +new Date();
                yield this.ingredientService.save(ingredient);
            }
            let startTime = this.dayFilter['7days'].startTime();
            let endTime = this.dayFilter['today'].endTime();
            ingredientStockAdjusts = ingredientStockAdjusts.filter(x => (x === null || x === void 0 ? void 0 : x.updatedStamp) >= startTime && (x === null || x === void 0 ? void 0 : x.updatedStamp) <= endTime);
            return { ingredient, ingredientStockAdjusts };
        });
    }
    getYesterdayEOD(linkedIngredientUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ingredientService.getYesterdayEOD(linkedIngredientUUID);
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
            let checkDocument = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                    profileId: document.profileId
                },
                order: {
                    updatedStamp: -1
                }
            });
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    document._is = +new Date();
                    let updateResult = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.findOne({
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
                    checkDocument = savedDocument;
                    if ((savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.deletedStamp) && (savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.actionType) !== IngredientStockAdjust_1.ActionType.EOD) {
                        this.ingredientService.updateStock(savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.linkedIngredientUUID, (savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.quantity) * -1);
                    }
                }
                else {
                    checkDocument._serverIdRef = checkDocument._id.toString();
                }
            }
            else {
                document._is = +new Date();
                let savedDocument = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
                if ((savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.actionType) !== IngredientStockAdjust_1.ActionType.EOD) {
                    this.ingredientService.updateStock(savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.linkedIngredientUUID, savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.quantity);
                }
            }
            try {
                let collectionName = 'IngredientStockAdjust';
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
                if (checkDocument.syncStamp < document.deviceSyncStartStamp) {
                    checkDocument.syncStamp = document.deviceSyncStartStamp;
                }
            }
            return checkDocument;
        });
    }
    saveAll(itemCategories, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedItemStockAdjusts = [];
            for (let i = 0; i < (itemCategories === null || itemCategories === void 0 ? void 0 : itemCategories.length); i++) {
                const itemStockAdjust = itemCategories[i];
                if (!itemStockAdjust.userId) {
                    itemStockAdjust.userId = phone;
                }
                savedItemStockAdjusts.push(yield this.save(itemStockAdjust));
            }
            return savedItemStockAdjusts;
        });
    }
    addSaleTransaction(sale, ingredientLocalUUID, quantity, unit, note, isSaleUpdate = false) {
        if (sale === null || sale === void 0 ? void 0 : sale._localUUID) {
            let ingredientStockAdjust = new IngredientStockAdjust_1.IngredientStockAdjust();
            ingredientStockAdjust.userId = sale === null || sale === void 0 ? void 0 : sale.userId;
            ingredientStockAdjust.profileId = sale === null || sale === void 0 ? void 0 : sale.userId;
            ingredientStockAdjust.createdBy = sale === null || sale === void 0 ? void 0 : sale.createdBy;
            ingredientStockAdjust.lastModifiedBy = sale === null || sale === void 0 ? void 0 : sale.lastModifiedBy;
            ingredientStockAdjust.createdByName = sale === null || sale === void 0 ? void 0 : sale.createdByName;
            ingredientStockAdjust.lastModifiedByName = sale === null || sale === void 0 ? void 0 : sale.lastModifiedByName;
            ingredientStockAdjust.isSaleUpdate = isSaleUpdate;
            let timeStamp = +new Date();
            ingredientStockAdjust.createdStamp = ingredientStockAdjust.updatedStamp = (ingredientStockAdjust === null || ingredientStockAdjust === void 0 ? void 0 : ingredientStockAdjust.isSaleUpdate) ? sale === null || sale === void 0 ? void 0 : sale.createdStamp : timeStamp;
            ingredientStockAdjust.deletedStamp = 0;
            ingredientStockAdjust.syncStamp = 0;
            ingredientStockAdjust._localUUID = Utils_1.default.getUUID();
            ingredientStockAdjust.actionType = IngredientStockAdjust_1.ActionType.Sale;
            ingredientStockAdjust.quantity = quantity;
            ingredientStockAdjust.unit = unit;
            ingredientStockAdjust.linkedIngredientUUID = ingredientLocalUUID;
            ingredientStockAdjust.linkedSaleUUID = sale === null || sale === void 0 ? void 0 : sale._localUUID;
            ingredientStockAdjust.note = note;
            return this.save(ingredientStockAdjust);
        }
        return false;
    }
    deleteSaleTransaction(linkedSaleUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (linkedSaleUUID) {
                let ingredientStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.findBy({
                    linkedSaleUUID,
                });
                if (ingredientStockAdjusts === null || ingredientStockAdjusts === void 0 ? void 0 : ingredientStockAdjusts.length) {
                    for (let i = 0; i < (ingredientStockAdjusts === null || ingredientStockAdjusts === void 0 ? void 0 : ingredientStockAdjusts.length); i++) {
                        const ingredientStockAdjust = ingredientStockAdjusts[i];
                        let timeStamp = +new Date();
                        ingredientStockAdjust.createdStamp = timeStamp;
                        ingredientStockAdjust.updatedStamp = timeStamp;
                        ingredientStockAdjust.deletedStamp = timeStamp;
                        yield this.save(ingredientStockAdjust);
                    }
                    return true;
                }
            }
            return false;
        });
    }
    getAllByProfile(phone, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawDocuments = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
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
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'IngredientStockAdjust';
            let itemStockAdjusts = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                itemStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted)
                });
            }
            if (itemStockAdjusts == null) {
                itemStockAdjusts = [];
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
                    let profileItemStockAdjusts = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileItemStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted)
                        });
                    }
                    if (profileItemStockAdjusts && profileItemStockAdjusts.length) {
                        itemStockAdjusts.push(...profileItemStockAdjusts);
                    }
                }
            }
            let rawDocuments = itemStockAdjusts;
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
            let collectionName = 'IngredientStockAdjust';
            let itemStockAdjusts = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                itemStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (itemStockAdjusts == null) {
                itemStockAdjusts = [];
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
                    let profileItemStockAdjusts = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileItemStockAdjusts = yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profileItemStockAdjusts && profileItemStockAdjusts.length) {
                        itemStockAdjusts.push(...profileItemStockAdjusts);
                    }
                }
            }
            let rawDocuments = itemStockAdjusts;
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
            let collectionName = 'IngredientStockAdjust';
            let documents = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                let qr = yield IngredientStockAdjust_2.IngredientStockAdjustRepo.find(Object.assign({ userId: phone, updatedStamp: {
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
                        let qr = yield IngredientStockAdjust_2.IngredientStockAdjustRepo.find(Object.assign({ profileId, updatedStamp: {
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
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield IngredientStockAdjustRepository_1.IngredientStockAdjustRepository.delete({
                userId
            });
        });
    }
};
IngredientsStockAdjustService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface,
        IngredientService_1.IngredientService])
], IngredientsStockAdjustService);
exports.IngredientsStockAdjustService = IngredientsStockAdjustService;
//# sourceMappingURL=IngredientStockAdjustService.js.map