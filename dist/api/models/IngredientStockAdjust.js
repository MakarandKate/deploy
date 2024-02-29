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
exports.IngredientStockAdjust = exports.ActionType = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
var ActionType;
(function (ActionType) {
    ActionType["Sale"] = "Sale";
    ActionType["Purchase"] = "Purchase";
    ActionType["Scrap"] = "Scrap";
    ActionType["Transfer"] = "Transfer";
    ActionType["Return"] = "Return";
    ActionType["EOD"] = "EOD"; // ignore
})(ActionType = exports.ActionType || (exports.ActionType = {}));
let IngredientStockAdjust = class IngredientStockAdjust extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "linkedIngredientUUID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500,
        default: null
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "linkedSaleUUID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], IngredientStockAdjust.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ActionType,
        default: null,
    }),
    __metadata("design:type", String)
], IngredientStockAdjust.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], IngredientStockAdjust.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], IngredientStockAdjust.prototype, "isSaleUpdate", void 0);
IngredientStockAdjust = __decorate([
    (0, typeorm_1.Entity)({
        name: 'ingredientstockadjust'
    })
], IngredientStockAdjust);
exports.IngredientStockAdjust = IngredientStockAdjust;
//# sourceMappingURL=IngredientStockAdjust.js.map