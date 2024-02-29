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
exports.estimateViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const lib_1 = require("@makarandkate/invoice-templates/lib");
const ProfileRepository_1 = require("../../api/repositories/ProfileRepository");
const ImageRepository_1 = require("../../api/repositories/ImageRepository");
const PartyRepository_1 = require("../../api/repositories/PartyRepository");
const ImageService_1 = require("../../api/services/ImageService");
const EstimateRepository_1 = require("../../api/repositories/EstimateRepository");
const imageService = typedi_1.default.get(ImageService_1.ImageService);
const estimateViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        let estimateId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.estimateId;
        if (userId && estimateId) {
            let estimate = yield EstimateRepository_1.EstimateRepository.findOne({
                where: {
                    userId,
                    _localUUID: estimateId,
                    deletedStamp: 0
                }
            });
            if (estimate && estimate._localUUID) {
                let billPrint = yield generateBillViewObject(userId, estimate);
                let html = yield lib_1.HtmlTemplates.getBillTemplateHtml(billPrint, 'temp1Estimate');
                (0, Page_1.setPage)(req, res, {
                    title: 'Estimate',
                    description: '',
                    view: 'billView/estimate',
                    data: {
                        userId,
                        html,
                        billNo: estimate.billNo
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
exports.estimateViewRouter = estimateViewRouter;
let generateBillViewObject = (userId, estimate) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const profile = yield ProfileRepository_1.ProfileRepository.findOne({
        where: {
            _localUUID: estimate.profileId
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
        let imageBase64 = yield imageService.getImage(userId, profile === null || profile === void 0 ? void 0 : profile._localUUID, profile === null || profile === void 0 ? void 0 : profile.logoLink);
        logo.imageBase64 = 'data:image/png;base64,' + imageBase64;
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
            _localUUID: (_c = estimate.party) === null || _c === void 0 ? void 0 : _c._localUUID
        }
    });
    if (!party) {
        party = estimate === null || estimate === void 0 ? void 0 : estimate.party;
    }
    let secondaryParty = null;
    if ((_d = estimate === null || estimate === void 0 ? void 0 : estimate.partySecondary) === null || _d === void 0 ? void 0 : _d._localUUID) {
        secondaryParty = yield PartyRepository_1.PartyRepository.findOne({
            where: {
                _localUUID: (_e = estimate.partySecondary) === null || _e === void 0 ? void 0 : _e._localUUID
            }
        });
    }
    return lib_1.HtmlTemplates.generateEstimateBillObject({
        user: {
            isPro: 0,
            registrationStamp: 0
        },
        profile,
        signature,
        logo,
        party,
        secondaryParty,
        estimate,
    });
});
let newLineToBr = (inputString) => {
    return ((inputString === null || inputString === void 0 ? void 0 : inputString.length) > 0) ? inputString.replace(/\n/g, '<br/>') : "";
};
//# sourceMappingURL=estimateViews.js.map