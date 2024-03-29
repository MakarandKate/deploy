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
exports.CalcRecord = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let CalcRecord = class CalcRecord extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.compress = () => {
            this.a = this.recordText;
            delete this.recordText;
            this.b = this.recordObject;
            delete this.recordObject;
            return this;
        };
        this.expand = () => {
            this.recordText = this.a;
            delete this.a;
            this.recordObject = this.b;
            delete this.b;
            return this;
        };
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CalcRecord.prototype, "a", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CalcRecord.prototype, "recordText", void 0);
CalcRecord = __decorate([
    (0, typeorm_1.Entity)({
        name: 'calcrecord'
    })
], CalcRecord);
exports.CalcRecord = CalcRecord;
//# sourceMappingURL=CalcRecord.js.map