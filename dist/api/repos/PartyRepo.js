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
exports.PartyRepo = void 0;
const typedi_1 = require("typedi");
const PartyDao_1 = require("../daos/PartyDao");
let PartyRepo = class PartyRepo {
    constructor(dao) {
        this.dao = dao;
    }
    getAllByPromise(phone, profileId) {
        return this.dao.getAllByProfile(phone, profileId);
    }
    getByUUID(phone, profileId, uuid) {
        return this.dao.getByUUID(phone, profileId, uuid);
    }
};
PartyRepo = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PartyDao_1.PartyDao])
], PartyRepo);
exports.PartyRepo = PartyRepo;
//# sourceMappingURL=PartyRepo.js.map