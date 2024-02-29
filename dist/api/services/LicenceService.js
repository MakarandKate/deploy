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
exports.LicenceService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Licence_1 = require("../models/Licence");
const LicenceRepository_1 = require("../repositories/LicenceRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const request_1 = __importDefault(require("request"));
const ProfileRepository_1 = require("../repositories/ProfileRepository");
const UserRepository_1 = require("../repositories/UserRepository");
let LicenceService = class LicenceService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(LicenceRepository_1.LicenceRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LicenceRepository_1.LicenceRepository.findDeleted();
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
            let checkDocument = yield LicenceRepository_1.LicenceRepository.findOne({
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
                    let updateResult = yield LicenceRepository_1.LicenceRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield LicenceRepository_1.LicenceRepository.findOne({
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
                let savedDocument = yield LicenceRepository_1.LicenceRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
            }
            try {
                let collectionName = 'Licence';
                let latestDocumentUpdateStamp = document.updatedStamp;
                let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.userId}_${collectionName}`);
                let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    yield (0, RedisApp_1.SetToRedis)(`_proe_${document.userId}`, `${document.proExpiryStamp}`);
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
            let collectionName = 'Licence';
            let licences = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                licences = yield LicenceRepository_1.LicenceRepository.find({
                    where: {
                        userId: phone,
                        updatedStamp: {
                            $gt: lastSyncStamp || 0
                        }
                    }
                });
            }
            if (licences == null) {
                licences = [];
            }
            if (lastSyncStamp == 0 && licences.length == 0) {
                let licence = new Licence_1.Licence();
                licence.createdStamp = licence.updatedStamp = +new Date();
                licence.proActivationStamp = +new Date();
                let proStampFromDb = yield getProStamp(phone);
                licence.proExpiryStamp = proStampFromDb;
                if (proStampFromDb == 0) {
                    licence.proExpiryStamp = licence.proActivationStamp; //+(7*24*60*60*1000);
                }
                licence.deletedStamp = 0;
                licence.syncStamp = +new Date();
                licence.smsCredits = 100;
                licence.whastappMessageCredits = 100;
                licence.billPrintCredit = 1000;
                licence._localUUID = Utils_1.default.getUUID();
                licence.userId = phone;
                licence._is = +new Date();
                let savedLicence = yield LicenceRepository_1.LicenceRepository.save(licence);
                licences.push(savedLicence);
                try {
                    let collectionName = 'Licence';
                    let latestDocumentUpdateStamp = savedLicence.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${savedLicence.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${savedLicence.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                        yield (0, RedisApp_1.SetToRedis)(`_proe_${licence.userId}`, `${licence.proExpiryStamp}`);
                    }
                }
                catch (err) { }
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let userId = accessProfiles[i].userId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let profileLicences = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${userId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileLicences = yield LicenceRepository_1.LicenceRepository.find({
                            where: {
                                userId,
                                updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                },
                            }
                        });
                    }
                    if (profileLicences && profileLicences.length) {
                        licences.push(...profileLicences);
                    }
                }
            }
            let rawDocuments = licences;
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
            let collectionName = 'Licence';
            let licences = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                licences = yield LicenceRepository_1.LicenceRepository.find({
                    where: {
                        userId: phone,
                        updatedStamp: {
                            $gt: lastSyncStamp || 0
                        }
                    }
                });
            }
            if (licences == null) {
                licences = [];
            }
            if (lastSyncStamp == 0 && licences.length == 0) {
                let licence = new Licence_1.Licence();
                licence.createdStamp = licence.updatedStamp = +new Date();
                licence.proActivationStamp = +new Date();
                let proStampFromDb = yield getProStamp(phone);
                licence.proExpiryStamp = proStampFromDb;
                if (proStampFromDb == 0) {
                    licence.proExpiryStamp = licence.proActivationStamp; //+(7*24*60*60*1000);
                }
                licence.deletedStamp = 0;
                licence.syncStamp = +new Date();
                licence.smsCredits = 100;
                licence.whastappMessageCredits = 100;
                licence.billPrintCredit = 1000;
                licence._localUUID = Utils_1.default.getUUID();
                licence.userId = phone;
                licence._is = +new Date();
                let savedLicence = yield LicenceRepository_1.LicenceRepository.save(licence);
                licences.push(savedLicence);
                try {
                    let collectionName = 'Licence';
                    let latestDocumentUpdateStamp = savedLicence.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${savedLicence.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${savedLicence.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                        yield (0, RedisApp_1.SetToRedis)(`_proe_${licence.userId}`, `${licence.proExpiryStamp}`);
                    }
                }
                catch (err) { }
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let userId = accessProfiles[i].userId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let profileLicences = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${userId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileLicences = yield LicenceRepository_1.LicenceRepository.find({
                            where: {
                                userId,
                                updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                },
                            }
                        });
                    }
                    if (profileLicences && profileLicences.length) {
                        licences.push(...profileLicences);
                    }
                }
            }
            let rawDocuments = licences;
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
            yield LicenceRepository_1.LicenceRepository.delete({
                userId
            });
        });
    }
    decrementWhatsappCredit(userId, decrementBy = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let licence = yield LicenceRepository_1.LicenceRepository.findOneBy({ userId });
            if (licence) {
                if (Utils_1.default.isNumber(licence === null || licence === void 0 ? void 0 : licence.whastappMessageCredits) && Number(licence === null || licence === void 0 ? void 0 : licence.whastappMessageCredits) > 0) {
                    licence.whastappMessageCredits -= decrementBy;
                }
                else if (Utils_1.default.isNumber(licence === null || licence === void 0 ? void 0 : licence.paidWhastappMessageCredits) && Number(licence === null || licence === void 0 ? void 0 : licence.paidWhastappMessageCredits) > 0) {
                    licence.paidWhastappMessageCredits -= decrementBy;
                }
                licence._is = +new Date();
                yield LicenceRepository_1.LicenceRepository.updateMany({
                    userId: licence.userId
                }, {
                    "$set": Object.assign({}, licence)
                });
                try {
                    let collectionName = 'Licence';
                    let latestDocumentUpdateStamp = licence.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${licence.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${licence.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                        yield (0, RedisApp_1.SetToRedis)(`_proe_${licence.userId}`, `${licence.proExpiryStamp}`);
                    }
                }
                catch (err) { }
                return true;
            }
            return false;
        });
    }
    isWhatsappCreditAvailable(userId, creditLimit = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let licence = yield LicenceRepository_1.LicenceRepository.findOneBy({ userId });
            if (licence) {
                if (Utils_1.default.isNumber(licence === null || licence === void 0 ? void 0 : licence.whastappMessageCredits) && Number(licence === null || licence === void 0 ? void 0 : licence.whastappMessageCredits) >= creditLimit) {
                    return true;
                }
                else if (Utils_1.default.isNumber(licence === null || licence === void 0 ? void 0 : licence.paidWhastappMessageCredits) && Number(licence === null || licence === void 0 ? void 0 : licence.paidWhastappMessageCredits) >= creditLimit) {
                    return true;
                }
            }
            return false;
        });
    }
    checkProFromRedis(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let proExpiryStamp = 0;
            let proExpiryStampStr = yield (0, RedisApp_1.GetFromRedisFirst)(`_proe_${phone}`, () => {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    let licence = yield LicenceRepository_1.LicenceRepository.findOne({
                        where: {
                            userId: phone
                        }
                    });
                    if (licence && licence.userId) {
                        resolve(`${licence.proExpiryStamp}`);
                    }
                    resolve(`0`);
                }));
            });
            try {
                proExpiryStamp = Number(proExpiryStampStr) || 0;
            }
            catch (error) {
            }
            return proExpiryStamp;
        });
    }
    getProfileDetailsByPhone(phoneArr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (phoneArr) {
                let licences = yield LicenceRepository_1.LicenceRepository.find({
                    where: {
                        userId: {
                            $in: phoneArr
                        },
                    },
                    order: {
                        proExpiryStamp: -1
                    }
                });
                let proData = [];
                for (let licence of licences) {
                    let data = {
                        phone: null,
                        businessType: null,
                        proActivationStamp: 0,
                        lastActiveDate: 0,
                        proExpiryDate: 0,
                    };
                    let profiles = yield ProfileRepository_1.ProfileRepository.find({
                        where: {
                            userId: licence.userId,
                        },
                        order: {
                            createdStamp: -1
                        }
                    });
                    let profilewithEzoIndustry = profiles.find(profile => (profile === null || profile === void 0 ? void 0 : profile.ezoIndustry) !== null);
                    let user = yield UserRepository_1.UserRepository.findOne({
                        where: {
                            phone: licence.userId
                        }
                    });
                    data.businessType = profilewithEzoIndustry === null || profilewithEzoIndustry === void 0 ? void 0 : profilewithEzoIndustry.ezoIndustry,
                        data.proActivationStamp = licence === null || licence === void 0 ? void 0 : licence.proActivationStamp,
                        data.proExpiryDate = licence === null || licence === void 0 ? void 0 : licence.proExpiryStamp,
                        data.lastActiveDate = user === null || user === void 0 ? void 0 : user.lastActiveStamp,
                        data.phone = licence === null || licence === void 0 ? void 0 : licence.userId,
                        proData.push(data);
                }
                return proData;
            }
            return null;
        });
    }
};
LicenceService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], LicenceService);
exports.LicenceService = LicenceService;
function getProStamp(phone) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            (0, request_1.default)(`https://ezobanks.com:5001/api/v2/user/proUserStampByPhone?phone=${phone}`, (err, response) => {
                if (err) {
                    console.error("-----------------------");
                    console.error("LicenceService:349");
                    console.error(err);
                    console.error("-----------------------");
                    return resolve(0);
                }
                try {
                    let resp = response === null || response === void 0 ? void 0 : response.body;
                    if (resp) {
                        let obj = JSON.parse(resp);
                        if (obj === null || obj === void 0 ? void 0 : obj.isPro) {
                            return resolve(Number(obj === null || obj === void 0 ? void 0 : obj.isPro) || 0);
                        }
                        else {
                            return resolve(0);
                        }
                    }
                    else {
                        return resolve(0);
                    }
                }
                catch (err) {
                    return resolve(0);
                }
            });
        });
    });
}
//# sourceMappingURL=LicenceService.js.map