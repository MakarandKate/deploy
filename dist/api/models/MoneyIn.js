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
exports.MoneyIn = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Party_1 = require("./Party");
let MoneyIn = class MoneyIn extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.compress = (moneyIn) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
            if (moneyIn) {
                moneyIn === null || moneyIn === void 0 ? true : delete moneyIn.oldFirebaseId;
                if (moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) {
                    moneyIn.party = this.compressParty(moneyIn.party);
                    //@ts-ignore
                    if ((_a = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _a === void 0 ? void 0 : _a.userMetadata) {
                        (_b = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _b === void 0 ? true : delete _b.userMetadata;
                    }
                    //@ts-ignore
                    if ((_c = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _c === void 0 ? void 0 : _c.systemMetadata) {
                        (_d = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _d === void 0 ? true : delete _d.systemMetadata;
                    }
                    //@ts-ignore
                    (_e = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _e === void 0 ? true : delete _e._id;
                    (_f = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _f === void 0 ? true : delete _f._is;
                    (_g = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _g === void 0 ? true : delete _g._localId;
                    (_h = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _h === void 0 ? true : delete _h._serverIdRef;
                    (_j = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _j === void 0 ? true : delete _j.userMetaData;
                    (_k = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _k === void 0 ? true : delete _k.systemMetaData;
                    (_l = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _l === void 0 ? true : delete _l.createdStamp;
                    (_m = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _m === void 0 ? true : delete _m.updatedStamp;
                    (_o = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _o === void 0 ? true : delete _o.deletedStamp;
                    (_p = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _p === void 0 ? true : delete _p.syncStamp;
                    (_q = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _q === void 0 ? true : delete _q.deviceSyncStartStamp;
                    (_r = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _r === void 0 ? true : delete _r.userId;
                    (_s = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _s === void 0 ? true : delete _s.profileId;
                    (_t = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _t === void 0 ? true : delete _t.createdBy;
                    (_u = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _u === void 0 ? true : delete _u.createdByName;
                    (_v = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _v === void 0 ? true : delete _v.lastModifiedBy;
                    (_w = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _w === void 0 ? true : delete _w.lastModifiedByName;
                    (_x = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _x === void 0 ? true : delete _x.category;
                    (_y = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _y === void 0 ? true : delete _y.credit;
                    (_z = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _z === void 0 ? true : delete _z.type;
                    (_0 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _0 === void 0 ? true : delete _0.billingType;
                    (_1 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _1 === void 0 ? true : delete _1.dateOfBirth;
                    (_2 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _2 === void 0 ? true : delete _2.sendAlerts;
                    (_3 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _3 === void 0 ? true : delete _3.runningSaleBillAmount;
                    (_4 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _4 === void 0 ? true : delete _4.isPrintedKOT;
                    (_5 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _5 === void 0 ? true : delete _5.isFavourite;
                    (_6 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _6 === void 0 ? true : delete _6.lastSaleStamp;
                    (_7 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _7 === void 0 ? true : delete _7.oldFirebaseId;
                    (_8 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _8 === void 0 ? true : delete _8.satisfactionIndex;
                    (_9 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _9 === void 0 ? true : delete _9.elpTotalEarnedPoints;
                    (_10 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _10 === void 0 ? true : delete _10.elpTotalEarnedAmount;
                    (_11 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _11 === void 0 ? true : delete _11.paymentTerm;
                    (_12 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _12 === void 0 ? true : delete _12.runningSaleBill;
                    (_13 = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _13 === void 0 ? true : delete _13.isCashSaleParty;
                }
            }
            this.removeNullAndDefaults(moneyIn);
            return moneyIn;
        };
        this.compressParty = (party) => {
            if (party) {
                if (party === null || party === void 0 ? void 0 : party.name) {
                    party.g = party === null || party === void 0 ? void 0 : party.name;
                    party === null || party === void 0 ? true : delete party.name;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.phone) {
                    party.h = party === null || party === void 0 ? void 0 : party.phone;
                    party === null || party === void 0 ? true : delete party.phone;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.gstin) {
                    party.j = party === null || party === void 0 ? void 0 : party.gstin;
                    party === null || party === void 0 ? true : delete party.gstin;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.businessName) {
                    party.m = party === null || party === void 0 ? void 0 : party.businessName;
                    party === null || party === void 0 ? true : delete party.businessName;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.email) {
                    party.n = party === null || party === void 0 ? void 0 : party.email;
                    party === null || party === void 0 ? true : delete party.email;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.billingAddress) {
                    party.o = party === null || party === void 0 ? void 0 : party.billingAddress;
                    party === null || party === void 0 ? true : delete party.billingAddress;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.billingProvience) {
                    party.p = party === null || party === void 0 ? void 0 : party.billingProvience;
                    party === null || party === void 0 ? true : delete party.billingProvience;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.billingPostalCode) {
                    party.q = party === null || party === void 0 ? void 0 : party.billingPostalCode;
                    party === null || party === void 0 ? true : delete party.billingPostalCode;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.deliveryAddress) {
                    party.r = party === null || party === void 0 ? void 0 : party.deliveryAddress;
                    party === null || party === void 0 ? true : delete party.deliveryAddress;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.deliveryProvience) {
                    party.s = party === null || party === void 0 ? void 0 : party.deliveryProvience;
                    party === null || party === void 0 ? true : delete party.deliveryProvience;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.deliveryPostalCode) {
                    party.t = party === null || party === void 0 ? void 0 : party.deliveryPostalCode;
                    party === null || party === void 0 ? true : delete party.deliveryPostalCode;
                }
                ;
            }
            return party;
        };
        this.expand = (moneyIn) => {
            if (moneyIn) {
                if (moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) {
                    moneyIn.party = this.expandParty(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party);
                }
            }
            this.addDefaults(moneyIn);
            return moneyIn;
        };
        this.expandParty = (party) => {
            if (party) {
                if ((party === null || party === void 0 ? void 0 : party.g) || (party === null || party === void 0 ? void 0 : party.g) == "") {
                    party.name = party === null || party === void 0 ? void 0 : party.g;
                    party === null || party === void 0 ? true : delete party.g;
                }
                if ((party === null || party === void 0 ? void 0 : party.h) || (party === null || party === void 0 ? void 0 : party.h) == "") {
                    party.phone = party === null || party === void 0 ? void 0 : party.h;
                    party === null || party === void 0 ? true : delete party.h;
                }
                if ((party === null || party === void 0 ? void 0 : party.j) || (party === null || party === void 0 ? void 0 : party.j) == "") {
                    party.gstin = party === null || party === void 0 ? void 0 : party.j;
                    party === null || party === void 0 ? true : delete party.j;
                }
                if ((party === null || party === void 0 ? void 0 : party.m) || (party === null || party === void 0 ? void 0 : party.m) == "") {
                    party.businessName = party === null || party === void 0 ? void 0 : party.m;
                    party === null || party === void 0 ? true : delete party.m;
                }
                if ((party === null || party === void 0 ? void 0 : party.n) || (party === null || party === void 0 ? void 0 : party.n) == "") {
                    party.email = party === null || party === void 0 ? void 0 : party.n;
                    party === null || party === void 0 ? true : delete party.n;
                }
                if ((party === null || party === void 0 ? void 0 : party.o) || (party === null || party === void 0 ? void 0 : party.o) == "") {
                    party.billingAddress = party === null || party === void 0 ? void 0 : party.o;
                    party === null || party === void 0 ? true : delete party.o;
                }
                if ((party === null || party === void 0 ? void 0 : party.p) || (party === null || party === void 0 ? void 0 : party.p) == "") {
                    party.billingProvience = party === null || party === void 0 ? void 0 : party.p;
                    party === null || party === void 0 ? true : delete party.p;
                }
                if ((party === null || party === void 0 ? void 0 : party.q) || (party === null || party === void 0 ? void 0 : party.q) == "") {
                    party.billingPostalCode = party === null || party === void 0 ? void 0 : party.q;
                    party === null || party === void 0 ? true : delete party.q;
                }
                if ((party === null || party === void 0 ? void 0 : party.r) || (party === null || party === void 0 ? void 0 : party.r) == "") {
                    party.deliveryAddress = party === null || party === void 0 ? void 0 : party.r;
                    party === null || party === void 0 ? true : delete party.r;
                }
                if ((party === null || party === void 0 ? void 0 : party.s) || (party === null || party === void 0 ? void 0 : party.s) == "") {
                    party.deliveryProvience = party === null || party === void 0 ? void 0 : party.s;
                    party === null || party === void 0 ? true : delete party.s;
                }
                if ((party === null || party === void 0 ? void 0 : party.t) || (party === null || party === void 0 ? void 0 : party.t) == "") {
                    party.deliveryPostalCode = party === null || party === void 0 ? void 0 : party.t;
                    party === null || party === void 0 ? true : delete party.t;
                }
                if ((party === null || party === void 0 ? void 0 : party.w) || (party === null || party === void 0 ? void 0 : party.w) == "") {
                    party.runningSaleBill = party === null || party === void 0 ? void 0 : party.w;
                    party === null || party === void 0 ? true : delete party.w;
                }
            }
            return party;
        };
        this.removeNullAndDefaults = (moneyIn) => {
            let np = moneyIn;
            if (np) {
                if ((np === null || np === void 0 ? void 0 : np.createdBy) == (np === null || np === void 0 ? void 0 : np.userId)) {
                    np.createdBy = "!!";
                } //createdBy
                if ((np === null || np === void 0 ? void 0 : np.lastModifiedBy) == (np === null || np === void 0 ? void 0 : np.userId)) {
                    np.lastModifiedBy = "!!";
                } //lastModifiedBy
                if ((np === null || np === void 0 ? void 0 : np.createdByName) == "Admin") {
                    np.createdByName = "!!";
                } //createdByName
                if ((np === null || np === void 0 ? void 0 : np.lastModifiedByName) == "Admin") {
                    np.lastModifiedByName = "!!";
                } //lastModifiedByName
                (np === null || np === void 0 ? void 0 : np.type) == 'cash' && (np === null || np === void 0 ? true : delete np.type);
                for (let k in np) {
                    if (np[k] === null || np[k] === undefined || np[k] === '') {
                        delete np[k];
                    }
                }
            }
            return np;
        };
        this.addDefaults = (moneyIn) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            if (moneyIn) {
                if ((moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.createdBy) == "!!") {
                    moneyIn.createdBy = moneyIn.userId;
                }
                if ((moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.lastModifiedBy) == "!!") {
                    moneyIn.lastModifiedBy = moneyIn.userId;
                }
                if ((moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.createdByName) == "!!") {
                    moneyIn.createdByName = "Admin";
                }
                if ((moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.lastModifiedByName) == "!!") {
                    moneyIn.lastModifiedByName = "Admin";
                }
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.userId)) {
                    moneyIn.userId = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.profileId)) {
                    moneyIn.profileId = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.billNo)) {
                    moneyIn.billNo = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.billDateStamp)) {
                    moneyIn.billDateStamp = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount)) {
                    moneyIn.totalAmount = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.paymentMode)) {
                    moneyIn.paymentMode = 'cash';
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.oldFirebaseId)) {
                    moneyIn.oldFirebaseId = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.linkedSaleUUID)) {
                    moneyIn.linkedSaleUUID = null;
                }
                ;
                if (!(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.paymentId)) {
                    moneyIn.paymentId = null;
                }
                ;
                if (moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) {
                    if (!((_a = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _a === void 0 ? void 0 : _a.name)) {
                        moneyIn.party.name = null;
                    }
                    ;
                    if (!((_b = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _b === void 0 ? void 0 : _b.phone)) {
                        moneyIn.party.phone = null;
                    }
                    ;
                    if (!((_c = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _c === void 0 ? void 0 : _c.gstin)) {
                        moneyIn.party.gstin = null;
                    }
                    ;
                    if (!((_d = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _d === void 0 ? void 0 : _d.businessName)) {
                        moneyIn.party.businessName = null;
                    }
                    ;
                    if (!((_e = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _e === void 0 ? void 0 : _e.email)) {
                        moneyIn.party.email = null;
                    }
                    ;
                    if (!((_f = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _f === void 0 ? void 0 : _f.billingAddress)) {
                        moneyIn.party.billingAddress = null;
                    }
                    ;
                    if (!((_g = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _g === void 0 ? void 0 : _g.billingProvience)) {
                        moneyIn.party.billingProvience = null;
                    }
                    ;
                    if (!((_h = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _h === void 0 ? void 0 : _h.billingPostalCode)) {
                        moneyIn.party.billingPostalCode = null;
                    }
                    ;
                    if (!((_j = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _j === void 0 ? void 0 : _j.deliveryAddress)) {
                        moneyIn.party.deliveryAddress = null;
                    }
                    ;
                    if (!((_k = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _k === void 0 ? void 0 : _k.deliveryProvience)) {
                        moneyIn.party.deliveryProvience = null;
                    }
                    ;
                    if (!((_l = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _l === void 0 ? void 0 : _l.deliveryPostalCode)) {
                        moneyIn.party.deliveryPostalCode = null;
                    }
                    ;
                    if (!((_m = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _m === void 0 ? void 0 : _m.paymentTerm)) {
                        moneyIn.party.paymentTerm = null;
                    }
                    ;
                    if (!((_o = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _o === void 0 ? void 0 : _o.runningSaleBill)) {
                        moneyIn.party.runningSaleBill = null;
                    }
                    ;
                }
            }
            return moneyIn;
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "billNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], MoneyIn.prototype, "billDateStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], MoneyIn.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], MoneyIn.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MoneyIn.prototype, "paymentMode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "oldFirebaseId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyIn.prototype, "linkedSaleUUID", void 0);
MoneyIn = __decorate([
    (0, typeorm_1.Entity)({
        name: 'moneyin'
    })
], MoneyIn);
exports.MoneyIn = MoneyIn;
//# sourceMappingURL=MoneyIn.js.map