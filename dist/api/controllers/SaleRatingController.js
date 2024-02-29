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
exports.SaleRatingController = void 0;
const routing_controllers_1 = require("routing-controllers");
const SaleRatingService_1 = require("../services/SaleRatingService");
const Page_1 = require("../../lib/Page");
let SaleRatingController = class SaleRatingController {
    constructor(saleRatingService) {
        this.saleRatingService = saleRatingService;
    }
    record(req, phone, saleRating) {
        return __awaiter(this, void 0, void 0, function* () {
            //this.saleRatingService.saveRating(phone,saleRating);
            return Object.assign({}, Page_1.StatusSuccess);
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/record'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __param(2, (0, routing_controllers_1.BodyParam)('saleRating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SaleRatingController.prototype, "record", null);
SaleRatingController = __decorate([
    (0, routing_controllers_1.Controller)('/saleRating'),
    __metadata("design:paramtypes", [SaleRatingService_1.SaleRatingService])
], SaleRatingController);
exports.SaleRatingController = SaleRatingController;
//# sourceMappingURL=SaleRatingController.js.map