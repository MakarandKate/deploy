"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkWaPartyService = void 0;
const typedi_1 = require("typedi");
const ezo_connect_wa_1 = require("@makarandkate/ezo-connect-wa");
const whatsapp_1 = require("@makarandkate/ezo-connect-wa/lib/whatsapp");
const BulkWhatsapp_1 = require("../../lib/BulkWhatsapp");
const PartyRepository_1 = require("../repositories/PartyRepository");
const ProfileRepository_1 = require("../repositories/ProfileRepository");
let BulkWaPartyService = class BulkWaPartyService {
    constructor() { }
    getTemplates() {
        try {
            return BulkWhatsapp_1.BulkWhatsapp.templates || [];
        }
        catch (error) {
            return null;
        }
    }
    send(userId, profileId, partyUUIDArr, templateId, custom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let parties = yield PartyRepository_1.PartyRepository.find({
                    where: {
                        userId: userId,
                        profileId: profileId,
                        deletedStamp: 0,
                        _localUUID: {
                            $in: partyUUIDArr
                        }
                    }
                });
                let profile = yield ProfileRepository_1.ProfileRepository.findOne({
                    where: {
                        userId: userId,
                        _localUUID: profileId,
                        deletedStamp: 0,
                    }
                });
                if (parties === null || parties === void 0 ? void 0 : parties.length) {
                    parties === null || parties === void 0 ? void 0 : parties.forEach(party => {
                        let bodyValues = [];
                        let variables = BulkWhatsapp_1.BulkWhatsapp.getTemplateVarsById(templateId);
                        let tempKeyValue = {};
                        variables.forEach(variable => {
                            var _a;
                            const splitArr = (_a = variable === null || variable === void 0 ? void 0 : variable.value) === null || _a === void 0 ? void 0 : _a.split('.');
                            if (splitArr[0] == 'party') {
                                let targetValue = party;
                                splitArr === null || splitArr === void 0 ? void 0 : splitArr.forEach((value, index) => {
                                    if (index != 0) {
                                        targetValue = targetValue[value];
                                    }
                                });
                                bodyValues === null || bodyValues === void 0 ? void 0 : bodyValues.push(targetValue);
                                tempKeyValue[variable.key] = targetValue;
                            }
                            if (splitArr[0] == 'profile') {
                                let targetValue = profile;
                                splitArr === null || splitArr === void 0 ? void 0 : splitArr.forEach((value, index) => {
                                    if (index != 0) {
                                        targetValue = targetValue[value];
                                    }
                                });
                                bodyValues === null || bodyValues === void 0 ? void 0 : bodyValues.push(targetValue);
                                tempKeyValue[variable.key] = targetValue;
                            }
                            if (splitArr[0] == 'custom') {
                                let targetValue = custom;
                                splitArr === null || splitArr === void 0 ? void 0 : splitArr.forEach((value, index) => {
                                    if (index != 0) {
                                        targetValue = targetValue[value];
                                    }
                                });
                                bodyValues === null || bodyValues === void 0 ? void 0 : bodyValues.push(targetValue);
                                tempKeyValue[variable.key] = targetValue;
                            }
                        });
                        try {
                            // WhatsApp.sendTransactionalMessage({
                            //     accountType: WhatsappAccountType.sales,
                            //     phone: party?.phone,
                            //     templateId,
                            //     headerValues: [],
                            //     bodyValues,
                            //     buttonValues: {}
                            // });
                            let messageBody = BulkWhatsapp_1.BulkWhatsapp.getTemplateMessageBodyById(templateId);
                            for (let key in tempKeyValue) {
                                messageBody = messageBody === null || messageBody === void 0 ? void 0 : messageBody.replace(key, tempKeyValue[key]);
                            }
                            // For Demo on 12 December only
                            ezo_connect_wa_1.WhatsApp.sendTransactionalMessageRotatory({
                                phone: party === null || party === void 0 ? void 0 : party.phone,
                                vendor: whatsapp_1.WhatsappVendor.sobot,
                                accountType: whatsapp_1.WhatsappAccountType.sales,
                                templateIds: ['open'],
                                headerValues: [],
                                // pass complete body
                                bodyValues: [messageBody],
                                buttonValues: {},
                            });
                            // ------------------------------------
                        }
                        catch (error) {
                        }
                        return true;
                    });
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
};
BulkWaPartyService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], BulkWaPartyService);
exports.BulkWaPartyService = BulkWaPartyService;
//# sourceMappingURL=BulkWaPartyService.js.map