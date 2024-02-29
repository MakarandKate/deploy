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
exports.deviceValidRouter = exports.deviceAuthRouter = exports.versionRouter = exports.wifiTestRouter = exports.dataEntryRouter = exports.recordRouter = void 0;
const CalcRecord_1 = require("../../api/models/CalcRecord");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const CalcRecordRepository_1 = require("../../api/repositories/CalcRecordRepository");
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const CalcRecordService_1 = require("../../api/services/CalcRecordService");
const GenearteSaleService_1 = require("../../api/services/GenearteSaleService");
const calcRecordService = typedi_1.default.get(CalcRecordService_1.CalcRecordService);
const generateSaleService = typedi_1.default.get(GenearteSaleService_1.GenerateSaleService);
const recordRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let bodyText = '';
        if (typeof (body) == "string") {
            bodyText = body;
        }
        else if (typeof (body) == "number") {
            bodyText = body + '';
        }
        else {
            try {
                bodyText = JSON.stringify(body);
            }
            catch (err) {
                bodyText = body === null || body === void 0 ? void 0 : body.toString();
            }
        }
        let calcRecord = new CalcRecord_1.CalcRecord();
        calcRecord.createdStamp = calcRecord.updatedStamp = calcRecord._is = +new Date();
        calcRecord.deletedStamp = 0;
        calcRecord._localUUID = Utils_1.default.getUUID();
        calcRecord.recordText = bodyText;
        calcRecord = calcRecord.compress();
        let savedRecord = yield CalcRecordRepository_1.CalcRecordRepository.save(calcRecord);
        return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { calcRecord: savedRecord }));
    }
    catch (err) {
    }
    return res.send(Object.assign({}, Page_1.StatusFailed));
});
exports.recordRouter = recordRouter;
const dataEntryRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let exp = body.pE;
        if (exp.indexOf("=") != -1) {
            exp = exp.substring(0, exp.indexOf("="));
        }
        let userId = body.userId || "9998887777";
        let profileId = body.profileId || "e050b0d6-253c-437c-a6e6-af7f2a85ae9991667";
        let partyPhone = body.phone;
        if (partyPhone) {
            partyPhone = (partyPhone + '').slice(-10);
            if (!Utils_1.default.isNumber(partyPhone)) {
                partyPhone = null;
            }
        }
        let totalBill = calcRecordService.expressionSolver(exp);
        let sale = yield generateSaleService.generateSale(userId, profileId, partyPhone, totalBill === null || totalBill === void 0 ? void 0 : totalBill.billItems);
        let calcRecord = new CalcRecord_1.CalcRecord();
        calcRecord.createdStamp = calcRecord.updatedStamp = calcRecord._is = +new Date();
        calcRecord.deletedStamp = 0;
        calcRecord._localUUID = Utils_1.default.getUUID();
        calcRecord.recordText = JSON.stringify(body);
        calcRecord = calcRecord.compress();
        let savedRecord = yield CalcRecordRepository_1.CalcRecordRepository.save(calcRecord);
        return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { sale }));
    }
    catch (err) {
    }
    return res.send(Object.assign({}, Page_1.StatusFailed));
});
exports.dataEntryRouter = dataEntryRouter;
const wifiTestRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.wifiTestRouter = wifiTestRouter;
const versionRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(Object.assign({ versionCode: 1, version: '1.0.0' }, Page_1.StatusSuccess));
});
exports.versionRouter = versionRouter;
const deviceAuthRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        if ((body === null || body === void 0 ? void 0 : body.macID) && (body === null || body === void 0 ? void 0 : body.userPhoneNumber) && (body === null || body === void 0 ? void 0 : body.createdStamp) && (body === null || body === void 0 ? void 0 : body.updatedStamp)) {
            let calcRecord = new CalcRecord_1.CalcRecord();
            calcRecord.createdStamp = calcRecord.updatedStamp = calcRecord._is = +new Date();
            calcRecord.deletedStamp = 0;
            calcRecord._localUUID = Utils_1.default.getUUID();
            calcRecord.recordText = JSON.stringify(body);
            calcRecord = calcRecord.compress();
            let savedRecord = yield CalcRecordRepository_1.CalcRecordRepository.save(calcRecord);
            return res.send(Object.assign({}, Page_1.StatusSuccess));
        }
        else {
            return res.send(Object.assign({}, Page_1.StatusFailed));
        }
    }
    catch (err) {
    }
    return res.send(Object.assign({}, Page_1.StatusFailed));
});
exports.deviceAuthRouter = deviceAuthRouter;
const deviceValidRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { "uniqueEZOID": "HXFXTX", "deviceRegistered": "1", "createdStamp": 1699989639751, "updatedStamp": 1699989639751, "deletedStamp": 0 }));
});
exports.deviceValidRouter = deviceValidRouter;
//# sourceMappingURL=record.js.map