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
exports.MoneyOut = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Party_1 = require("./Party");
let MoneyOut = class MoneyOut extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.compress = (moneyOut) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
            if (moneyOut) {
                moneyOut === null || moneyOut === void 0 ? true : delete moneyOut.oldFirebaseId;
                if (moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) {
                    moneyOut.party = this.compressParty(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party);
                    (_a = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _a === void 0 ? true : delete _a._id;
                    (_b = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _b === void 0 ? true : delete _b._is;
                    (_c = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _c === void 0 ? true : delete _c._localId;
                    (_d = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _d === void 0 ? true : delete _d._serverIdRef;
                    (_e = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _e === void 0 ? true : delete _e.userMetaData;
                    (_f = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _f === void 0 ? true : delete _f.systemMetaData;
                    (_g = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _g === void 0 ? true : delete _g.createdStamp;
                    (_h = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _h === void 0 ? true : delete _h.updatedStamp;
                    (_j = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _j === void 0 ? true : delete _j.deletedStamp;
                    (_k = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _k === void 0 ? true : delete _k.syncStamp;
                    (_l = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _l === void 0 ? true : delete _l.deviceSyncStartStamp;
                    (_m = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _m === void 0 ? true : delete _m.userId;
                    (_o = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _o === void 0 ? true : delete _o.profileId;
                    (_p = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _p === void 0 ? true : delete _p.createdBy;
                    (_q = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _q === void 0 ? true : delete _q.createdByName;
                    (_r = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _r === void 0 ? true : delete _r.lastModifiedBy;
                    (_s = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _s === void 0 ? true : delete _s.lastModifiedByName;
                    (_t = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _t === void 0 ? true : delete _t.category;
                    (_u = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _u === void 0 ? true : delete _u.credit;
                    (_v = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _v === void 0 ? true : delete _v.type;
                    (_w = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _w === void 0 ? true : delete _w.billingType;
                    (_x = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _x === void 0 ? true : delete _x.dateOfBirth;
                    (_y = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _y === void 0 ? true : delete _y.sendAlerts;
                    (_z = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _z === void 0 ? true : delete _z.runningSaleBillAmount;
                    (_0 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _0 === void 0 ? true : delete _0.isPrintedKOT;
                    (_1 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _1 === void 0 ? true : delete _1.isFavourite;
                    (_2 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _2 === void 0 ? true : delete _2.lastSaleStamp;
                    (_3 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _3 === void 0 ? true : delete _3.oldFirebaseId;
                    (_4 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _4 === void 0 ? true : delete _4.satisfactionIndex;
                    (_5 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _5 === void 0 ? true : delete _5.elpTotalEarnedPoints;
                    (_6 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _6 === void 0 ? true : delete _6.elpTotalEarnedAmount;
                    (_7 = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _7 === void 0 ? true : delete _7.paymentTerm;
                }
            }
            this.removeNullAndDefaults(moneyOut);
            return moneyOut;
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
                if (party === null || party === void 0 ? void 0 : party.runningSaleBill) {
                    party.w = party === null || party === void 0 ? void 0 : party.runningSaleBill;
                    party === null || party === void 0 ? true : delete party.runningSaleBill;
                }
                ;
                if (party === null || party === void 0 ? void 0 : party.paymentTerm) {
                    party.u = party === null || party === void 0 ? void 0 : party.paymentTerm;
                    party === null || party === void 0 ? true : delete party.paymentTerm;
                }
                ;
            }
            return party;
        };
        this.expand = (moneyOut) => {
            if (moneyOut) {
                if (moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) {
                    moneyOut.party = this.expandParty(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party);
                }
            }
            this.addDefaults(moneyOut);
            return moneyOut;
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
                if ((party === null || party === void 0 ? void 0 : party.u) || (party === null || party === void 0 ? void 0 : party.u) == "") {
                    party.paymentTerm = party === null || party === void 0 ? void 0 : party.u;
                    party === null || party === void 0 ? true : delete party.u;
                }
            }
            return party;
        };
        this.removeNullAndDefaults = (moneyOut) => {
            let np = moneyOut;
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
                    if (typeof np[k] === 'object' && np[k] !== null) {
                        this.removeNullAndDefaults(np[k]);
                    }
                }
            }
            return np;
        };
        this.addDefaults = (moneyOut) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            if (moneyOut) {
                if ((moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.createdBy) == "!!") {
                    moneyOut.createdBy = moneyOut.userId;
                }
                if ((moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.lastModifiedBy) == "!!") {
                    moneyOut.lastModifiedBy = moneyOut.userId;
                }
                if ((moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.createdByName) == "!!") {
                    moneyOut.createdByName = "Admin";
                }
                if ((moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.lastModifiedByName) == "!!") {
                    moneyOut.lastModifiedByName = "Admin";
                }
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.userId)) {
                    moneyOut.userId = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.profileId)) {
                    moneyOut.profileId = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.billNo)) {
                    moneyOut.billNo = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.billDateStamp)) {
                    moneyOut.billDateStamp = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount)) {
                    moneyOut.totalAmount = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.paymentMode)) {
                    moneyOut.paymentMode = 'cash';
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.oldFirebaseId)) {
                    moneyOut.oldFirebaseId = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.linkedExpenseUUID)) {
                    moneyOut.linkedExpenseUUID = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.linkedPurchaseUUID)) {
                    moneyOut.linkedPurchaseUUID = null;
                }
                ;
                if (!(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.paymentId)) {
                    moneyOut.paymentId = null;
                }
                ;
                if (moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) {
                    if (!((_a = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _a === void 0 ? void 0 : _a.name)) {
                        moneyOut.party.name = null;
                    }
                    ;
                    if (!((_b = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _b === void 0 ? void 0 : _b.phone)) {
                        moneyOut.party.phone = null;
                    }
                    ;
                    if (!((_c = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _c === void 0 ? void 0 : _c.gstin)) {
                        moneyOut.party.gstin = null;
                    }
                    ;
                    if (!((_d = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _d === void 0 ? void 0 : _d.businessName)) {
                        moneyOut.party.businessName = null;
                    }
                    ;
                    if (!((_e = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _e === void 0 ? void 0 : _e.email)) {
                        moneyOut.party.email = null;
                    }
                    ;
                    if (!((_f = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _f === void 0 ? void 0 : _f.billingAddress)) {
                        moneyOut.party.billingAddress = null;
                    }
                    ;
                    if (!((_g = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _g === void 0 ? void 0 : _g.billingProvience)) {
                        moneyOut.party.billingProvience = null;
                    }
                    ;
                    if (!((_h = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _h === void 0 ? void 0 : _h.billingPostalCode)) {
                        moneyOut.party.billingPostalCode = null;
                    }
                    ;
                    if (!((_j = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _j === void 0 ? void 0 : _j.deliveryAddress)) {
                        moneyOut.party.deliveryAddress = null;
                    }
                    ;
                    if (!((_k = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _k === void 0 ? void 0 : _k.deliveryProvience)) {
                        moneyOut.party.deliveryProvience = null;
                    }
                    ;
                    if (!((_l = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _l === void 0 ? void 0 : _l.deliveryPostalCode)) {
                        moneyOut.party.deliveryPostalCode = null;
                    }
                    ;
                    if (!((_m = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _m === void 0 ? void 0 : _m.paymentTerm)) {
                        moneyOut.party.paymentTerm = null;
                    }
                    ;
                    if (!((_o = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _o === void 0 ? void 0 : _o.runningSaleBill)) {
                        moneyOut.party.runningSaleBill = null;
                    }
                    ;
                }
            }
            return moneyOut;
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "billNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], MoneyOut.prototype, "billDateStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], MoneyOut.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MoneyOut.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MoneyOut.prototype, "paymentMode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "oldFirebaseId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "linkedPurchaseUUID", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], MoneyOut.prototype, "linkedExpenseUUID", void 0);
MoneyOut = __decorate([
    (0, typeorm_1.Entity)({
        name: 'moneyout'
    })
], MoneyOut);
exports.MoneyOut = MoneyOut;
//# sourceMappingURL=MoneyOut.js.map