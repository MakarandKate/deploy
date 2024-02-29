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
exports.Order = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Party_1 = require("./Party");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Placed"] = "Placed";
    OrderStatus["Accepted"] = "Accepted";
    OrderStatus["InPreparation"] = "InPreparation";
    OrderStatus["InTransit"] = "InTransit";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Cancelled"] = "Cancelled";
    OrderStatus["Rejected"] = "Rejected";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = class Order extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Order.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Order.prototype, "linkedSaleUUID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Order.prototype, "orderNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], Order.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: OrderStatus,
        default: null,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({
        name: 'order_v0'
    })
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map