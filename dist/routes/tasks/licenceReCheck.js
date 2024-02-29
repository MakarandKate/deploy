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
exports.licenceRecheckAllRouter = exports.licenceRecheckForDayRouter = exports.licenceRecheckAfter30MinRouter = exports.licenceRecheckRouter = void 0;
const Licence_1 = require("../../api/models/Licence");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const Page_1 = require("../../lib/Page");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const request_1 = __importDefault(require("request"));
const RedisApp_1 = require("../../lib/RedisApp");
const licence_1 = require("../../api/modelsv2/licence");
const licenceRecheckRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let startTime = +((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.startTime) || 0;
    let endTime = +((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.endTime) || 0;
    let proUsers = yield getProUsers(startTime, endTime);
    for (let i = 0; i < proUsers.length; i++) {
        yield checkLicenceForUser(proUsers[i].phone, proUsers[i].is_pro);
    }
    res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { proUsers }));
});
exports.licenceRecheckRouter = licenceRecheckRouter;
const licenceRecheckAfter30MinRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dt = +new Date();
    let startTime = dt - (60 * 60 * 1000);
    setTimeout(() => {
        (0, request_1.default)(`https://db.ezobooks.in/kappa/tasks/licenceRecheck?startTime=${startTime}&endTime=${dt}`, () => { });
    }, 100);
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.licenceRecheckAfter30MinRouter = licenceRecheckAfter30MinRouter;
const licenceRecheckForDayRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dt = +new Date();
    let startTime = dt - (24 * 60 * 60 * 1000);
    setTimeout(() => {
        (0, request_1.default)(`https://db.ezobooks.in/kappa/tasks/licenceRecheck?startTime=${startTime}&endTime=${dt}`, () => { });
    }, 100);
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.licenceRecheckForDayRouter = licenceRecheckForDayRouter;
const licenceRecheckAllRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dbUsers = yield getAllProFromDb();
    let phoneArr = [];
    dbUsers.forEach((u) => {
        if (u.phone) {
            phoneArr.push(u.phone);
        }
    });
    let mongoLicense = yield licence_1.LicenceRepo.find({
        userId: {
            $in: phoneArr
        }
    });
    let duplicatesInMongo = [];
    let notFoundInMongo = [];
    let mismatchedInMongo = [];
    dbUsers.sort((a, b) => {
        return a.phone > b.phone ? 1 : -1;
    });
    mongoLicense.sort((a, b) => {
        return a.userId > b.userId ? 1 : -1;
    });
    for (let i = 0; i < mongoLicense.length; i++) {
        if (i > 0) {
            if (mongoLicense[i - 1].userId == mongoLicense[i].userId) {
                duplicatesInMongo.push(mongoLicense[i].userId);
            }
        }
    }
    for (let i = 0; i < dbUsers.length; i++) {
        let isPhoneFound = false;
        let lice = false;
        for (let ii = 0; ii < mongoLicense.length; ii++) {
            if (dbUsers[i].phone == mongoLicense[ii].userId) {
                isPhoneFound = true;
                if (dbUsers[i].is_pro == mongoLicense[ii].proExpiryStamp) {
                    lice = true;
                }
            }
        }
        if (!isPhoneFound) {
            notFoundInMongo.push(dbUsers[i]);
        }
        else {
            if (!lice) {
                mismatchedInMongo.push(dbUsers[i]);
            }
        }
    }
    let toWork = [...notFoundInMongo, ...mismatchedInMongo];
    for (let i = 0; i < toWork.length; i++) {
        yield licenseFix(toWork[i].phone, toWork[i].is_pro);
    }
    res.send(Object.assign({ duplicatesInMongo,
        notFoundInMongo,
        mismatchedInMongo,
        toWork }, Page_1.StatusSuccess));
});
exports.licenceRecheckAllRouter = licenceRecheckAllRouter;
function licenseFix(phone, ispro) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            try {
                let url = `https://db.ezobooks.in/kappa/licence/setPro/${phone}/${ispro}`;
                (0, request_1.default)(url, (error, response) => {
                    resolve(true);
                });
            }
            catch (err) {
                resolve(true);
            }
        });
    });
}
function checkLicenceForUser(userId, proExpiryStamp) {
    return __awaiter(this, void 0, void 0, function* () {
        let checkLicense = yield LicenceRepository_1.LicenceRepository.findOne({
            where: {
                userId
            },
        });
        if (checkLicense) {
            if (checkLicense.proExpiryStamp != proExpiryStamp) {
                delete checkLicense._id;
                checkLicense.proExpiryStamp = proExpiryStamp;
                checkLicense.updatedStamp = +new Date();
                checkLicense._is = +new Date();
                let updateResult = yield LicenceRepository_1.LicenceRepository.updateMany({
                    userId: checkLicense.userId
                }, {
                    "$set": Object.assign({}, checkLicense)
                });
            }
            else {
            }
        }
        else {
            let saveLicense = new Licence_1.Licence();
            saveLicense.syncStamp = +new Date();
            saveLicense.createdStamp = saveLicense.updatedStamp = +new Date();
            saveLicense.deletedStamp = 0;
            saveLicense.userId = userId;
            saveLicense.billPrintCredit = 1000;
            saveLicense.proExpiryStamp = proExpiryStamp;
            saveLicense.smsCredits = 100;
            saveLicense.whastappMessageCredits = 100;
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
    });
}
function getProUsers(startTime, endTime) {
    return new Promise((resolve, reject) => {
        let url = `https://ezobanks.com:5001/api/v2/user/getLast30MinPro`;
        if (startTime && endTime) {
            url = `https://ezobanks.com:5001/api/v2/user/getProByTimeRange?startTime=${startTime}&endTime=${endTime}`;
        }
        (0, request_1.default)(url, (err, response) => {
            if (err) {
                console.error("-----------------------");
                console.error("licenseRecheck:85");
                console.error(err);
                console.error("-----------------------");
                return resolve([]);
            }
            try {
                let resp = response === null || response === void 0 ? void 0 : response.body;
                if (resp) {
                    let obj = JSON.parse(resp);
                    if (obj === null || obj === void 0 ? void 0 : obj.users) {
                        return resolve(obj === null || obj === void 0 ? void 0 : obj.users);
                    }
                    else {
                        return resolve([]);
                    }
                }
                else {
                    return resolve([]);
                }
            }
            catch (err) {
                return resolve([]);
            }
        });
    });
}
function getAllProFromDb() {
    return new Promise((resolve, reject) => {
        let url = `https://ezobanks.com:5001/api/v2/user/getAllProInLast10days`;
        (0, request_1.default)(url, (err, response) => {
            if (err) {
                return resolve([]);
            }
            try {
                let resp = response === null || response === void 0 ? void 0 : response.body;
                if (resp) {
                    let obj = JSON.parse(resp);
                    if (obj === null || obj === void 0 ? void 0 : obj.users) {
                        return resolve(obj === null || obj === void 0 ? void 0 : obj.users);
                    }
                    else {
                        return resolve([]);
                    }
                }
                else {
                    return resolve([]);
                }
            }
            catch (err) {
                return resolve([]);
            }
        });
    });
}
//# sourceMappingURL=licenceReCheck.js.map