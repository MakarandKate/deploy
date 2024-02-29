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
exports.BaseModel = void 0;
const typeorm_1 = require("typeorm");
class BaseModel {
    constructor() { }
}
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], BaseModel.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-_localUUID"),
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], BaseModel.prototype, "_localUUID", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-dbStamp"),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseModel.prototype, "_is", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-createdStamp"),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseModel.prototype, "createdStamp", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-updatedStamp"),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseModel.prototype, "updatedStamp", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-deletedStamp"),
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseModel.prototype, "deletedStamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], BaseModel.prototype, "syncStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], BaseModel.prototype, "userMetaData", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], BaseModel.prototype, "systemMetaData", void 0);
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map