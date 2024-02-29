"use strict";
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
exports.unprocessedRouter = exports.updateMessageCreditRouter = exports.updateLicenseRouter = void 0;
const Licence_1 = require("../../api/models/Licence");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const UserRepository_1 = require("../../api/repositories/UserRepository");
const Page_1 = require("../../lib/Page");
const request_1 = __importDefault(require("request"));
const typeorm_1 = require("typeorm");
const RedisApp_1 = require("../../lib/RedisApp");
const updateLicenseRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId;
    let proExpiryStamp = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.proExpiryStamp;
    let billPrintCredit = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.billPrintCredit;
    let smsCredits = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.smsCredits;
    let whastappMessageCredits = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.whastappMessageCredits;
    let checkLicense = yield LicenceRepository_1.LicenceRepository.findOne({
        where: {
            userId
        },
    });
    if (checkLicense) {
        checkLicense.syncStamp = +new Date();
        checkLicense.billPrintCredit = billPrintCredit;
        checkLicense.proExpiryStamp = proExpiryStamp;
        checkLicense.smsCredits = smsCredits;
        checkLicense.whastappMessageCredits = whastappMessageCredits;
        checkLicense.updatedStamp = +new Date();
        checkLicense._is = +new Date();
        let updateResult = yield LicenceRepository_1.LicenceRepository.updateMany({
            userId: checkLicense.userId
        }, {
            "$set": Object.assign({}, checkLicense)
        });
    }
    else {
        let saveLicense = new Licence_1.Licence();
        checkLicense.syncStamp = +new Date();
        saveLicense.createdStamp = saveLicense.updatedStamp = +new Date();
        saveLicense.deletedStamp = 0;
        saveLicense.userId = userId;
        saveLicense.billPrintCredit = billPrintCredit;
        saveLicense.proExpiryStamp = proExpiryStamp;
        saveLicense.smsCredits = smsCredits;
        saveLicense.whastappMessageCredits = whastappMessageCredits;
        saveLicense._localUUID = Utils_1.default.getUUID();
        saveLicense._is = +new Date();
        yield LicenceRepository_1.LicenceRepository.save(saveLicense);
    }
    let license = yield LicenceRepository_1.LicenceRepository.findOne({
        where: {
            userId
        },
    });
    try {
        let collectionName = 'Licence';
        let latestDocumentUpdateStamp = license.updatedStamp;
        let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${license.userId}_${collectionName}`);
        let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
        if (userIdCollectionStamp < latestDocumentUpdateStamp) {
            yield (0, RedisApp_1.SetToRedis)(`${license.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
        }
    }
    catch (err) { }
    res.send({
        userId,
        license
    });
});
exports.updateLicenseRouter = updateLicenseRouter;
const updateMessageCreditRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    let userId = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.phone;
    let credits = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.credits;
    let checkLicense = yield LicenceRepository_1.LicenceRepository.findOne({
        where: {
            userId
        },
    });
    if (checkLicense) {
        let paidWhastappMessageCredits = Number(checkLicense.paidWhastappMessageCredits) || 0;
        paidWhastappMessageCredits += credits;
        checkLicense.syncStamp = +new Date();
        checkLicense.paidWhastappMessageCredits = paidWhastappMessageCredits;
        checkLicense.updatedStamp = +new Date();
        checkLicense._is = +new Date();
        let updateResult = yield LicenceRepository_1.LicenceRepository.updateMany({
            userId: checkLicense.userId
        }, {
            "$set": Object.assign({}, checkLicense)
        });
        let license = yield LicenceRepository_1.LicenceRepository.findOne({
            where: {
                userId
            },
        });
        try {
            let collectionName = 'Licence';
            let latestDocumentUpdateStamp = license.updatedStamp;
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${license.userId}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                yield (0, RedisApp_1.SetToRedis)(`${license.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                yield (0, RedisApp_1.SetToRedis)(`_proe_${license.userId}`, `${license.proExpiryStamp}`);
            }
        }
        catch (err) { }
        return res.send(Object.assign({}, Page_1.StatusSuccess));
    }
    return res.send(Object.assign({}, Page_1.StatusFailed));
});
exports.updateMessageCreditRouter = updateMessageCreditRouter;
const unprocessedRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    unprocessedFn();
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.unprocessedRouter = unprocessedRouter;
function unprocessedFn() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield UserRepository_1.UserRepository.find({
            where: {
                createdStamp: (0, typeorm_1.MoreThan)(1687804200000)
            },
            order: {
                createdStamp: -1
            }
        });
        for (let i = 0; i < users.length; i++) {
            try {
                if (!((_a = users[i]) === null || _a === void 0 ? void 0 : _a.phone)) {
                    continue;
                }
                if (((_c = (_b = users[i]) === null || _b === void 0 ? void 0 : _b.phone) === null || _c === void 0 ? void 0 : _c.length) != 10) {
                    continue;
                }
                let chklicence = yield LicenceRepository_1.LicenceRepository.findOne({
                    where: {
                        userId: users[i].phone
                    }
                });
                if (!chklicence) {
                    let licence = new Licence_1.Licence();
                    licence.createdStamp = licence.updatedStamp = +new Date();
                    licence.proActivationStamp = +new Date();
                    let proStampFromDb = yield getProStamp(users[i].phone);
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
                    licence.userId = users[i].phone;
                    licence._is = +new Date();
                    yield LicenceRepository_1.LicenceRepository.save(licence);
                }
                else {
                    if (!(chklicence === null || chklicence === void 0 ? void 0 : chklicence.proExpiryStamp)) {
                        chklicence.proActivationStamp = +new Date();
                        let proStampFromDb = yield getProStamp(users[i].phone);
                        chklicence.proExpiryStamp = proStampFromDb;
                        if (proStampFromDb == 0) {
                            chklicence.proExpiryStamp = chklicence.proActivationStamp; //+(7*24*60*60*1000);
                        }
                        chklicence._is = +new Date();
                        yield LicenceRepository_1.LicenceRepository.updateMany({
                            userId: chklicence.userId
                        }, {
                            "$set": Object.assign({}, chklicence)
                        });
                    }
                }
            }
            catch (err) {
                console.error(i, err);
            }
        }
    });
}
function getProStamp(phone) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            (0, request_1.default)(`https://ezobanks.com:5001/api/v2/user/proUserStampByPhone?phone=${phone}`, (err, response) => {
                if (err) {
                    console.error("-----------------------");
                    console.error("update:212");
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
//# sourceMappingURL=update.js.map