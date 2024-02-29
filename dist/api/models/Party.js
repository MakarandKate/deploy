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
exports.Party = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let Party = class Party extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.compress = (party) => {
            if (party) {
                party.a = party === null || party === void 0 ? void 0 : party.createdBy;
                party === null || party === void 0 ? true : delete party.createdBy;
                party.b = party === null || party === void 0 ? void 0 : party.lastModifiedBy;
                party === null || party === void 0 ? true : delete party.lastModifiedBy;
                party.c = party === null || party === void 0 ? void 0 : party.createdByName;
                party === null || party === void 0 ? true : delete party.createdByName;
                party.d = party === null || party === void 0 ? void 0 : party.lastModifiedByName;
                party === null || party === void 0 ? true : delete party.lastModifiedByName;
                party.e = party === null || party === void 0 ? void 0 : party.category;
                party === null || party === void 0 ? true : delete party.category;
                party.f = party === null || party === void 0 ? void 0 : party.credit;
                party === null || party === void 0 ? true : delete party.credit;
                party.g = party === null || party === void 0 ? void 0 : party.name;
                party === null || party === void 0 ? true : delete party.name;
                party.h = party === null || party === void 0 ? void 0 : party.phone;
                party === null || party === void 0 ? true : delete party.phone;
                party.i = party === null || party === void 0 ? void 0 : party.type;
                party === null || party === void 0 ? true : delete party.type;
                party.j = party === null || party === void 0 ? void 0 : party.gstin;
                party === null || party === void 0 ? true : delete party.gstin;
                party.k = party === null || party === void 0 ? void 0 : party.billingType;
                party === null || party === void 0 ? true : delete party.billingType;
                party.l = party === null || party === void 0 ? void 0 : party.dateOfBirth;
                party === null || party === void 0 ? true : delete party.dateOfBirth;
                party.m = party === null || party === void 0 ? void 0 : party.businessName;
                party === null || party === void 0 ? true : delete party.businessName;
                party.n = party === null || party === void 0 ? void 0 : party.email;
                party === null || party === void 0 ? true : delete party.email;
                party.o = party === null || party === void 0 ? void 0 : party.billingAddress;
                party === null || party === void 0 ? true : delete party.billingAddress;
                party.p = party === null || party === void 0 ? void 0 : party.billingProvience;
                party === null || party === void 0 ? true : delete party.billingProvience;
                party.q = party === null || party === void 0 ? void 0 : party.billingPostalCode;
                party === null || party === void 0 ? true : delete party.billingPostalCode;
                party.r = party === null || party === void 0 ? void 0 : party.deliveryAddress;
                party === null || party === void 0 ? true : delete party.deliveryAddress;
                party.s = party === null || party === void 0 ? void 0 : party.deliveryProvience;
                party === null || party === void 0 ? true : delete party.deliveryProvience;
                party.t = party === null || party === void 0 ? void 0 : party.deliveryPostalCode;
                party === null || party === void 0 ? true : delete party.deliveryPostalCode;
                party.u = party === null || party === void 0 ? void 0 : party.paymentTerm;
                party === null || party === void 0 ? true : delete party.paymentTerm;
                party.v = party === null || party === void 0 ? void 0 : party.sendAlerts;
                party === null || party === void 0 ? true : delete party.sendAlerts;
                party.z = party === null || party === void 0 ? void 0 : party.isCashSaleParty;
                party === null || party === void 0 ? true : delete party.isCashSaleParty;
                party.aa = party === null || party === void 0 ? void 0 : party.isFavourite;
                party === null || party === void 0 ? true : delete party.isFavourite;
                party.ac = party === null || party === void 0 ? void 0 : party.oldFirebaseId;
                party === null || party === void 0 ? true : delete party.oldFirebaseId;
                party.ad = party === null || party === void 0 ? void 0 : party.satisfactionIndex;
                party === null || party === void 0 ? true : delete party.satisfactionIndex;
                party === null || party === void 0 ? true : delete party.isPrintedKOT;
                party === null || party === void 0 ? true : delete party.runningSaleBill;
                party === null || party === void 0 ? true : delete party.runningSaleBillAmount;
                party === null || party === void 0 ? true : delete party.elpTotalEarnedPoints;
                party === null || party === void 0 ? true : delete party.elpTotalEarnedAmount;
                party === null || party === void 0 ? true : delete party.lastSaleStamp;
                party === null || party === void 0 ? true : delete party.userMetaData;
                party === null || party === void 0 ? true : delete party.systemMetaData;
            }
            this.removeNullAndDefaults(party);
            return party;
        };
        this.expand = (party) => {
            if (party) {
                if ((party === null || party === void 0 ? void 0 : party.a) || party.a == '') {
                    party.createdBy = party.a;
                    party === null || party === void 0 ? true : delete party.a;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.b) || party.b == '') {
                    party.lastModifiedBy = party.b;
                    party === null || party === void 0 ? true : delete party.b;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.c) || party.c == '') {
                    party.createdByName = party.c;
                    party === null || party === void 0 ? true : delete party.c;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.d) || party.d == '') {
                    party.lastModifiedByName = party.d;
                    party === null || party === void 0 ? true : delete party.d;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.e) || party.e == '') {
                    party.category = party.e;
                    party === null || party === void 0 ? true : delete party.e;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.f) || party.f == 0) {
                    party.credit = party.f;
                    party === null || party === void 0 ? true : delete party.f;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.g) || party.g == '') {
                    party.name = party.g;
                    party === null || party === void 0 ? true : delete party.g;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.h) || party.h == '') {
                    party.phone = party.h;
                    party === null || party === void 0 ? true : delete party.h;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.i) || party.i == '') {
                    party.type = party.i;
                    party === null || party === void 0 ? true : delete party.i;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.j) || party.j == '') {
                    party.gstin = party.j;
                    party === null || party === void 0 ? true : delete party.j;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.k) || party.k == '') {
                    party.billingType = party.k;
                    party === null || party === void 0 ? true : delete party.k;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.l) || party.l == 0) {
                    party.dateOfBirth = party.l;
                    party === null || party === void 0 ? true : delete party.l;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.m) || party.m == '') {
                    party.businessName = party.m;
                    party === null || party === void 0 ? true : delete party.m;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.n) || party.n == '') {
                    party.email = party.n;
                    party === null || party === void 0 ? true : delete party.n;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.o) || party.o == '') {
                    party.billingAddress = party.o;
                    party === null || party === void 0 ? true : delete party.o;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.p) || party.p == '') {
                    party.billingProvience = party.p;
                    party === null || party === void 0 ? true : delete party.p;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.q) || party.q == '') {
                    party.billingPostalCode = party.q;
                    party === null || party === void 0 ? true : delete party.q;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.r) || party.r == '') {
                    party.deliveryAddress = party.r;
                    party === null || party === void 0 ? true : delete party.r;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.s) || party.s == '') {
                    party.deliveryProvience = party.s;
                    party === null || party === void 0 ? true : delete party.s;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.t) || party.t == '') {
                    party.deliveryPostalCode = party.t;
                    party === null || party === void 0 ? true : delete party.t;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.u) || party.u == '') {
                    party.paymentTerm = party.u;
                    party === null || party === void 0 ? true : delete party.u;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.v) || party.v == false) {
                    party.sendAlerts = party.v;
                    party === null || party === void 0 ? true : delete party.v;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.z) || party.z == false) {
                    party.isCashSaleParty = party.z;
                    party === null || party === void 0 ? true : delete party.z;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.aa) || party.aa == false) {
                    party.isFavourite = party.aa;
                    party === null || party === void 0 ? true : delete party.aa;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.ac) || party.ac == '') {
                    party.oldFirebaseId = party.ac;
                    party === null || party === void 0 ? true : delete party.ac;
                }
                ;
                if ((party === null || party === void 0 ? void 0 : party.ad) || party.ad == 0) {
                    party.satisfactionIndex = party.ad;
                    party === null || party === void 0 ? true : delete party.ad;
                }
                ;
            }
            this.addDefaults(party);
            return party;
        };
        this.removeNullAndDefaults = (party) => {
            let np = party;
            if (np) {
                if ((np === null || np === void 0 ? void 0 : np.a) == (np === null || np === void 0 ? void 0 : np.userId)) {
                    np.a = "!!";
                } //createdBy
                if ((np === null || np === void 0 ? void 0 : np.b) == (np === null || np === void 0 ? void 0 : np.userId)) {
                    np.b = "!!";
                } //lastModifiedBy
                if ((np === null || np === void 0 ? void 0 : np.c) == "Admin") {
                    np.c = "!!";
                } //createdByName
                if ((np === null || np === void 0 ? void 0 : np.d) == "Admin") {
                    np.d = "!!";
                } //lastModifiedByName
                (np === null || np === void 0 ? void 0 : np.i) == 'customer' && (np === null || np === void 0 ? true : delete np.i);
                !(np === null || np === void 0 ? void 0 : np.z) && (np === null || np === void 0 ? true : delete np.z);
                for (let k in np) {
                    if (np[k] === null || np[k] === undefined || np[k] === '') {
                        delete np[k];
                    }
                }
            }
            return np;
        };
        this.addDefaults = (party) => {
            if (party) {
                if ((party === null || party === void 0 ? void 0 : party.createdBy) == "!!") {
                    party.createdBy = party.userId;
                }
                if ((party === null || party === void 0 ? void 0 : party.lastModifiedBy) == "!!") {
                    party.lastModifiedBy = party.userId;
                }
                if ((party === null || party === void 0 ? void 0 : party.createdByName) == "!!") {
                    party.createdByName = "Admin";
                }
                if ((party === null || party === void 0 ? void 0 : party.lastModifiedByName) == "!!") {
                    party.lastModifiedByName = "Admin";
                }
                if (!(party === null || party === void 0 ? void 0 : party.category)) {
                    party.category = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.credit)) {
                    party.credit = 0;
                }
                if (!(party === null || party === void 0 ? void 0 : party.name)) {
                    party.name = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.phone)) {
                    party.phone = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.type)) {
                    party.type = 'customer';
                }
                if (!(party === null || party === void 0 ? void 0 : party.gstin)) {
                    party.gstin = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.billingType)) {
                    party.billingType = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.dateOfBirth)) {
                    party.dateOfBirth = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.businessName)) {
                    party.businessName = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.email)) {
                    party.email = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.billingAddress)) {
                    party.billingAddress = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.billingProvience)) {
                    party.billingProvience = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.billingPostalCode)) {
                    party.billingPostalCode = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.deliveryAddress)) {
                    party.deliveryAddress = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.deliveryProvience)) {
                    party.deliveryProvience = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.deliveryPostalCode)) {
                    party.deliveryPostalCode = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.paymentTerm)) {
                    party.paymentTerm = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.sendAlerts)) {
                    party.sendAlerts = false;
                }
                if (!(party === null || party === void 0 ? void 0 : party.isCashSaleParty)) {
                    party.isCashSaleParty = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.isFavourite)) {
                    party.isFavourite = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.oldFirebaseId)) {
                    party.oldFirebaseId = null;
                }
                if (!(party === null || party === void 0 ? void 0 : party.satisfactionIndex)) {
                    party.satisfactionIndex = null;
                }
            }
            return party;
        };
    }
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Party.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Party.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "a", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Party.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "b", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Party.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "c", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "d", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "e", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "f", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Party.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "g", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "h", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "i", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "j", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "gstin", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "k", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "billingType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "l", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Party.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "m", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "n", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "o", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1000
    }),
    __metadata("design:type", String)
], Party.prototype, "billingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "p", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "billingProvience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "q", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "billingPostalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "r", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1000
    }),
    __metadata("design:type", String)
], Party.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "s", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "deliveryProvience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "t", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "deliveryPostalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "u", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "paymentTerm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Party.prototype, "v", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Party.prototype, "sendAlerts", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "w", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Party.prototype, "runningSaleBill", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "x", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "runningSaleBillAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Party.prototype, "y", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Party.prototype, "isPrintedKOT", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Party.prototype, "z", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Party.prototype, "isCashSaleParty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Party.prototype, "aa", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Party.prototype, "isFavourite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "ab", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Party.prototype, "lastSaleStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Party.prototype, "ac", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Party.prototype, "oldFirebaseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "ad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "satisfactionIndex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "ae", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "elpTotalEarnedPoints", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "af", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Party.prototype, "elpTotalEarnedAmount", void 0);
Party = __decorate([
    (0, typeorm_1.Entity)({
        name: 'party'
    })
], Party);
exports.Party = Party;
//# sourceMappingURL=Party.js.map