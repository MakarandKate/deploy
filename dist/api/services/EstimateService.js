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
exports.EstimateService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const EstimateRepository_1 = require("../repositories/EstimateRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
let EstimateService = class EstimateService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(EstimateRepository_1.EstimateRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EstimateRepository_1.EstimateRepository.findDeleted();
        });
    }
    getAllDeleted(profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EstimateRepository_1.EstimateRepository.findBy({
                deletedStamp: { $gt: 0 },
                profileId,
                userId
            });
        });
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return EstimateRepository_1.EstimateRepository.findOneBy({
                _localUUID: uuid,
            });
        });
    }
    getByOldFirebaseId(oldFirebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return EstimateRepository_1.EstimateRepository.findOneBy({ oldFirebaseId });
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
            let checkDocument = yield EstimateRepository_1.EstimateRepository.findOne({
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
                    let updateResult = yield EstimateRepository_1.EstimateRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield EstimateRepository_1.EstimateRepository.findOne({
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
                }
                else {
                    checkDocument._serverIdRef = checkDocument._id.toString();
                }
            }
            else {
                document._is = +new Date();
                let savedDocument = yield EstimateRepository_1.EstimateRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
            }
            try {
                let collectionName = 'Estimate';
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
    saveAll(estimates, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedSales = [];
            for (let i = 0; i < (estimates === null || estimates === void 0 ? void 0 : estimates.length); i++) {
                const estimate = estimates[i];
                if (!estimate.userId) {
                    estimate.userId = phone;
                }
                savedSales.push(yield this.save(estimate));
            }
            return savedSales;
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
            let collectionName = 'Estimate';
            let estimates = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                estimates = yield EstimateRepository_1.EstimateRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted)
                });
            }
            if (estimates == null) {
                estimates = [];
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
                    let profileEstimates = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileEstimates = yield EstimateRepository_1.EstimateRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted)
                        });
                    }
                    if (profileEstimates && profileEstimates.length) {
                        estimates.push(...profileEstimates);
                    }
                }
            }
            let rawDocuments = estimates;
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
            let collectionName = 'Estimate';
            let estimates = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                estimates = yield EstimateRepository_1.EstimateRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (estimates == null) {
                estimates = [];
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
                    let profileEstimates = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileEstimates = yield EstimateRepository_1.EstimateRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profileEstimates && profileEstimates.length) {
                        estimates.push(...profileEstimates);
                    }
                }
            }
            let rawDocuments = estimates;
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
            yield EstimateRepository_1.EstimateRepository.delete({
                userId
            });
        });
    }
};
EstimateService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], EstimateService);
exports.EstimateService = EstimateService;
//# sourceMappingURL=EstimateService.js.map