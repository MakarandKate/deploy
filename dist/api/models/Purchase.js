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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const MoneyOut_1 = require("./MoneyOut");
const Party_1 = require("./Party");
const TransportDetail_1 = require("./TransportDetail");
let Purchase = class Purchase extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Purchase.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Purchase.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Purchase.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Purchase.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Purchase.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Purchase.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Purchase.prototype, "billNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Purchase.prototype, "billDateStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], Purchase.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Purchase.prototype, "billItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Purchase.prototype, "moneyOuts", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", MoneyOut_1.MoneyOut)
], Purchase.prototype, "moneyOut", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Purchase.prototype, "subTotalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Purchase.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Purchase.prototype, "totalSaving", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Purchase.prototype, "dueDateStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Purchase.prototype, "billingTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 2000
    }),
    __metadata("design:type", String)
], Purchase.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", TransportDetail_1.TransportDetail)
], Purchase.prototype, "transportDetail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "gstAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "cessAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "cashDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "cashDiscountPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "amountPaid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Purchase.prototype, "additionalDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Purchase.prototype, "senderProvience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Purchase.prototype, "deliveryProvience", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Purchase.prototype, "roundOffValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Purchase.prototype, "oldFirebaseId", void 0);
Purchase = __decorate([
    (0, typeorm_1.Entity)({
        name: 'purchase'
    })
], Purchase);
exports.Purchase = Purchase;
//# sourceMappingURL=Purchase.js.map