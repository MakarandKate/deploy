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
exports.SaleRating = void 0;
const typeorm_1 = require("typeorm");
let SaleRating = class SaleRating {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], SaleRating.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-dbStamp"),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], SaleRating.prototype, "_is", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-createdStamp"),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], SaleRating.prototype, "createdStamp", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], SaleRating.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], SaleRating.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-partyId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], SaleRating.prototype, "partyId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], SaleRating.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SaleRating.prototype, "rating", void 0);
SaleRating = __decorate([
    (0, typeorm_1.Entity)({
        name: 'salerating'
    })
], SaleRating);
exports.SaleRating = SaleRating;
//# sourceMappingURL=SaleRating.js.map