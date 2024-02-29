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
exports.ItemService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Item_1 = require("../models/Item");
const ItemRepository_1 = require("../repositories/ItemRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const Item_2 = require("../modelsv2/Item");
const ni = new Item_1.Item();
let ItemService = class ItemService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(ItemRepository_1.ItemRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ItemRepository_1.ItemRepository.findDeleted();
        });
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return ItemRepository_1.ItemRepository.findOneBy({
                _localUUID: uuid,
            });
        });
    }
    getByOldFirebaseId(oldFirebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ItemRepository_1.ItemRepository.findOneBy({ oldFirebaseId });
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
            let checkDocument = yield ItemRepository_1.ItemRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                    profileId: document.profileId
                },
                order: {
                    updatedStamp: -1
                }
            });
            checkDocument = ni.expand(checkDocument);
            let returnDocument = checkDocument;
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    document._is = +new Date();
                    document = ni.compress(document);
                    let updateResult = yield ItemRepository_1.ItemRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield ItemRepository_1.ItemRepository.findOne({
                        where: {
                            _localUUID: document._localUUID,
                            profileId: document.profileId
                        },
                        order: {
                            updatedStamp: -1
                        }
                    });
                    savedDocument = ni.expand(savedDocument);
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
                document = ni.compress(document);
                let savedDocument = yield ItemRepository_1.ItemRepository.save(document);
                savedDocument = ni.expand(savedDocument);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                returnDocument = savedDocument;
            }
            try {
                let collectionName = 'Item';
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
            let items = yield ItemRepository_1.ItemRepository.find({
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
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Item';
            let items = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                items = yield ItemRepository_1.ItemRepository.find({
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
                        profileItems = yield ItemRepository_1.ItemRepository.find({
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
            let collectionName = 'Item';
            let items = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                items = yield ItemRepository_1.ItemRepository.find({
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
                        profileItems = yield ItemRepository_1.ItemRepository.find({
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
                x = ni.expand(x);
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
            let collectionName = 'Item';
            let documents = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                let qr = yield Item_2.ItemRepo.find(Object.assign({ userId: phone, updatedStamp: {
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
                        let qr = yield Item_2.ItemRepo.find(Object.assign({ profileId, updatedStamp: {
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
    getItemsByCategory(userId, profileId, category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ItemRepository_1.ItemRepository.findBy({
                userId,
                profileId,
                category
            });
        });
    }
    deleteItem(userId, profileId, _localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield ItemRepository_1.ItemRepository.findOneBy({
                userId,
                profileId,
                _localUUID
            });
            if (item) {
                item.deletedStamp = +new Date();
                item.syncStamp = +new Date() + 2000;
                yield this.update(item);
                try {
                    let collectionName = 'Item';
                    let latestDocumentUpdateStamp = item.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${profileId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${profileId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                }
                catch (_a) {
                }
            }
            return item;
        });
    }
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ItemRepository_1.ItemRepository.delete({
                userId
            });
        });
    }
    getAllIncTax1() {
        return __awaiter(this, void 0, void 0, function* () {
            return ItemRepository_1.ItemRepository.findBy({ spIncTax: 1 });
        });
    }
    getAllIncTax0() {
        return __awaiter(this, void 0, void 0, function* () {
            return ItemRepository_1.ItemRepository.findBy({ spIncTax: 0 });
        });
    }
};
ItemService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=ItemService.js.map