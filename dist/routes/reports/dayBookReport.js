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
exports.activeUsers = exports.dayBookReportMsg = exports.dayBookReport = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ReportService_1 = require("../../api/services/ReportService");
const DaybookService_1 = require("../../api/services/DaybookService");
const reportService = typedi_1.default.get(ReportService_1.ReportService);
const dayBookService = typedi_1.default.get(DaybookService_1.DayBookService);
const dayBookReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let phone = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.phone;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.profileId;
    let startStamp = Number((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.startStamp);
    let endStamp = Number((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.endStamp);
    if (phone && profileId && startStamp && endStamp) {
        let dayBookReportData = yield dayBookService.getDayBookReportData(phone, profileId, startStamp, endStamp);
        (0, Page_1.setPage)(req, res, {
            title: 'Day Book Report',
            description: '',
            view: 'reports/dayBookReport',
            data: {
                dayBookReportData
            },
        });
    }
    else {
        res.status(400).send(Object.assign(Object.assign({}, Page_1.StatusFailed), { message: 'Invalid Parameters' }));
    }
});
exports.dayBookReport = dayBookReport;
const dayBookReportMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h;
    let phone = (_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.phone;
    let profileId = (_f = req === null || req === void 0 ? void 0 : req.params) === null || _f === void 0 ? void 0 : _f.profileId;
    let startStamp = Number((_g = req === null || req === void 0 ? void 0 : req.params) === null || _g === void 0 ? void 0 : _g.startStamp);
    let endStamp = Number((_h = req === null || req === void 0 ? void 0 : req.params) === null || _h === void 0 ? void 0 : _h.endStamp);
    if (phone && profileId && startStamp && endStamp) {
        let dayBookReportData = yield reportService.sendDayBookMessageObj(phone, profileId, startStamp, endStamp);
        res.send(dayBookReportData);
    }
    else {
        res.status(400).send(Object.assign(Object.assign({}, Page_1.StatusFailed), { message: 'Invalid Parameters' }));
    }
});
exports.dayBookReportMsg = dayBookReportMsg;
const activeUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let days = Number(req.params.days) || 1;
    let activeUser = yield reportService.getAllAccountsInDays(days);
    return res.send([...activeUser]);
    //return res.send({...StatusFailed})
});
exports.activeUsers = activeUsers;
//# sourceMappingURL=dayBookReport.js.map