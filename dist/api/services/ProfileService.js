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
exports.ProfileService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Profile_1 = require("../models/Profile");
const ProfileRepository_1 = require("../repositories/ProfileRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
let ProfileService = class ProfileService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(ProfileRepository_1.ProfileRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProfileRepository_1.ProfileRepository.findDeleted();
        });
    }
    getByUUID(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProfileRepository_1.ProfileRepository.findOne({
                where: {
                    _localUUID: profileId,
                    userId,
                }
            });
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
            let checkDocument = yield ProfileRepository_1.ProfileRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                },
                order: {
                    updatedStamp: -1
                }
            });
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    document._is = +new Date();
                    let updateResult = yield ProfileRepository_1.ProfileRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield ProfileRepository_1.ProfileRepository.findOne({
                        where: {
                            _localUUID: document._localUUID,
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
                let savedDocument = yield ProfileRepository_1.ProfileRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
            }
            try {
                let collectionName = 'Profile';
                let latestDocumentUpdateStamp = document.updatedStamp;
                let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.userId}_${collectionName}`);
                let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    yield (0, RedisApp_1.SetToRedis)(`${document._localUUID}_${collectionName}`, latestDocumentUpdateStamp + '');
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
    saveAll(profiles, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedProfiles = [];
            for (let i = 0; i < (profiles === null || profiles === void 0 ? void 0 : profiles.length); i++) {
                const profile = profiles[i];
                if (!profile.userId) {
                    profile.userId = phone;
                }
                savedProfiles.push(yield this.save(profile));
            }
            return savedProfiles;
        });
    }
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = [];
            accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.forEach(el => {
                arr.push({
                    _localUUID: el.profileId,
                    updatedStamp: {
                        $gt: el.lastSyncStamp || 0
                    }
                });
            });
            let profiles = yield ProfileRepository_1.ProfileRepository.find({
                where: {
                    $or: [
                        {
                            userId: phone,
                            updatedStamp: {
                                $gt: lastSyncStamp || 0
                            }
                        },
                        {
                            "accessTo.userId": { $eq: phone },
                        },
                        ...arr
                    ],
                }
            });
            if (profiles == null) {
                profiles = [];
            }
            let rawDocuments = profiles;
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
            let arr = [];
            accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.forEach(el => {
                arr.push({
                    _localUUID: el.profileId,
                    updatedStamp: {
                        $gt: el.lastSyncStamp || 0
                    }
                });
            });
            let profiles = yield ProfileRepository_1.ProfileRepository.find({
                where: {
                    $or: [
                        {
                            userId: phone,
                            updatedStamp: {
                                $gt: lastSyncStamp || 0
                            }
                        },
                        {
                            "accessTo.userId": { $eq: phone },
                        },
                        ...arr
                    ],
                }
            });
            if (profiles == null) {
                profiles = [];
            }
            let rawDocuments = profiles;
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
    generateNewProfile(phone) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const profile = new Profile_1.Profile();
            profile.profileName = 'Bill Book';
            profile.createdStamp = profile.updatedStamp = (+new Date() - 100);
            profile.deletedStamp = 0;
            profile.syncStamp = (+new Date());
            profile.iSetItemSelectorStyleWeb = 'RestaurantImage';
            profile.pSetTermsAndConditions = 'Thank You! Visit Again!';
            profile._localUUID = Utils_1.default.getUUID() + '' + Utils_1.default.generateRandomPhone(4);
            profile.userId = phone;
            const savedProfile = yield this.save(profile);
            if (savedProfile === null || savedProfile === void 0 ? void 0 : savedProfile._localUUID) {
                return resolve(savedProfile);
            }
            else {
                return resolve(null);
            }
        }));
    }
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProfileRepository_1.ProfileRepository.delete({
                userId
            });
        });
    }
    permanentDelete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ProfileRepository_1.ProfileRepository.delete(_id);
        });
    }
    dublicateProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProfileRepository_1.ProfileRepository.aggregate([
                {
                    $match: {},
                },
                {
                    $group: {
                        _id: {
                            _localUUID: '$_localUUID',
                        },
                        count: {
                            $sum: 1,
                        }
                    },
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 100000
                }
            ]).toArray();
        });
    }
    restoreProfile(userId, _localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let profile = yield ProfileRepository_1.ProfileRepository.findOneBy({
                userId,
                _localUUID
            });
            if (profile === null || profile === void 0 ? void 0 : profile._localUUID) {
                profile.deletedStamp = 0;
                profile.updatedStamp = +new Date();
                profile.syncStamp = +new Date() + 2000;
                yield ProfileRepository_1.ProfileRepository.updateMany({
                    _localUUID: profile._localUUID
                }, {
                    "$set": Object.assign({}, profile)
                });
                try {
                    let collectionName = 'Profile';
                    let latestDocumentUpdateStamp = profile.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profile.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${profile.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                        yield (0, RedisApp_1.SetToRedis)(`${profile._localUUID}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                }
                catch (err) {
                }
            }
            return profile;
        });
    }
};
ProfileService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=ProfileService.js.map