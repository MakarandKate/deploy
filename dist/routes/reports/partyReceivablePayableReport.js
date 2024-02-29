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
exports.partyReceivablePayableReport = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ReportService_1 = require("../../api/services/ReportService");
const reportService = typedi_1.default.get(ReportService_1.ReportService);
const partyReceivablePayableReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let phone = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.phone;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.profileId;
    if (phone && profileId) {
        let profile = yield reportService.getProfile(phone, profileId);
        let partyReceivablePayableReportData = yield reportService.getPartyReceivablePayableReportData(phone, profileId);
        (0, Page_1.setPage)(req, res, {
            title: 'Party Receivable Payable Report',
            description: '',
            view: 'reports/partyReceivablePayableReport',
            data: {
                profile,
                partyReceivablePayableReportData
            },
        });
    }
    else {
        res.status(400).send(Object.assign(Object.assign({}, Page_1.StatusFailed), { message: 'Invalid Parameters' }));
    }
});
exports.partyReceivablePayableReport = partyReceivablePayableReport;
//# sourceMappingURL=partyReceivablePayableReport.js.map