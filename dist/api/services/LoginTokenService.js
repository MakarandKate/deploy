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
exports.LoginTokenService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const LoginTokenRepository_1 = require("../repositories/LoginTokenRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const ProfileRepository_1 = require("../repositories/ProfileRepository");
let LoginTokenService = class LoginTokenService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(LoginTokenRepository_1.LoginTokenRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LoginTokenRepository_1.LoginTokenRepository.findDeleted();
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
            let checkDocument = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
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
                    let updateResult = yield LoginTokenRepository_1.LoginTokenRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
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
                let savedDocument = yield LoginTokenRepository_1.LoginTokenRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
            }
            try {
                let collectionName = 'LoginToken';
                let latestDocumentUpdateStamp = document.updatedStamp;
                let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.userId}_${collectionName}`);
                let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
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
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let collectionName = 'LoginToken';
            let loginTokens = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                loginTokens = yield LoginTokenRepository_1.LoginTokenRepository.find({
                    where: {
                        userId: phone,
                        updatedStamp: {
                            $gt: lastSyncStamp || 0
                        }
                    }
                });
            }
            if (loginTokens == null) {
                loginTokens = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let userId = accessProfiles[i].userId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let profileLoginTokens = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${userId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileLoginTokens = yield LoginTokenRepository_1.LoginTokenRepository.find({
                            where: {
                                userId,
                                updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                },
                            }
                        });
                    }
                    if (profileLoginTokens && profileLoginTokens.length) {
                        loginTokens.push(...profileLoginTokens);
                    }
                }
            }
            let rawDocuments = loginTokens;
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAllv3(phone, includeStaffs = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let phones = [phone];
            let allRawDocuments = [];
            if (includeStaffs) {
                let profiles = yield ProfileRepository_1.ProfileRepository.find({
                    where: {
                        userId: phone,
                        deletedStamp: 0,
                    }
                });
                if ((profiles === null || profiles === void 0 ? void 0 : profiles.length) && Array.isArray(profiles)) {
                    profiles === null || profiles === void 0 ? void 0 : profiles.forEach(profile => {
                        var _a, _b;
                        if (((_a = profile === null || profile === void 0 ? void 0 : profile.accessTo) === null || _a === void 0 ? void 0 : _a.length) && Array.isArray(profile === null || profile === void 0 ? void 0 : profile.accessTo)) {
                            (_b = profile === null || profile === void 0 ? void 0 : profile.accessTo) === null || _b === void 0 ? void 0 : _b.forEach(staff => (staff === null || staff === void 0 ? void 0 : staff.userId) && phones.push(staff === null || staff === void 0 ? void 0 : staff.userId));
                        }
                    });
                }
            }
            if (phones === null || phones === void 0 ? void 0 : phones.length) {
                for (let i = 0; i < phones.length; i++) {
                    const phone = phones[i];
                    let loginTokens = yield LoginTokenRepository_1.LoginTokenRepository.find({
                        where: {
                            userId: phone,
                        },
                        order: {
                            createdStamp: -1
                        }
                    });
                    if (loginTokens == null) {
                        loginTokens = [];
                    }
                    let rawDocuments = loginTokens;
                    if (rawDocuments.length > 5000) {
                        rawDocuments = rawDocuments.slice(0, 5000);
                    }
                    for (let i = 0; i < rawDocuments.length; i++) {
                        let _uuid = rawDocuments[i]._localUUID;
                        let st = 0;
                        try {
                            st = +(yield (0, RedisApp_1.GetFromRedis)(`LT_${_uuid}`)) || 0;
                        }
                        catch (err) {
                        }
                        rawDocuments[i].lastActiveStamp = st;
                    }
                    rawDocuments.forEach((x) => {
                        x._serverIdRef = x._id.toString();
                        delete x._id;
                        Utils_1.default.removeNullKeysRecursively(x);
                        allRawDocuments.push(x);
                    });
                }
            }
            return allRawDocuments;
        });
    }
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LoginTokenRepository_1.LoginTokenRepository.delete({
                userId
            });
        });
    }
    initiateLogout(localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let loginToken = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
                    where: {
                        _localUUID: localUUID
                    }
                });
                if (loginToken != null) {
                    loginToken.logoutInitiatedStamp = +new Date();
                    yield LoginTokenRepository_1.LoginTokenRepository.updateOne({
                        _localUUID: loginToken._localUUID
                    }, {
                        "$set": Object.assign({}, loginToken)
                    });
                    let savedDocument = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
                        where: {
                            _localUUID: localUUID,
                        }
                    });
                    if ((savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.logoutInitiatedStamp) == (loginToken === null || loginToken === void 0 ? void 0 : loginToken.logoutInitiatedStamp)) {
                        return true;
                    }
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
    initiateLogoutToAll(phone, includeStaffs = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let loginTokens = yield this.fetchAllv3(phone, includeStaffs);
                for (let i = 0; i < loginTokens.length; i++) {
                    let loginToken = loginTokens[i];
                    if (loginToken != null) {
                        loginToken.logoutInitiatedStamp = +new Date();
                        LoginTokenRepository_1.LoginTokenRepository.updateOne({
                            _localUUID: loginToken._localUUID
                        }, {
                            "$set": Object.assign({}, loginToken)
                        });
                    }
                }
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    completeLogout(localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let loginToken = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
                    where: {
                        _localUUID: localUUID
                    }
                });
                if (loginToken != null) {
                    loginToken.logoutCompletedStamp = +new Date();
                    yield LoginTokenRepository_1.LoginTokenRepository.updateOne({
                        _localUUID: loginToken._localUUID
                    }, {
                        "$set": Object.assign({}, loginToken)
                    });
                    let savedDocument = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
                        where: {
                            _localUUID: localUUID,
                        }
                    });
                    if ((savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.logoutCompletedStamp) == (loginToken === null || loginToken === void 0 ? void 0 : loginToken.logoutCompletedStamp)) {
                        return true;
                    }
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
    isLogoutRequest(localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let loginToken = yield LoginTokenRepository_1.LoginTokenRepository.findOne({
                    where: {
                        _localUUID: localUUID
                    }
                });
                if ((loginToken === null || loginToken === void 0 ? void 0 : loginToken.logoutInitiatedStamp) && !(loginToken === null || loginToken === void 0 ? void 0 : loginToken.logoutCompletedStamp)) {
                    return true;
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
};
LoginTokenService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], LoginTokenService);
exports.LoginTokenService = LoginTokenService;
//# sourceMappingURL=LoginTokenService.js.map