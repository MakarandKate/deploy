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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.BulkWaPartyController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const BulkWaPartyService_1 = require("../services/BulkWaPartyService");
const Page_1 = require("../../lib/Page");
let BulkWaPartyController = class BulkWaPartyController {
    constructor(bulkWaPartyService) {
        this.bulkWaPartyService = bulkWaPartyService;
    }
    getTemplates(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let msgs = this.bulkWaPartyService.getTemplates();
            if (msgs != null && Array.isArray(msgs)) {
                return Object.assign(Object.assign({}, Page_1.StatusSuccess), { msgs });
            }
            return Page_1.StatusFailed;
        });
    }
    send(req, userId, profileId, partyUUIDArr, templateId, custom) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId
                && profileId
                && (partyUUIDArr === null || partyUUIDArr === void 0 ? void 0 : partyUUIDArr.length)
                && templateId) {
                let success = this.bulkWaPartyService.send(userId, profileId, partyUUIDArr, templateId, custom);
                if (success) {
                    return Object.assign(Object.assign({}, Page_1.StatusSuccess), { message: 'All Messages are Sent' });
                }
                return Object.assign(Object.assign({}, Page_1.StatusFailed), { message: 'Something Went Wrong' });
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/getTemplates'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BulkWaPartyController.prototype, "getTemplates", null);
__decorate([
    (0, routing_controllers_1.Post)('/send'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __param(2, (0, routing_controllers_1.BodyParam)('profileId')),
    __param(3, (0, routing_controllers_1.BodyParam)('partyUUIDArr')),
    __param(4, (0, routing_controllers_1.BodyParam)('templateId')),
    __param(5, (0, routing_controllers_1.BodyParam)('custom')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Array, String, Object]),
    __metadata("design:returntype", Promise)
], BulkWaPartyController.prototype, "send", null);
BulkWaPartyController = __decorate([
    (0, routing_controllers_1.Controller)('/bulkWaParty')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [BulkWaPartyService_1.BulkWaPartyService])
], BulkWaPartyController);
exports.BulkWaPartyController = BulkWaPartyController;
//# sourceMappingURL=BulkWaPartyController.js.map