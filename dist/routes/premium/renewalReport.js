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
exports.getAllCSVData = exports.getRenewalReportDataRouter = exports.getRenewalReportViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const ProfileRepository_1 = require("../../api/repositories/ProfileRepository");
const UserRepository_1 = require("../../api/repositories/UserRepository");
const typedi_1 = __importDefault(require("typedi"));
const FBMigrationService_1 = require("../../api/services/FBMigrationService");
const request = require("request");
const fbMigrationService = typedi_1.default.get(FBMigrationService_1.FBMigrationService);
const getLeadDefaults = (phone, appType) => {
    return {
        phone,
        appType,
        businessType: null,
        saleCount: null,
        lastActiveStamp: null,
        proActivationStamp: null,
        proExpiryStamp: null,
        machineSold: null,
        salePrice: null,
        softwareValidity: null,
        note: null,
    };
};
const getRenewalReportViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, Page_1.setPage)(req, res, {
        title: 'Renewal Report',
        description: '',
        view: 'premium/renewalReport',
    });
});
exports.getRenewalReportViewRouter = getRenewalReportViewRouter;
const getRenewalReportDataRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const startTime = Number((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.startTime) || 0;
        const endTime = Number((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.endTime) || 0;
        if (startTime && endTime) {
            const leads = [];
            const licences = yield LicenceRepository_1.LicenceRepository.find({
                where: {
                    deletedStamp: 0,
                    proExpiryStamp: {
                        $gte: startTime,
                        $lt: endTime,
                    },
                }
            });
            let fastUserPhones = Array.from(new Set(licences === null || licences === void 0 ? void 0 : licences.map(licence => licence === null || licence === void 0 ? void 0 : licence.userId)));
            if (fastUserPhones === null || fastUserPhones === void 0 ? void 0 : fastUserPhones.length) {
                const profiles = yield ProfileRepository_1.ProfileRepository.find({
                    where: {
                        userId: {
                            $in: fastUserPhones,
                        },
                        deletedStamp: 0,
                    }
                });
                const users = yield UserRepository_1.UserRepository.find({
                    where: {
                        userId: {
                            $in: fastUserPhones
                        },
                        deletedStamp: 0,
                    },
                });
                for (let i = 0; i < (fastUserPhones === null || fastUserPhones === void 0 ? void 0 : fastUserPhones.length); i++) {
                    const phone = fastUserPhones[i];
                    let lead = getLeadDefaults(phone, "Fast");
                    // Profile Related Data 
                    let localProfiles = profiles === null || profiles === void 0 ? void 0 : profiles.filter(profile => (profile === null || profile === void 0 ? void 0 : profile.userId) === phone);
                    localProfiles.sort((a, b) => (b === null || b === void 0 ? void 0 : b.createdStamp) - (a === null || a === void 0 ? void 0 : a.createdStamp));
                    localProfiles.forEach(localProfile => {
                        if (!lead.businessType && (localProfile === null || localProfile === void 0 ? void 0 : localProfile.ezoIndustry)) {
                            lead.businessType = (localProfile === null || localProfile === void 0 ? void 0 : localProfile.ezoIndustry) || null;
                        }
                    });
                    // ------------------------------------------------------------------------
                    // Licence Related Data
                    let licence = licences.find(licence => (licence === null || licence === void 0 ? void 0 : licence.userId) === phone);
                    lead.proActivationStamp = (licence === null || licence === void 0 ? void 0 : licence.proActivationStamp) || null;
                    lead.proExpiryStamp = (licence === null || licence === void 0 ? void 0 : licence.proExpiryStamp) || null;
                    // ------------------------------------------------------------------------
                    // User Related Data 
                    const user = users === null || users === void 0 ? void 0 : users.find(user => (user === null || user === void 0 ? void 0 : user.phone) === phone);
                    lead.lastActiveStamp = (user === null || user === void 0 ? void 0 : user.lastActiveStamp) || null;
                    // ------------------------------------------------------------------------
                    leads.push(lead);
                }
                let fireUsers = yield fbMigrationService.getUsersByTimeRange(startTime, endTime);
                fireUsers === null || fireUsers === void 0 ? void 0 : fireUsers.forEach(fireUser => {
                    if (!(fastUserPhones === null || fastUserPhones === void 0 ? void 0 : fastUserPhones.includes(fireUser === null || fireUser === void 0 ? void 0 : fireUser.phone))) {
                        const lead = getLeadDefaults(fireUser === null || fireUser === void 0 ? void 0 : fireUser.phone, 'Fire');
                        lead.proExpiryStamp = (fireUser === null || fireUser === void 0 ? void 0 : fireUser.isPro) || null;
                        lead.proActivationStamp = (fireUser === null || fireUser === void 0 ? void 0 : fireUser.proAssignStamp) || null;
                        lead.saleCount = (fireUser === null || fireUser === void 0 ? void 0 : fireUser.mf_totalInvoiceCount) || null;
                        lead.businessType = 'NA';
                        lead.lastActiveStamp = (fireUser === null || fireUser === void 0 ? void 0 : fireUser.lastActive) || null;
                        leads.push(lead);
                    }
                });
                const leadsPhoneArr = Array.from(new Set(leads === null || leads === void 0 ? void 0 : leads.map(lead => lead === null || lead === void 0 ? void 0 : lead.phone)));
                // Ops Related Data 
                const opsData = yield getOpsData(leadsPhoneArr);
                if (opsData != null) {
                    leads === null || leads === void 0 ? void 0 : leads.map(lead => {
                        var _a, _b, _c, _d, _e;
                        if (opsData[lead === null || lead === void 0 ? void 0 : lead.phone]) {
                            lead.machineSold = ((_a = opsData[lead === null || lead === void 0 ? void 0 : lead.phone]) === null || _a === void 0 ? void 0 : _a.machineSold) || null;
                            lead.salePrice = ((_b = opsData[lead === null || lead === void 0 ? void 0 : lead.phone]) === null || _b === void 0 ? void 0 : _b.salePrice) || null;
                            lead.softwareValidity = ((_c = opsData[lead === null || lead === void 0 ? void 0 : lead.phone]) === null || _c === void 0 ? void 0 : _c.softwareValidity) || null;
                            lead.note = ((_d = opsData[lead === null || lead === void 0 ? void 0 : lead.phone]) === null || _d === void 0 ? void 0 : _d.note) || null;
                            lead.saleCount = lead.saleCount || ((_e = opsData[lead === null || lead === void 0 ? void 0 : lead.phone]) === null || _e === void 0 ? void 0 : _e.saleCount) || null;
                        }
                    });
                }
                // ------------------------------------------------------------------------
            }
            return res.status(200).send({
                status: "success",
                leads
            });
        }
        else {
            return res.status(400).send({
                status: "failed",
                message: "Bad Parameters"
            });
        }
    }
    catch (error) {
        return res.status(200).send({
            status: "failed",
            message: "Unexpected Error Occureed"
        });
    }
});
exports.getRenewalReportDataRouter = getRenewalReportDataRouter;
const getOpsData = (phones) => {
    return new Promise((resolve, reject) => {
        request({
            'method': 'POST',
            'url': `https://legaldocs.co.in/kappa/api/common/getRenewalReportData`,
            'headers': {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phones }),
        }, function (error, response) {
            if (error) {
                return resolve(null);
            }
            if (response.body) {
                try {
                    let resBody = JSON.parse(response.body);
                    if ((resBody === null || resBody === void 0 ? void 0 : resBody.status) === "success" && (resBody === null || resBody === void 0 ? void 0 : resBody.data)) {
                        return resolve(resBody.data);
                    }
                    else {
                        return resolve(null);
                    }
                }
                catch (error) {
                    return resolve(null);
                }
            }
            else {
                return resolve(null);
            }
        });
    });
};
const getAllCSVData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let data = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.dataList;
        const rows = [
            [
                "Sr. No.",
                "Phone",
                "App Type",
                "Business Type",
                "Invoice Count",
                "Last Active date ",
                "Pro Active Date",
                "Pro Expiry Date",
                "Product Sold",
                "Sale Price",
                "Software Validity",
                "Notes",
            ]
        ];
        if ((Array === null || Array === void 0 ? void 0 : Array.isArray(data)) && (data === null || data === void 0 ? void 0 : data.length)) {
            for (let i = 0; i < data.length; i++) {
                //fix stamp
                rows.push([
                    i + 1 || "",
                    data[i].phone || "",
                    data[i].appType || "",
                    data[i].businessType || "",
                    (data[i].saleCount !== undefined ? data[i].saleCount : "") || "",
                    stampToSimpleDate(data[i].lastActiveStamp.substr(0, 10)) || '-',
                    stampToSimpleDate(data[i].proActivationStamp.substr(0, 10)) || "-",
                    stampToSimpleDate(data[i].proExpiryStamp.substr(0, 10)) || '-',
                    data[i].machineSold || "",
                    (data[i].salePrice !== undefined ? data[i].salePrice : "") || "",
                    data[i].softwareValidity || "",
                    data[i].note || "",
                ]);
            }
        }
        let csvContent = "data:text/csv;charset=utf-8,";
        rows.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { csvContent: encodeURI(csvContent) }));
    }
    catch (error) {
        return {
            csvContent: "",
        };
    }
});
exports.getAllCSVData = getAllCSVData;
const stampToSimpleDate = (stamp) => {
    if (stamp == 0) {
        return "-";
    }
    let dt = new Date(+stamp);
    let dd = ("0" + (dt.getDate())).slice(-2);
    let mm = ("0" + (dt.getMonth() + 1)).slice(-2);
    let yy = dt.getFullYear();
    let nHH = dt.getHours();
    let ap = 'AM';
    if (nHH > 12) {
        ap = 'PM';
        nHH -= 12;
    }
    else if (nHH == 12) {
        ap = 'PM';
    }
    let hh = ("0" + (nHH)).slice(-2);
    let MM = ("0" + (dt.getMinutes())).slice(-2);
    let SS = ("0" + (dt.getSeconds())).slice(-2);
    return dd + '/' + mm + '/' + yy;
};
//# sourceMappingURL=renewalReport.js.map