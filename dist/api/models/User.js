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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let User = class User extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 10,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 10,
        default: null,
    }),
    __metadata("design:type", String)
], User.prototype, "fixedOtp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "otpSentStamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "verifiedStamp", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Number)
], User.prototype, "lastTokenTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null
    }),
    __metadata("design:type", Number)
], User.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null
    }),
    __metadata("design:type", Number)
], User.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "lastActiveStamp", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({
        name: 'user'
    })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map