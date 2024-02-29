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
exports.CutOffDay = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let CutOffDay = class CutOffDay extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], CutOffDay.prototype, "startStamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], CutOffDay.prototype, "endStamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 2000
    }),
    __metadata("design:type", String)
], CutOffDay.prototype, "note", void 0);
CutOffDay = __decorate([
    (0, typeorm_1.Entity)({
        name: 'cutOffDay'
    })
], CutOffDay);
exports.CutOffDay = CutOffDay;
//# sourceMappingURL=CutOffDay.js.map