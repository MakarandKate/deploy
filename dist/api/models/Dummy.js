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
exports.Dummy = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let Dummy = class Dummy extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'invoice_local_id',
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], Dummy.prototype, "invoiceLocalId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        name: 'amount',
        type: 'double',
        precision: 10,
        scale: 2,
        default: 0.00
    }),
    __metadata("design:type", Number)
], Dummy.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        name: 'age',
        default: null
    }),
    __metadata("design:type", Number)
], Dummy.prototype, "age", void 0);
Dummy = __decorate([
    (0, typeorm_1.Entity)({
        name: 'dummy'
    })
], Dummy);
exports.Dummy = Dummy;
//# sourceMappingURL=Dummy.js.map