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
exports.updateUserProDetails = exports.activate = exports.activateViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const Licence_1 = require("../../api/models/Licence");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const request_1 = __importDefault(require("request"));
const RedisApp_1 = require("../../lib/RedisApp");
const activateViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, Page_1.setPage)(req, res, {
        title: 'Activate Premium',
        description: '',
        view: 'premium/activate',
    });
});
exports.activateViewRouter = activateViewRouter;
//this will activate premium 
const activate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let phone = (_a = req.body) === null || _a === void 0 ? void 0 : _a.phone;
    let proExpiryStamp = (_b = req.body) === null || _b === void 0 ? void 0 : _b.proExpiryStamp;
    let plan = (_c = req.body) === null || _c === void 0 ? void 0 : _c.plan;
    try {
        if (phone && proExpiryStamp) {
            let checkLicense = yield LicenceRepository_1.LicenceRepository.findOne({
                where: {
                    userId: phone
                },
            });
            let licence = null;
            if (checkLicense) {
                checkLicense.proExpiryStamp = +proExpiryStamp;
                checkLicense.updatedStamp = checkLicense.proActivationStamp = +new Date();
                licence = yield LicenceRepository_1.LicenceRepository.save(checkLicense);
            }
            else {
                let saveLicense = new Licence_1.Licence();
                saveLicense.syncStamp = +new Date();
                saveLicense.createdStamp = saveLicense.updatedStamp = saveLicense.proActivationStamp = +new Date();
                saveLicense.deletedStamp = 0;
                saveLicense.userId = phone;
                saveLicense.billPrintCredit = 1000;
                saveLicense.proExpiryStamp = +proExpiryStamp;
                saveLicense.smsCredits = 100;
                saveLicense.whastappMessageCredits = 100;
                saveLicense._localUUID = Utils_1.default.getUUID();
                saveLicense._is = +new Date();
                licence = yield LicenceRepository_1.LicenceRepository.save(saveLicense);
            }
            try {
                //updating licence update timestamp
                let collectionName = 'Licence';
                let latestDocumentUpdateStamp = licence.updatedStamp;
                let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${licence.userId}_${collectionName}`);
                let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${licence.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    yield (0, RedisApp_1.SetToRedis)(`_proe_${licence.userId}`, `${licence.proExpiryStamp}`);
                }
            }
            catch (error) {
                return res.send(Object.assign({}, Page_1.StatusFailed));
            }
            //updating in sql db 
            let updatedSql = yield updateUserProDetails(licence.userId, licence.proExpiryStamp, 8);
            if (updatedSql) {
                return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { licence }));
            }
            return res.send(Object.assign({}, Page_1.StatusFailed));
        }
        return res.send(Object.assign({}, Page_1.StatusFailed));
    }
    catch (error) {
        return res.send(Object.assign({}, Page_1.StatusFailed));
    }
});
exports.activate = activate;
/**
 *
 * @param phone phone number
 * @param isProStamp timestamp of when it premium will expire
 * @returns it returns true or false
 */
function updateUserProDetails(phone, isProStamp, planName) {
    return new Promise((resolve, reject) => {
        (0, request_1.default)({
            'method': 'POST',
            'url': `https://ezobanks.com:5001/api/v2/user/updateUserProDetails`,
            'headers': {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNo: phone,
                isProStamp: isProStamp,
                planName,
            })
        }, function (error, response) {
            var _a, _b;
            if (error) {
                return resolve(null);
            }
            if (response.body) {
                try {
                    let resBody = JSON.parse(response.body);
                    if (((_a = resBody === null || resBody === void 0 ? void 0 : resBody.data) === null || _a === void 0 ? void 0 : _a.status) === "success" && (resBody === null || resBody === void 0 ? void 0 : resBody.data)) {
                        return resolve((_b = resBody === null || resBody === void 0 ? void 0 : resBody.data) === null || _b === void 0 ? void 0 : _b.mysqlDB);
                    }
                    else {
                        return resolve(false);
                    }
                }
                catch (error) {
                    return resolve(false);
                }
            }
            else {
                return resolve(false);
            }
        });
    });
}
exports.updateUserProDetails = updateUserProDetails;
//# sourceMappingURL=activate.js.map