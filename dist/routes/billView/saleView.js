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
exports.saleViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const SaleRepository_1 = require("../../api/repositories/SaleRepository");
const Sale_1 = require("../../api/models/Sale");
const lib_1 = require("@makarandkate/invoice-templates/lib");
const ProfileRepository_1 = require("../../api/repositories/ProfileRepository");
const ImageRepository_1 = require("../../api/repositories/ImageRepository");
const PartyRepository_1 = require("../../api/repositories/PartyRepository");
const Party_1 = require("../../api/models/Party");
const MoneyInRepository_1 = require("../../api/repositories/MoneyInRepository");
const ImageService_1 = require("../../api/services/ImageService");
const imageService = typedi_1.default.get(ImageService_1.ImageService);
const np = new Party_1.Party();
const saleViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        let saleId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.saleId;
        if (userId && saleId) {
            let sale = yield SaleRepository_1.SaleRepository.findOne({
                where: {
                    userId,
                    _localUUID: saleId,
                    deletedStamp: 0
                }
            });
            // Temporary Fixing
            sale = (_c = (new Sale_1.Sale())) === null || _c === void 0 ? void 0 : _c.expand(sale);
            // -------------------------------------------
            if (sale && (sale === null || sale === void 0 ? void 0 : sale._localUUID)) {
                let billPrint = yield generateBillViewObject(userId, sale);
                let html = yield lib_1.HtmlTemplates.getBillTemplateHtml(billPrint, 'temp6');
                (0, Page_1.setPage)(req, res, {
                    title: 'Sale',
                    description: '',
                    view: 'billView/sale',
                    data: {
                        userId,
                        html,
                        billNo: sale.billNo
                    }
                });
            }
            else {
                return res.status(400).send("Sale you are tring to view doesnot exist. Contact vendor.");
            }
        }
        else {
            return res.status(400).send("Sale you are tring to view doesnot exist. Contact vendor.");
        }
    }
    catch (err) {
        console.error(err);
        return res.status(400).send("Sale you are tring to view doesnot exist. Contact vendor.");
    }
});
exports.saleViewRouter = saleViewRouter;
let generateBillViewObject = (userId, sale) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h, _j;
    const profile = yield ProfileRepository_1.ProfileRepository.findOne({
        where: {
            _localUUID: sale.profileId
        }
    });
    let logo = null;
    let signature = null;
    if (profile === null || profile === void 0 ? void 0 : profile.logoLink) {
        logo = yield ImageRepository_1.ImageRepository.findOne({
            where: {
                _localUUID: profile === null || profile === void 0 ? void 0 : profile.logoLink
            }
        });
        if (logo) {
            let imageBase64 = yield imageService.getImage(userId, profile === null || profile === void 0 ? void 0 : profile._localUUID, profile === null || profile === void 0 ? void 0 : profile.logoLink);
            logo.imageBase64 = 'data:image/png;base64,' + imageBase64;
        }
    }
    if (profile === null || profile === void 0 ? void 0 : profile.signatureLink) {
        signature = yield ImageRepository_1.ImageRepository.findOne({
            where: {
                _localUUID: profile === null || profile === void 0 ? void 0 : profile.signatureLink
            }
        });
        if (signature) {
            let imageBase64 = yield imageService.getImage(userId, profile === null || profile === void 0 ? void 0 : profile._localUUID, profile === null || profile === void 0 ? void 0 : profile.signatureLink);
            signature.imageBase64 = 'data:image/png;base64,' + imageBase64;
        }
    }
    let party = yield PartyRepository_1.PartyRepository.findOne({
        where: {
            _localUUID: (_d = sale.party) === null || _d === void 0 ? void 0 : _d._localUUID
        }
    });
    party = np.expand(party);
    if (!party) {
        party = sale === null || sale === void 0 ? void 0 : sale.party;
    }
    let secondaryParty = null;
    if ((_e = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _e === void 0 ? void 0 : _e._localUUID) {
        secondaryParty = yield PartyRepository_1.PartyRepository.findOne({
            where: {
                _localUUID: (_f = sale.partySecondary) === null || _f === void 0 ? void 0 : _f._localUUID
            }
        });
        secondaryParty = np.expand(secondaryParty);
    }
    let moneyIn = null;
    if (((_g = sale === null || sale === void 0 ? void 0 : sale.moneyIns) === null || _g === void 0 ? void 0 : _g.length) && ((_h = sale === null || sale === void 0 ? void 0 : sale.moneyIns[0]) === null || _h === void 0 ? void 0 : _h._localUUID)) {
        moneyIn = yield MoneyInRepository_1.MoneyInRepository.findOne({
            where: {
                _localUUID: (_j = sale === null || sale === void 0 ? void 0 : sale.moneyIns[0]) === null || _j === void 0 ? void 0 : _j._localUUID
            }
        });
    }
    return lib_1.HtmlTemplates.generateSaleBillObject({
        user: {
            isPro: 0,
            registrationStamp: 0
        },
        profile,
        signature,
        logo,
        party,
        secondaryParty,
        sale,
        moneyIn
    });
});
let newLineToBr = (inputString) => {
    return ((inputString === null || inputString === void 0 ? void 0 : inputString.length) > 0) ? inputString.replace(/\n/g, '<br/>') : "";
};
//# sourceMappingURL=saleView.js.map