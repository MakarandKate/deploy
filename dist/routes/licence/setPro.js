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
exports.unprocessedRouter = exports.setProRouter = void 0;
const Licence_1 = require("../../api/models/Licence");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const UserRepository_1 = require("../../api/repositories/UserRepository");
const Page_1 = require("../../lib/Page");
const request_1 = __importDefault(require("request"));
const RedisApp_1 = require("../../lib/RedisApp");
const setProRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let phone = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.phone;
        let proExpiryStamp = Number((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.expiryStamp) || 0;
        let checkLicense = yield LicenceRepository_1.LicenceRepository.findOne({
            where: {
                userId: phone
            },
        });
        if (checkLicense) {
            checkLicense.proExpiryStamp = proExpiryStamp;
            checkLicense.updatedStamp = checkLicense.proActivationStamp = +new Date();
            delete checkLicense._id;
            checkLicense._is = +new Date();
            let updateResult = yield LicenceRepository_1.LicenceRepository.updateMany({
                userId: checkLicense.userId
            }, {
                "$set": Object.assign({}, checkLicense)
            });
        }
        else {
            let saveLicense = new Licence_1.Licence();
            saveLicense.syncStamp = +new Date();
            saveLicense.createdStamp = saveLicense.updatedStamp = saveLicense.proActivationStamp = +new Date();
            saveLicense.deletedStamp = 0;
            saveLicense.userId = phone;
            saveLicense.billPrintCredit = 1000;
            saveLicense.proExpiryStamp = proExpiryStamp;
            saveLicense.smsCredits = 100;
            saveLicense.whastappMessageCredits = 100;
            saveLicense._localUUID = Utils_1.default.getUUID();
            saveLicense._is = +new Date();
            yield LicenceRepository_1.LicenceRepository.save(saveLicense);
        }
        let licence = yield LicenceRepository_1.LicenceRepository.findOne({
            where: {
                userId: phone
            },
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
        catch (err) {
            console.error("setProRouter:67:err", err);
        }
        return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { licence }));
    }
    catch (err) {
        console.error("setProRouter:76:err", err);
        return res.send(Object.assign({}, Page_1.StatusFailed));
    }
});
exports.setProRouter = setProRouter;
const unprocessedRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    unprocessedFn();
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.unprocessedRouter = unprocessedRouter;
function unprocessedFn() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield UserRepository_1.UserRepository.find({
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
                        chklicence.updatedStamp = +new Date();
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
                    console.error("setPRo:157");
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
//# sourceMappingURL=setPro.js.map