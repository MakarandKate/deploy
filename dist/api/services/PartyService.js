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
exports.PartyService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Party_1 = require("../models/Party");
const PartyRepository_1 = require("../repositories/PartyRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const np = new Party_1.Party();
let PartyService = class PartyService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(PartyRepository_1.PartyRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PartyRepository_1.PartyRepository.findDeleted();
        });
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return PartyRepository_1.PartyRepository.findOneBy({
                _localUUID: uuid,
            });
        });
    }
    getCashSaleParty(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return PartyRepository_1.PartyRepository.findOneBy({
                profileId,
                userId,
                isCashSaleParty: true,
            });
        });
    }
    getByPartyPhone(userId, profileId, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return PartyRepository_1.PartyRepository.findOneBy({
                profileId,
                userId,
                phone,
            });
        });
    }
    getByOldFirebaseId(oldFirebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return PartyRepository_1.PartyRepository.findOneBy({ oldFirebaseId });
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
            let checkDocument = yield PartyRepository_1.PartyRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                    profileId: document.profileId
                },
                order: {
                    updatedStamp: -1
                }
            });
            checkDocument = np.expand(checkDocument);
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    document._is = +new Date();
                    document = np.compress(document);
                    let updateResult = yield PartyRepository_1.PartyRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield PartyRepository_1.PartyRepository.findOne({
                        where: {
                            _localUUID: document._localUUID,
                            profileId: document.profileId
                        },
                        order: {
                            updatedStamp: -1
                        }
                    });
                    savedDocument = np.expand(savedDocument);
                    savedDocument._serverIdRef = savedDocument._id.toString();
                    savedDocument._localId = localId;
                    checkDocument = savedDocument;
                }
                else {
                    checkDocument._serverIdRef = checkDocument._id.toString();
                }
            }
            else {
                document._is = +new Date();
                document = np.compress(document);
                let savedDocument = yield PartyRepository_1.PartyRepository.save(document);
                savedDocument = np.expand(savedDocument);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
            }
            try {
                let collectionName = 'Party';
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
    saveAll(parties, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedPartys = [];
            for (let i = 0; i < (parties === null || parties === void 0 ? void 0 : parties.length); i++) {
                const party = parties[i];
                if (!party.userId) {
                    party.userId = phone;
                }
                savedPartys.push(yield this.save(party));
            }
            return savedPartys;
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
            let collectionName = 'Party';
            let parties = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                parties = yield PartyRepository_1.PartyRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted)
                });
            }
            if (parties == null) {
                parties = [];
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
                    let profilePartys = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profilePartys = yield PartyRepository_1.PartyRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted)
                        });
                    }
                    if (profilePartys && profilePartys.length) {
                        parties.push(...profilePartys);
                    }
                }
            }
            let rawDocuments = parties;
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
            let collectionName = 'Party';
            let parties = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                parties = yield PartyRepository_1.PartyRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (parties == null) {
                parties = [];
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
                    let profilePartys = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profilePartys = yield PartyRepository_1.PartyRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profilePartys && profilePartys.length) {
                        parties.push(...profilePartys);
                    }
                }
            }
            let rawDocuments = parties;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            return rawDocuments.map((x) => {
                x = np.expand(x);
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    addOneDummyParty(u) {
        return __awaiter(this, void 0, void 0, function* () {
            let party = new Party_1.Party();
            party.name = Utils_1.default.generateRandomString(5) + ' ' + Utils_1.default.generateRandomString(5);
            party.phone = Utils_1.default.generateRandomString(10);
            party.createdStamp = +new Date();
            party.userId = `User - ${u}`;
            yield this.save(party);
        });
    }
    addDummyPartiesPsudo(tag) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let u = 0; u < 100; u++) {
                for (let i = 0; i < 500; i++) {
                    yield this.addOneDummyParty(u);
                }
            }
        });
    }
    addDummyParties() {
        for (let i = 0; i < 10; i++) {
            this.addDummyPartiesPsudo(`${i + 1}`);
        }
    }
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PartyRepository_1.PartyRepository.delete({
                userId
            });
        });
    }
    addCashSaleParty(phone, profileUUID) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const party = new Party_1.Party();
            party.createdStamp = party.updatedStamp = (+new Date() - 100);
            party.deletedStamp = 0;
            party.syncStamp = (+new Date());
            party._localUUID = Utils_1.default.getUUID();
            party.name = 'Cash Sale';
            party.type = 'Customer';
            party.sendAlerts = false;
            party.profileId = profileUUID;
            party.isCashSaleParty = true;
            party.userId = phone;
            party.credit = 0;
            const savedParty = yield this.save(party);
            if (savedParty === null || savedParty === void 0 ? void 0 : savedParty._localUUID) {
                return resolve(savedParty);
            }
            else {
                return resolve(null);
            }
        }));
    }
    deleteParty(userId, profileId, _localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let party = yield PartyRepository_1.PartyRepository.findOneBy({
                userId,
                profileId,
                _localUUID
            });
            if (party) {
                party.deletedStamp = +new Date();
                party.syncStamp = +new Date() + 2000;
                yield this.update(party);
                try {
                    let collectionName = 'Party';
                    let latestDocumentUpdateStamp = party.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${party.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${party.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${party.profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${party.profileId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                }
                catch (error) {
                }
            }
            return party;
        });
    }
};
PartyService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], PartyService);
exports.PartyService = PartyService;
//# sourceMappingURL=PartyService.js.map