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
exports.sevenDayReMarketingRouter = void 0;
const Page_1 = require("../../lib/Page");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const SaleRepository_1 = require("../../api/repositories/SaleRepository");
const ProfileRepository_1 = require("../../api/repositories/ProfileRepository");
const sevenDayReMarketingRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let todayStartStamp = Utils_1.default.todayStartStamp();
    let sevenDayStartStamp = todayStartStamp - ((7 * 24 * 60 * 60 * 1000) + 1);
    let sevenDayEndStamp = sevenDayStartStamp + (1 * 24 * 60 * 60 * 1000);
    let msgs = [];
    let sales = yield SaleRepository_1.SaleRepository.find({
        where: {
            deletedStamp: 0,
            billDateStamp: {
                $gte: sevenDayStartStamp,
                $lt: sevenDayEndStamp
            }
        },
        sort: {
            totalAmount: -1
        }
    });
    let salePartyMap = {};
    sales.forEach((el) => {
        var _a, _b;
        let partyPhone = ((_a = el === null || el === void 0 ? void 0 : el.party) === null || _a === void 0 ? void 0 : _a.phone) || '';
        let partySecondaryPhone = ((_b = el === null || el === void 0 ? void 0 : el.partySecondary) === null || _b === void 0 ? void 0 : _b.phone) || '';
        let saleTotalAmount = Number(el === null || el === void 0 ? void 0 : el.totalAmount) || 0;
        if (partyPhone) {
            if (salePartyMap[partyPhone]) {
                if (saleTotalAmount > salePartyMap[partyPhone].totalAmount) {
                    salePartyMap[partyPhone] = {
                        sale: el,
                        totalAmount: Number(el === null || el === void 0 ? void 0 : el.totalAmount) || 0
                    };
                }
            }
            else {
                salePartyMap[partyPhone] = {
                    sale: el,
                    totalAmount: Number(el === null || el === void 0 ? void 0 : el.totalAmount) || 0
                };
            }
        }
        if (partySecondaryPhone) {
            if (salePartyMap[partySecondaryPhone]) {
                if (saleTotalAmount > salePartyMap[partySecondaryPhone].totalAmount) {
                    salePartyMap[partySecondaryPhone] = {
                        sale: el,
                        totalAmount: Number(el === null || el === void 0 ? void 0 : el.totalAmount) || 0
                    };
                }
            }
            else {
                salePartyMap[partySecondaryPhone] = {
                    sale: el,
                    totalAmount: Number(el === null || el === void 0 ? void 0 : el.totalAmount) || 0
                };
            }
        }
    });
    let sortedSales = [];
    for (let k in salePartyMap) {
        sortedSales.push(salePartyMap[k].sale);
    }
    let profilesMap = {};
    for (let i = 0; i < sortedSales.length; i++) {
        let sale = sortedSales[i];
        let highestPriceItemName = '';
        let profileId = sale === null || sale === void 0 ? void 0 : sale.profileId;
        if (profilesMap[profileId]) {
            sale.profile = profilesMap[profileId];
        }
        else {
            let profile = yield ProfileRepository_1.ProfileRepository.findOne({
                where: {
                    _localUUID: sale === null || sale === void 0 ? void 0 : sale.profileId
                }
            });
            profilesMap[profileId] = profile;
            sale.profile = profile;
        }
        let itemprice = 0;
        if ((sale === null || sale === void 0 ? void 0 : sale.billItems) && ((_a = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _a === void 0 ? void 0 : _a.length)) {
            for (let j = 0; j < ((_b = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _b === void 0 ? void 0 : _b.length); j++) {
                if (((_c = sale === null || sale === void 0 ? void 0 : sale.billItems[j]) === null || _c === void 0 ? void 0 : _c.price) > itemprice) {
                    highestPriceItemName = (_e = (_d = sale === null || sale === void 0 ? void 0 : sale.billItems[j]) === null || _d === void 0 ? void 0 : _d.item) === null || _e === void 0 ? void 0 : _e.itemName;
                }
            }
        }
        let msgPartyName = ((_f = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _f === void 0 ? void 0 : _f.name) || ((_g = sale === null || sale === void 0 ? void 0 : sale.party) === null || _g === void 0 ? void 0 : _g.name) || '';
        let msgBusinessName = ((_h = sale === null || sale === void 0 ? void 0 : sale.profile) === null || _h === void 0 ? void 0 : _h.legalName) || '';
        if (msgPartyName && msgBusinessName && msgPartyName != 'Cash Sale' && msgBusinessName != 'Bill Book') {
            msgs.push(`Hi ${msgPartyName}, ${msgBusinessName} is welcoming you for ${highestPriceItemName}`);
        }
    }
    res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { msgs }));
});
exports.sevenDayReMarketingRouter = sevenDayReMarketingRouter;
//# sourceMappingURL=sevenDayReMarketing.js.map