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
exports.Kot = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let Kot = class Kot extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Kot.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Kot.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Kot.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Kot.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Kot.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Kot.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Kot.prototype, "linkedSaleUUID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Kot.prototype, "kotNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Kot.prototype, "billStateItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Kot.prototype, "printStateItems", void 0);
Kot = __decorate([
    (0, typeorm_1.Entity)({
        name: 'kot'
    })
], Kot);
exports.Kot = Kot;
//# sourceMappingURL=Kot.js.map