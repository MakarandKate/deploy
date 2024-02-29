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
exports.Sale = exports.IBillingMode = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const BillItem_1 = require("./BillItem");
const Party_1 = require("./Party");
const TransportDetail_1 = require("./TransportDetail");
const bi = new BillItem_1.BillItem();
const td = new TransportDetail_1.TransportDetail();
var IBillingMode;
(function (IBillingMode) {
    IBillingMode["c"] = "c";
    IBillingMode["n"] = "n";
})(IBillingMode = exports.IBillingMode || (exports.IBillingMode = {}));
let Sale = class Sale extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.compress = (sale) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
            if (sale) {
                sale.a = sale === null || sale === void 0 ? void 0 : sale.createdBy;
                sale === null || sale === void 0 ? true : delete sale.createdBy;
                sale.b = sale === null || sale === void 0 ? void 0 : sale.lastModifiedBy;
                sale === null || sale === void 0 ? true : delete sale.lastModifiedBy;
                sale.c = sale === null || sale === void 0 ? void 0 : sale.createdByName;
                sale === null || sale === void 0 ? true : delete sale.createdByName;
                sale.d = sale === null || sale === void 0 ? void 0 : sale.lastModifiedByName;
                sale === null || sale === void 0 ? true : delete sale.lastModifiedByName;
                sale.e = sale === null || sale === void 0 ? void 0 : sale.billNo;
                sale === null || sale === void 0 ? true : delete sale.billNo;
                sale.f = sale === null || sale === void 0 ? void 0 : sale.billCompleteStamp;
                sale === null || sale === void 0 ? true : delete sale.billCompleteStamp;
                sale.g = sale === null || sale === void 0 ? void 0 : sale.billDateStamp;
                sale === null || sale === void 0 ? true : delete sale.billDateStamp;
                sale.h = sale === null || sale === void 0 ? void 0 : sale.dueDateStamp;
                sale === null || sale === void 0 ? true : delete sale.dueDateStamp;
                sale.i = sale === null || sale === void 0 ? void 0 : sale.billingTerm;
                sale === null || sale === void 0 ? true : delete sale.billingTerm;
                sale.j = sale === null || sale === void 0 ? void 0 : sale.transportDetail;
                sale === null || sale === void 0 ? true : delete sale.transportDetail;
                sale.k = this.billPartyCompress(sale === null || sale === void 0 ? void 0 : sale.party);
                sale === null || sale === void 0 ? true : delete sale.party;
                sale.l = this.billPartySecondaryCompress(sale === null || sale === void 0 ? void 0 : sale.partySecondary);
                sale === null || sale === void 0 ? true : delete sale.partySecondary;
                // sale.o=sale?.senderProvience;delete sale?.senderProvience;
                sale.p = sale === null || sale === void 0 ? void 0 : sale.deliveryProvience;
                sale === null || sale === void 0 ? true : delete sale.deliveryProvience;
                sale.q = sale === null || sale === void 0 ? void 0 : sale.note;
                sale === null || sale === void 0 ? true : delete sale.note;
                sale.r = sale === null || sale === void 0 ? void 0 : sale.cashDiscount;
                sale === null || sale === void 0 ? true : delete sale.cashDiscount;
                sale.s = sale === null || sale === void 0 ? void 0 : sale.cashDiscountPercentage;
                sale === null || sale === void 0 ? true : delete sale.cashDiscountPercentage;
                sale.t = sale === null || sale === void 0 ? void 0 : sale.additionalDiscount;
                sale === null || sale === void 0 ? true : delete sale.additionalDiscount;
                sale.u = sale === null || sale === void 0 ? void 0 : sale.isPrintedKOT;
                sale === null || sale === void 0 ? true : delete sale.isPrintedKOT;
                sale.v = sale === null || sale === void 0 ? void 0 : sale.discountAmount;
                sale === null || sale === void 0 ? true : delete sale.discountAmount;
                sale.w = sale === null || sale === void 0 ? void 0 : sale.gstAmount;
                sale === null || sale === void 0 ? true : delete sale.gstAmount;
                sale.x = sale === null || sale === void 0 ? void 0 : sale.cessAmount;
                sale === null || sale === void 0 ? true : delete sale.cessAmount;
                sale.y = sale === null || sale === void 0 ? void 0 : sale.subTotalAmount;
                sale === null || sale === void 0 ? true : delete sale.subTotalAmount;
                sale.z = sale === null || sale === void 0 ? void 0 : sale.totalAmount;
                sale === null || sale === void 0 ? true : delete sale.totalAmount;
                sale.aa = sale === null || sale === void 0 ? void 0 : sale.totalSaving;
                sale === null || sale === void 0 ? true : delete sale.totalSaving;
                sale.ab = sale === null || sale === void 0 ? void 0 : sale.amountReceived;
                sale === null || sale === void 0 ? true : delete sale.amountReceived;
                sale.ac = sale === null || sale === void 0 ? void 0 : sale.roundOffValue;
                sale === null || sale === void 0 ? true : delete sale.roundOffValue;
                sale.ad = sale === null || sale === void 0 ? void 0 : sale.partyPreviousBalance;
                sale === null || sale === void 0 ? true : delete sale.partyPreviousBalance;
                sale.ae = sale === null || sale === void 0 ? void 0 : sale.serviceChargePercentage;
                sale === null || sale === void 0 ? true : delete sale.serviceChargePercentage;
                sale.af = sale === null || sale === void 0 ? void 0 : sale.serviceChargeAmount;
                sale === null || sale === void 0 ? true : delete sale.serviceChargeAmount;
                sale.ag = sale === null || sale === void 0 ? void 0 : sale.billingMode;
                sale === null || sale === void 0 ? true : delete sale.billingMode;
                sale.ah = sale === null || sale === void 0 ? void 0 : sale.expression;
                sale === null || sale === void 0 ? true : delete sale.expression;
                sale.ai = sale === null || sale === void 0 ? void 0 : sale.oldFirebaseId;
                sale === null || sale === void 0 ? true : delete sale.oldFirebaseId;
                sale === null || sale === void 0 ? true : delete sale.userMetaData;
                sale === null || sale === void 0 ? true : delete sale.senderProvience;
                sale === null || sale === void 0 ? true : delete sale.userMetaData;
                sale === null || sale === void 0 ? true : delete sale.systemMetaData;
                if ((_a = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _a === void 0 ? void 0 : _a.length) {
                    for (let i = 0; i < ((_b = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _b === void 0 ? void 0 : _b.length); i++) {
                        if (sale.billItems[i]) {
                            sale.billItems[i] = bi.compress(sale.billItems[i]);
                        }
                    }
                }
                if ((_c = sale === null || sale === void 0 ? void 0 : sale.moneyIns) === null || _c === void 0 ? void 0 : _c.length) {
                    for (let i = 0; i < ((_d = sale === null || sale === void 0 ? void 0 : sale.moneyIns) === null || _d === void 0 ? void 0 : _d.length); i++) {
                        if ((_e = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _e === void 0 ? void 0 : _e.userMetaData) {
                            (_f = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _f === void 0 ? true : delete _f.userMetaData;
                        }
                        if ((_g = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _g === void 0 ? void 0 : _g.systemMetaData) {
                            (_h = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _h === void 0 ? true : delete _h.systemMetaData;
                        }
                        if ((_j = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _j === void 0 ? void 0 : _j.userId) {
                            (_k = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _k === void 0 ? true : delete _k.userId;
                        }
                        if ((_l = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _l === void 0 ? void 0 : _l.profileId) {
                            (_m = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _m === void 0 ? true : delete _m.profileId;
                        }
                        if ((_o = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _o === void 0 ? void 0 : _o.createdBy) {
                            (_p = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _p === void 0 ? true : delete _p.createdBy;
                        }
                        if ((_q = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _q === void 0 ? void 0 : _q.createdByName) {
                            (_r = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _r === void 0 ? true : delete _r.createdByName;
                        }
                        if ((_s = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _s === void 0 ? void 0 : _s.lastModifiedBy) {
                            (_t = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _t === void 0 ? true : delete _t.lastModifiedBy;
                        }
                        if ((_u = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _u === void 0 ? void 0 : _u.lastModifiedByName) {
                            (_v = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _v === void 0 ? true : delete _v.lastModifiedByName;
                        }
                        if ((_w = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _w === void 0 ? void 0 : _w.party) {
                            (_y = (_x = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _x === void 0 ? void 0 : _x.party) === null || _y === void 0 ? true : delete _y.credit;
                            (_0 = (_z = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _z === void 0 ? void 0 : _z.party) === null || _0 === void 0 ? true : delete _0.isCashSaleParty;
                            (_2 = (_1 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _1 === void 0 ? void 0 : _1.party) === null || _2 === void 0 ? true : delete _2.lastModifiedBy;
                            (_4 = (_3 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _3 === void 0 ? void 0 : _3.party) === null || _4 === void 0 ? true : delete _4.lastModifiedByName;
                            (_6 = (_5 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _5 === void 0 ? void 0 : _5.party) === null || _6 === void 0 ? true : delete _6.profileId;
                            (_8 = (_7 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _7 === void 0 ? void 0 : _7.party) === null || _8 === void 0 ? true : delete _8.runningSaleBill;
                            (_10 = (_9 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _9 === void 0 ? void 0 : _9.party) === null || _10 === void 0 ? true : delete _10.runningSaleBillAmount;
                            (_12 = (_11 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _11 === void 0 ? void 0 : _11.party) === null || _12 === void 0 ? true : delete _12.sendAlerts;
                            (_14 = (_13 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _13 === void 0 ? void 0 : _13.party) === null || _14 === void 0 ? true : delete _14.type;
                            (_16 = (_15 = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _15 === void 0 ? void 0 : _15.party) === null || _16 === void 0 ? true : delete _16.userId;
                        }
                    }
                }
                if (sale === null || sale === void 0 ? void 0 : sale.j) {
                    sale.j = td.compress(sale === null || sale === void 0 ? void 0 : sale.j);
                }
                sale = this.removeNullAndDefaults(sale);
            }
            return sale;
        };
        this.expand = (sale) => {
            var _a, _b;
            if (sale) {
                if (sale.a || sale.a == "") {
                    sale.createdBy = sale === null || sale === void 0 ? void 0 : sale.a;
                    sale === null || sale === void 0 ? true : delete sale.a;
                }
                if (sale.b || sale.b == "") {
                    sale.lastModifiedBy = sale === null || sale === void 0 ? void 0 : sale.b;
                    sale === null || sale === void 0 ? true : delete sale.b;
                }
                if (sale.c || sale.c == "") {
                    sale.createdByName = sale === null || sale === void 0 ? void 0 : sale.c;
                    sale === null || sale === void 0 ? true : delete sale.c;
                }
                if (sale.d || sale.d == "") {
                    sale.lastModifiedByName = sale === null || sale === void 0 ? void 0 : sale.d;
                    sale === null || sale === void 0 ? true : delete sale.d;
                }
                if (sale.e || sale.e == "") {
                    sale.billNo = sale === null || sale === void 0 ? void 0 : sale.e;
                    sale === null || sale === void 0 ? true : delete sale.e;
                }
                if (sale.f || sale.f == 0) {
                    sale.billCompleteStamp = sale === null || sale === void 0 ? void 0 : sale.f;
                    sale === null || sale === void 0 ? true : delete sale.f;
                }
                if (sale.g || sale.g == 0) {
                    sale.billDateStamp = sale === null || sale === void 0 ? void 0 : sale.g;
                    sale === null || sale === void 0 ? true : delete sale.g;
                }
                if (sale.h || sale.h == 0) {
                    sale.dueDateStamp = sale === null || sale === void 0 ? void 0 : sale.h;
                    sale === null || sale === void 0 ? true : delete sale.h;
                }
                if (sale.i || sale.i == "") {
                    sale.billingTerm = sale === null || sale === void 0 ? void 0 : sale.i;
                    sale === null || sale === void 0 ? true : delete sale.i;
                }
                if (sale.j) {
                    sale.transportDetail = sale === null || sale === void 0 ? void 0 : sale.j;
                    sale === null || sale === void 0 ? true : delete sale.j;
                }
                if (sale.k) {
                    sale.party = this.billPartyExpand(sale === null || sale === void 0 ? void 0 : sale.k);
                    sale === null || sale === void 0 ? true : delete sale.k;
                }
                if (sale.l) {
                    sale.partySecondary = this.billPartySecondaryExpand(sale === null || sale === void 0 ? void 0 : sale.l);
                    sale === null || sale === void 0 ? true : delete sale.l;
                }
                // if(sale.o || sale.o==""){sale.senderProvience=sale?.o;delete sale?.o;}
                if (sale.p || sale.p == "") {
                    sale.deliveryProvience = sale === null || sale === void 0 ? void 0 : sale.p;
                    sale === null || sale === void 0 ? true : delete sale.p;
                }
                if (sale.q || sale.q == "") {
                    sale.note = sale === null || sale === void 0 ? void 0 : sale.q;
                    sale === null || sale === void 0 ? true : delete sale.q;
                }
                if (sale.r || sale.r == 0) {
                    sale.cashDiscount = sale === null || sale === void 0 ? void 0 : sale.r;
                    sale === null || sale === void 0 ? true : delete sale.r;
                }
                if (sale.s || sale.s == 0) {
                    sale.cashDiscountPercentage = sale === null || sale === void 0 ? void 0 : sale.s;
                    sale === null || sale === void 0 ? true : delete sale.s;
                }
                if (sale.t || sale.t == 0) {
                    sale.additionalDiscount = sale === null || sale === void 0 ? void 0 : sale.t;
                    sale === null || sale === void 0 ? true : delete sale.t;
                }
                if (sale.u || sale.u == false) {
                    sale.isPrintedKOT = sale === null || sale === void 0 ? void 0 : sale.u;
                    sale === null || sale === void 0 ? true : delete sale.u;
                }
                if (sale.v || sale.v == 0) {
                    sale.discountAmount = sale === null || sale === void 0 ? void 0 : sale.v;
                    sale === null || sale === void 0 ? true : delete sale.v;
                }
                if (sale.w || sale.w == 0) {
                    sale.gstAmount = sale === null || sale === void 0 ? void 0 : sale.w;
                    sale === null || sale === void 0 ? true : delete sale.w;
                }
                if (sale.x || sale.x == 0) {
                    sale.cessAmount = sale === null || sale === void 0 ? void 0 : sale.x;
                    sale === null || sale === void 0 ? true : delete sale.x;
                }
                if (sale.y || sale.y == 0) {
                    sale.subTotalAmount = sale === null || sale === void 0 ? void 0 : sale.y;
                    sale === null || sale === void 0 ? true : delete sale.y;
                }
                if (sale.z || sale.z == 0) {
                    sale.totalAmount = sale === null || sale === void 0 ? void 0 : sale.z;
                    sale === null || sale === void 0 ? true : delete sale.z;
                }
                if (sale.aa || sale.aa == 0) {
                    sale.totalSaving = sale === null || sale === void 0 ? void 0 : sale.aa;
                    sale === null || sale === void 0 ? true : delete sale.aa;
                }
                if (sale.ab || sale.ab == 0) {
                    sale.amountReceived = sale === null || sale === void 0 ? void 0 : sale.ab;
                    sale === null || sale === void 0 ? true : delete sale.ab;
                }
                if (sale.ac || sale.ac == 0) {
                    sale.roundOffValue = sale === null || sale === void 0 ? void 0 : sale.ac;
                    sale === null || sale === void 0 ? true : delete sale.ac;
                }
                if (sale.ad || sale.ad == 0) {
                    sale.partyPreviousBalance = sale === null || sale === void 0 ? void 0 : sale.ad;
                    sale === null || sale === void 0 ? true : delete sale.ad;
                }
                if (sale.ae || sale.ae == 0) {
                    sale.serviceChargePercentage = sale === null || sale === void 0 ? void 0 : sale.ae;
                    sale === null || sale === void 0 ? true : delete sale.ae;
                }
                if (sale.af || sale.af == 0) {
                    sale.serviceChargeAmount = sale === null || sale === void 0 ? void 0 : sale.af;
                    sale === null || sale === void 0 ? true : delete sale.af;
                }
                if (sale.ag || sale.ag == null) {
                    sale.billingMode = sale === null || sale === void 0 ? void 0 : sale.ag;
                    sale === null || sale === void 0 ? true : delete sale.ag;
                }
                if (sale.ah || sale.ah == "") {
                    sale.expression = sale === null || sale === void 0 ? void 0 : sale.ah;
                    sale === null || sale === void 0 ? true : delete sale.ah;
                }
                if (sale.ai || sale.ai == "") {
                    sale.oldFirebaseId = sale === null || sale === void 0 ? void 0 : sale.ai;
                    sale === null || sale === void 0 ? true : delete sale.ai;
                }
                if ((_a = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _a === void 0 ? void 0 : _a.length) {
                    for (let i = 0; i < ((_b = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _b === void 0 ? void 0 : _b.length); i++) {
                        if (sale.billItems[i]) {
                            sale.billItems[i] = bi.expand(sale.billItems[i]);
                        }
                    }
                }
                if (sale === null || sale === void 0 ? void 0 : sale.transportDetail) {
                    sale.transportDetail = td.expand(sale === null || sale === void 0 ? void 0 : sale.transportDetail);
                }
                sale = this.addDefaults(sale);
            }
            return sale;
        };
        this.billPartyCompress = (billParty) => {
            if (billParty) {
                //@ts-ignore
                if (billParty === null || billParty === void 0 ? void 0 : billParty.userMetadata) {
                    billParty === null || billParty === void 0 ? true : delete billParty.userMetadata;
                }
                //@ts-ignore
                if (billParty === null || billParty === void 0 ? void 0 : billParty.systemMetadata) {
                    billParty === null || billParty === void 0 ? true : delete billParty.systemMetadata;
                }
                //@ts-ignore
                if (billParty === null || billParty === void 0 ? void 0 : billParty.isTable) {
                    billParty === null || billParty === void 0 ? true : delete billParty.isTable;
                }
                billParty === null || billParty === void 0 ? true : delete billParty.userMetaData;
                billParty === null || billParty === void 0 ? true : delete billParty.systemMetaData;
                billParty === null || billParty === void 0 ? true : delete billParty.userId;
                billParty === null || billParty === void 0 ? true : delete billParty.profileId;
                billParty === null || billParty === void 0 ? true : delete billParty.createdBy;
                billParty === null || billParty === void 0 ? true : delete billParty.createdByName;
                billParty === null || billParty === void 0 ? true : delete billParty.lastModifiedBy;
                billParty === null || billParty === void 0 ? true : delete billParty.lastModifiedByName;
                billParty === null || billParty === void 0 ? true : delete billParty.billingType;
                billParty === null || billParty === void 0 ? true : delete billParty.sendAlerts;
                billParty === null || billParty === void 0 ? true : delete billParty.isFavourite;
                billParty === null || billParty === void 0 ? true : delete billParty.lastSaleStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.satisfactionIndex;
                billParty === null || billParty === void 0 ? true : delete billParty.elpTotalEarnedPoints;
                billParty === null || billParty === void 0 ? true : delete billParty.elpTotalEarnedAmount;
                billParty === null || billParty === void 0 ? true : delete billParty.isPrintedKOT;
                billParty === null || billParty === void 0 ? true : delete billParty.isCashSaleParty;
                billParty === null || billParty === void 0 ? true : delete billParty.createdStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.updatedStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.deletedStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.category;
                billParty === null || billParty === void 0 ? true : delete billParty.credit;
                billParty === null || billParty === void 0 ? true : delete billParty.type;
                billParty === null || billParty === void 0 ? true : delete billParty.dateOfBirth;
                billParty === null || billParty === void 0 ? true : delete billParty.runningSaleBillAmount;
                billParty === null || billParty === void 0 ? true : delete billParty.sendAlerts;
                billParty === null || billParty === void 0 ? true : delete billParty.oldFirebaseId;
                billParty === null || billParty === void 0 ? true : delete billParty._id;
                billParty === null || billParty === void 0 ? true : delete billParty._serverIdRef;
                billParty === null || billParty === void 0 ? true : delete billParty._localId;
                billParty === null || billParty === void 0 ? true : delete billParty._is;
                billParty === null || billParty === void 0 ? true : delete billParty.syncStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.deviceSyncStartStamp;
                if (billParty.name) {
                    billParty.g = billParty.name;
                }
                delete billParty.name;
                if (billParty.phone) {
                    billParty.h = billParty.phone;
                }
                delete billParty.phone;
                if (billParty.runningSaleBill) {
                    billParty.w = billParty.runningSaleBill;
                }
                delete billParty.runningSaleBill;
                if (billParty.paymentTerm) {
                    billParty.u = billParty.paymentTerm;
                }
                delete billParty.paymentTerm;
                // Needed because of android pdf
                if (billParty.gstin) {
                    billParty.j = billParty.gstin;
                }
                delete billParty.gstin;
                if (billParty.email) {
                    billParty.n = billParty.email;
                }
                delete billParty.email;
                if (billParty.businessName) {
                    billParty.m = billParty.businessName;
                }
                delete billParty.businessName;
                if (billParty.billingAddress) {
                    billParty.o = billParty.billingAddress;
                }
                delete billParty.billingAddress;
                if (billParty.billingProvience) {
                    billParty.p = billParty.billingProvience;
                }
                delete billParty.billingProvience;
                if (billParty.deliveryPostalCode) {
                    billParty.t = billParty.deliveryPostalCode;
                }
                delete billParty.deliveryPostalCode;
                if (billParty.deliveryProvience) {
                    billParty.s = billParty.deliveryProvience;
                }
                delete billParty.deliveryProvience;
                if (billParty.deliveryAddress) {
                    billParty.r = billParty.deliveryAddress;
                }
                delete billParty.deliveryAddress;
                if (billParty.billingPostalCode) {
                    billParty.q = billParty.billingPostalCode;
                }
                delete billParty.billingPostalCode;
            }
            return billParty;
        };
        this.billPartyExpand = (billParty) => {
            if (billParty) {
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.e) || (billParty === null || billParty === void 0 ? void 0 : billParty.e) == "") {
                    billParty.category = billParty === null || billParty === void 0 ? void 0 : billParty.e;
                    billParty === null || billParty === void 0 ? true : delete billParty.e;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.f) || (billParty === null || billParty === void 0 ? void 0 : billParty.f) == 0) {
                    billParty.credit = billParty === null || billParty === void 0 ? void 0 : billParty.f;
                    billParty === null || billParty === void 0 ? true : delete billParty.f;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.g) || (billParty === null || billParty === void 0 ? void 0 : billParty.g) == "") {
                    billParty.name = billParty === null || billParty === void 0 ? void 0 : billParty.g;
                    billParty === null || billParty === void 0 ? true : delete billParty.g;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.h) || (billParty === null || billParty === void 0 ? void 0 : billParty.h) == "") {
                    billParty.phone = billParty === null || billParty === void 0 ? void 0 : billParty.h;
                    billParty === null || billParty === void 0 ? true : delete billParty.h;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.i) || (billParty === null || billParty === void 0 ? void 0 : billParty.i) == "") {
                    billParty.type = billParty === null || billParty === void 0 ? void 0 : billParty.i;
                    billParty === null || billParty === void 0 ? true : delete billParty.i;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.j) || (billParty === null || billParty === void 0 ? void 0 : billParty.j) == "") {
                    billParty.gstin = billParty === null || billParty === void 0 ? void 0 : billParty.j;
                    billParty === null || billParty === void 0 ? true : delete billParty.j;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.l) || (billParty === null || billParty === void 0 ? void 0 : billParty.l) == 0) {
                    billParty.dateOfBirth = billParty === null || billParty === void 0 ? void 0 : billParty.l;
                    billParty === null || billParty === void 0 ? true : delete billParty.l;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.m) || (billParty === null || billParty === void 0 ? void 0 : billParty.m) == "") {
                    billParty.businessName = billParty === null || billParty === void 0 ? void 0 : billParty.m;
                    billParty === null || billParty === void 0 ? true : delete billParty.m;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.n) || (billParty === null || billParty === void 0 ? void 0 : billParty.n) == "") {
                    billParty.email = billParty === null || billParty === void 0 ? void 0 : billParty.n;
                    billParty === null || billParty === void 0 ? true : delete billParty.n;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.o) || (billParty === null || billParty === void 0 ? void 0 : billParty.o) == "") {
                    billParty.billingAddress = billParty === null || billParty === void 0 ? void 0 : billParty.o;
                    billParty === null || billParty === void 0 ? true : delete billParty.o;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.p) || (billParty === null || billParty === void 0 ? void 0 : billParty.p) == "") {
                    billParty.billingProvience = billParty === null || billParty === void 0 ? void 0 : billParty.p;
                    billParty === null || billParty === void 0 ? true : delete billParty.p;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.q) || (billParty === null || billParty === void 0 ? void 0 : billParty.q) == "") {
                    billParty.billingPostalCode = billParty === null || billParty === void 0 ? void 0 : billParty.q;
                    billParty === null || billParty === void 0 ? true : delete billParty.q;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.r) || (billParty === null || billParty === void 0 ? void 0 : billParty.r) == "") {
                    billParty.deliveryAddress = billParty === null || billParty === void 0 ? void 0 : billParty.r;
                    billParty === null || billParty === void 0 ? true : delete billParty.r;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.s) || (billParty === null || billParty === void 0 ? void 0 : billParty.s) == "") {
                    billParty.deliveryProvience = billParty === null || billParty === void 0 ? void 0 : billParty.s;
                    billParty === null || billParty === void 0 ? true : delete billParty.s;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.t) || (billParty === null || billParty === void 0 ? void 0 : billParty.t) == "") {
                    billParty.deliveryPostalCode = billParty === null || billParty === void 0 ? void 0 : billParty.t;
                    billParty === null || billParty === void 0 ? true : delete billParty.t;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.u) || (billParty === null || billParty === void 0 ? void 0 : billParty.u) == "") {
                    billParty.paymentTerm = billParty === null || billParty === void 0 ? void 0 : billParty.u;
                    billParty === null || billParty === void 0 ? true : delete billParty.u;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.v) || (billParty === null || billParty === void 0 ? void 0 : billParty.v) == false) {
                    billParty.sendAlerts = billParty === null || billParty === void 0 ? void 0 : billParty.v;
                    billParty === null || billParty === void 0 ? true : delete billParty.v;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.w) || (billParty === null || billParty === void 0 ? void 0 : billParty.w) == "") {
                    billParty.runningSaleBill = billParty === null || billParty === void 0 ? void 0 : billParty.w;
                    billParty === null || billParty === void 0 ? true : delete billParty.w;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.x) || (billParty === null || billParty === void 0 ? void 0 : billParty.x) == 0) {
                    billParty.runningSaleBillAmount = billParty === null || billParty === void 0 ? void 0 : billParty.x;
                    billParty === null || billParty === void 0 ? true : delete billParty.x;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.z) || (billParty === null || billParty === void 0 ? void 0 : billParty.z) == false) {
                    billParty.isCashSaleParty = billParty === null || billParty === void 0 ? void 0 : billParty.z;
                    billParty === null || billParty === void 0 ? true : delete billParty.z;
                }
            }
            return billParty;
        };
        this.billPartySecondaryCompress = (billParty) => {
            if (billParty) {
                //@ts-ignore
                if (billParty === null || billParty === void 0 ? void 0 : billParty.userMetadata) {
                    billParty === null || billParty === void 0 ? true : delete billParty.userMetadata;
                }
                //@ts-ignore
                if (billParty === null || billParty === void 0 ? void 0 : billParty.systemMetadata) {
                    billParty === null || billParty === void 0 ? true : delete billParty.systemMetadata;
                }
                //@ts-ignore
                if (billParty === null || billParty === void 0 ? void 0 : billParty.isTable) {
                    billParty === null || billParty === void 0 ? true : delete billParty.isTable;
                }
                billParty === null || billParty === void 0 ? true : delete billParty.userMetaData;
                billParty === null || billParty === void 0 ? true : delete billParty.systemMetaData;
                billParty === null || billParty === void 0 ? true : delete billParty.userId;
                billParty === null || billParty === void 0 ? true : delete billParty.profileId;
                billParty === null || billParty === void 0 ? true : delete billParty.createdBy;
                billParty === null || billParty === void 0 ? true : delete billParty.createdByName;
                billParty === null || billParty === void 0 ? true : delete billParty.lastModifiedBy;
                billParty === null || billParty === void 0 ? true : delete billParty.lastModifiedByName;
                billParty === null || billParty === void 0 ? true : delete billParty.billingType;
                billParty === null || billParty === void 0 ? true : delete billParty.sendAlerts;
                billParty === null || billParty === void 0 ? true : delete billParty.isFavourite;
                billParty === null || billParty === void 0 ? true : delete billParty.lastSaleStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.satisfactionIndex;
                billParty === null || billParty === void 0 ? true : delete billParty.elpTotalEarnedPoints;
                billParty === null || billParty === void 0 ? true : delete billParty.elpTotalEarnedAmount;
                billParty === null || billParty === void 0 ? true : delete billParty.isPrintedKOT;
                billParty === null || billParty === void 0 ? true : delete billParty.isCashSaleParty;
                billParty === null || billParty === void 0 ? true : delete billParty.createdStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.updatedStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.deletedStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.category;
                billParty === null || billParty === void 0 ? true : delete billParty.credit;
                billParty === null || billParty === void 0 ? true : delete billParty.type;
                billParty === null || billParty === void 0 ? true : delete billParty.dateOfBirth;
                billParty === null || billParty === void 0 ? true : delete billParty.runningSaleBillAmount;
                billParty === null || billParty === void 0 ? true : delete billParty.sendAlerts;
                billParty === null || billParty === void 0 ? true : delete billParty.oldFirebaseId;
                billParty === null || billParty === void 0 ? true : delete billParty._id;
                billParty === null || billParty === void 0 ? true : delete billParty._serverIdRef;
                billParty === null || billParty === void 0 ? true : delete billParty._localId;
                billParty === null || billParty === void 0 ? true : delete billParty._is;
                billParty === null || billParty === void 0 ? true : delete billParty.syncStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.deviceSyncStartStamp;
                billParty === null || billParty === void 0 ? true : delete billParty.runningSaleBill;
                billParty === null || billParty === void 0 ? true : delete billParty.paymentTerm;
                if (billParty.name) {
                    billParty.g = billParty.name;
                }
                delete billParty.name;
                if (billParty.phone) {
                    billParty.h = billParty.phone;
                }
                delete billParty.phone;
                if (billParty.lastSaleStamp) {
                    billParty.ab = billParty.lastSaleStamp;
                }
                delete billParty.lastSaleStamp;
                // Needed because of android pdf
                if (billParty.gstin) {
                    billParty.j = billParty.gstin;
                }
                delete billParty.gstin;
                if (billParty.email) {
                    billParty.n = billParty.email;
                }
                delete billParty.email;
                if (billParty.businessName) {
                    billParty.m = billParty.businessName;
                }
                delete billParty.businessName;
                if (billParty.billingAddress) {
                    billParty.o = billParty.billingAddress;
                }
                delete billParty.billingAddress;
                if (billParty.billingProvience) {
                    billParty.p = billParty.billingProvience;
                }
                delete billParty.billingProvience;
                if (billParty.deliveryPostalCode) {
                    billParty.t = billParty.deliveryPostalCode;
                }
                delete billParty.deliveryPostalCode;
                if (billParty.deliveryProvience) {
                    billParty.s = billParty.deliveryProvience;
                }
                delete billParty.deliveryProvience;
                if (billParty.deliveryAddress) {
                    billParty.r = billParty.deliveryAddress;
                }
                delete billParty.deliveryAddress;
                if (billParty.billingPostalCode) {
                    billParty.q = billParty.billingPostalCode;
                }
                delete billParty.billingPostalCode;
            }
            return billParty;
        };
        this.billPartySecondaryExpand = (billParty) => {
            if (billParty) {
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.e) || (billParty === null || billParty === void 0 ? void 0 : billParty.e) == "") {
                    billParty.category = billParty === null || billParty === void 0 ? void 0 : billParty.e;
                    billParty === null || billParty === void 0 ? true : delete billParty.e;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.f) || (billParty === null || billParty === void 0 ? void 0 : billParty.f) == 0) {
                    billParty.credit = billParty === null || billParty === void 0 ? void 0 : billParty.f;
                    billParty === null || billParty === void 0 ? true : delete billParty.f;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.g) || (billParty === null || billParty === void 0 ? void 0 : billParty.g) == "") {
                    billParty.name = billParty === null || billParty === void 0 ? void 0 : billParty.g;
                    billParty === null || billParty === void 0 ? true : delete billParty.g;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.h) || (billParty === null || billParty === void 0 ? void 0 : billParty.h) == "") {
                    billParty.phone = billParty === null || billParty === void 0 ? void 0 : billParty.h;
                    billParty === null || billParty === void 0 ? true : delete billParty.h;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.i) || (billParty === null || billParty === void 0 ? void 0 : billParty.i) == "") {
                    billParty.type = billParty === null || billParty === void 0 ? void 0 : billParty.i;
                    billParty === null || billParty === void 0 ? true : delete billParty.i;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.j) || (billParty === null || billParty === void 0 ? void 0 : billParty.j) == "") {
                    billParty.gstin = billParty === null || billParty === void 0 ? void 0 : billParty.j;
                    billParty === null || billParty === void 0 ? true : delete billParty.j;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.l) || (billParty === null || billParty === void 0 ? void 0 : billParty.l) == 0) {
                    billParty.dateOfBirth = billParty === null || billParty === void 0 ? void 0 : billParty.l;
                    billParty === null || billParty === void 0 ? true : delete billParty.l;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.m) || (billParty === null || billParty === void 0 ? void 0 : billParty.m) == "") {
                    billParty.businessName = billParty === null || billParty === void 0 ? void 0 : billParty.m;
                    billParty === null || billParty === void 0 ? true : delete billParty.m;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.n) || (billParty === null || billParty === void 0 ? void 0 : billParty.n) == "") {
                    billParty.email = billParty === null || billParty === void 0 ? void 0 : billParty.n;
                    billParty === null || billParty === void 0 ? true : delete billParty.n;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.o) || (billParty === null || billParty === void 0 ? void 0 : billParty.o) == "") {
                    billParty.billingAddress = billParty === null || billParty === void 0 ? void 0 : billParty.o;
                    billParty === null || billParty === void 0 ? true : delete billParty.o;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.p) || (billParty === null || billParty === void 0 ? void 0 : billParty.p) == "") {
                    billParty.billingProvience = billParty === null || billParty === void 0 ? void 0 : billParty.p;
                    billParty === null || billParty === void 0 ? true : delete billParty.p;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.q) || (billParty === null || billParty === void 0 ? void 0 : billParty.q) == "") {
                    billParty.billingPostalCode = billParty === null || billParty === void 0 ? void 0 : billParty.q;
                    billParty === null || billParty === void 0 ? true : delete billParty.q;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.r) || (billParty === null || billParty === void 0 ? void 0 : billParty.r) == "") {
                    billParty.deliveryAddress = billParty === null || billParty === void 0 ? void 0 : billParty.r;
                    billParty === null || billParty === void 0 ? true : delete billParty.r;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.s) || (billParty === null || billParty === void 0 ? void 0 : billParty.s) == "") {
                    billParty.deliveryProvience = billParty === null || billParty === void 0 ? void 0 : billParty.s;
                    billParty === null || billParty === void 0 ? true : delete billParty.s;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.t) || (billParty === null || billParty === void 0 ? void 0 : billParty.t) == "") {
                    billParty.deliveryPostalCode = billParty === null || billParty === void 0 ? void 0 : billParty.t;
                    billParty === null || billParty === void 0 ? true : delete billParty.t;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.u) || (billParty === null || billParty === void 0 ? void 0 : billParty.u) == "") {
                    billParty.paymentTerm = billParty === null || billParty === void 0 ? void 0 : billParty.u;
                    billParty === null || billParty === void 0 ? true : delete billParty.u;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.v) || (billParty === null || billParty === void 0 ? void 0 : billParty.v) == false) {
                    billParty.sendAlerts = billParty === null || billParty === void 0 ? void 0 : billParty.v;
                    billParty === null || billParty === void 0 ? true : delete billParty.v;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.w) || (billParty === null || billParty === void 0 ? void 0 : billParty.w) == "") {
                    billParty.runningSaleBill = billParty === null || billParty === void 0 ? void 0 : billParty.w;
                    billParty === null || billParty === void 0 ? true : delete billParty.w;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.x) || (billParty === null || billParty === void 0 ? void 0 : billParty.x) == 0) {
                    billParty.runningSaleBillAmount = billParty === null || billParty === void 0 ? void 0 : billParty.x;
                    billParty === null || billParty === void 0 ? true : delete billParty.x;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.z) || (billParty === null || billParty === void 0 ? void 0 : billParty.z) == false) {
                    billParty.isCashSaleParty = billParty === null || billParty === void 0 ? void 0 : billParty.z;
                    billParty === null || billParty === void 0 ? true : delete billParty.z;
                }
                if ((billParty === null || billParty === void 0 ? void 0 : billParty.ab) || (billParty === null || billParty === void 0 ? void 0 : billParty.ab) == 0) {
                    billParty.lastSaleStamp = billParty === null || billParty === void 0 ? void 0 : billParty.ab;
                    billParty === null || billParty === void 0 ? true : delete billParty.ab;
                }
            }
            return billParty;
        };
        this.removeNullAndDefaults = (sale) => {
            var _a, _b, _c, _d;
            let ns = sale;
            if (ns) {
                for (let k in ns) {
                    if (ns[k] === null || ns[k] === undefined || ns[k] === '') {
                        delete ns[k];
                    }
                }
                if ((ns === null || ns === void 0 ? void 0 : ns.a) == (ns === null || ns === void 0 ? void 0 : ns.userId)) {
                    ns.a = "!!";
                } //createdBy
                if ((ns === null || ns === void 0 ? void 0 : ns.b) == (ns === null || ns === void 0 ? void 0 : ns.userId)) {
                    ns.b = "!!";
                } //lastModifiedBy
                if ((ns === null || ns === void 0 ? void 0 : ns.c) == "Admin") {
                    ns.c = "!!";
                } //createdByName
                if ((ns === null || ns === void 0 ? void 0 : ns.d) == "Admin") {
                    ns.d = "!!";
                } //lastModifiedByName
                // if(ns?.moneyIns && ns?.moneyIns?.length==0){
                //     ns.moneyIns=[];
                // }
                //Removing transportDetails if every key is null
                let tdv = false;
                if (ns === null || ns === void 0 ? void 0 : ns.j) {
                    let td = ns === null || ns === void 0 ? void 0 : ns.j;
                    for (let k in td) {
                        if (td[k]) {
                            tdv = true;
                        }
                    }
                }
                if (!tdv) {
                    ns === null || ns === void 0 ? true : delete ns.j;
                }
                if ((ns === null || ns === void 0 ? void 0 : ns.h) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.h;
                } //dueDateStamp
                if ((ns === null || ns === void 0 ? void 0 : ns.i) === "") {
                    ns === null || ns === void 0 ? true : delete ns.i;
                } //billingTerm
                if ((ns === null || ns === void 0 ? void 0 : ns.o) === "") {
                    ns === null || ns === void 0 ? true : delete ns.o;
                } //senderProvience
                if ((ns === null || ns === void 0 ? void 0 : ns.p) === "") {
                    ns === null || ns === void 0 ? true : delete ns.p;
                } //deliveryProvience
                if ((ns === null || ns === void 0 ? void 0 : ns.q) === "") {
                    ns === null || ns === void 0 ? true : delete ns.q;
                } //note
                if ((ns === null || ns === void 0 ? void 0 : ns.r) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.r;
                } //cashDiscount
                if ((ns === null || ns === void 0 ? void 0 : ns.s) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.s;
                } //cashDiscountPercentage
                if ((ns === null || ns === void 0 ? void 0 : ns.u) === false) {
                    ns === null || ns === void 0 ? true : delete ns.u;
                } //isPrintedKOT
                if ((ns === null || ns === void 0 ? void 0 : ns.v) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.v;
                } //discountAmount
                if ((ns === null || ns === void 0 ? void 0 : ns.w) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.w;
                } //gstAmount
                if ((ns === null || ns === void 0 ? void 0 : ns.x) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.x;
                } //cessAmount
                if ((ns === null || ns === void 0 ? void 0 : ns.y) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.y;
                } //subTotalAmount
                if ((ns === null || ns === void 0 ? void 0 : ns.z) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.z;
                } //totalAmount
                if ((ns === null || ns === void 0 ? void 0 : ns.aa) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.aa;
                } //totalSaving
                if ((ns === null || ns === void 0 ? void 0 : ns.ab) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.ab;
                } //amountReceived
                if ((ns === null || ns === void 0 ? void 0 : ns.ac) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.ac;
                } //roundOffValue
                if ((ns === null || ns === void 0 ? void 0 : ns.ad) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.ad;
                } //partyPreviousBalance
                if ((ns === null || ns === void 0 ? void 0 : ns.ae) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.ae;
                } //serviceChargePercentage
                if ((ns === null || ns === void 0 ? void 0 : ns.af) === 0) {
                    ns === null || ns === void 0 ? true : delete ns.af;
                } //serviceChargeAmount
                //if(ns?.ag===null){delete ns?.ag}//billingMode
                if (ns === null || ns === void 0 ? void 0 : ns.k) {
                    if (((_a = ns === null || ns === void 0 ? void 0 : ns.k) === null || _a === void 0 ? void 0 : _a.j) === "") {
                        (_b = ns === null || ns === void 0 ? void 0 : ns.k) === null || _b === void 0 ? true : delete _b.j;
                    } //party.gstin
                }
                if (ns === null || ns === void 0 ? void 0 : ns.l) {
                    if (((_c = ns === null || ns === void 0 ? void 0 : ns.l) === null || _c === void 0 ? void 0 : _c.j) === "") {
                        (_d = ns === null || ns === void 0 ? void 0 : ns.l) === null || _d === void 0 ? true : delete _d.j;
                    } //partySecondary.gstin
                }
            }
            return ns;
        };
        this.addDefaults = (sale) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if (sale) {
                if ((sale === null || sale === void 0 ? void 0 : sale.createdBy) == "!!") {
                    sale.createdBy = sale.userId;
                }
                if ((sale === null || sale === void 0 ? void 0 : sale.lastModifiedBy) == "!!") {
                    sale.lastModifiedBy = sale.userId;
                }
                if ((sale === null || sale === void 0 ? void 0 : sale.createdByName) == "!!") {
                    sale.createdByName = "Admin";
                }
                if ((sale === null || sale === void 0 ? void 0 : sale.lastModifiedByName) == "!!") {
                    sale.lastModifiedByName = "Admin";
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.moneyIns)) {
                    sale.moneyIns = [];
                }
                if ((_a = sale === null || sale === void 0 ? void 0 : sale.moneyIns) === null || _a === void 0 ? void 0 : _a.length) {
                    for (let i = 0; i < ((_b = sale === null || sale === void 0 ? void 0 : sale.moneyIns) === null || _b === void 0 ? void 0 : _b.length); i++) {
                        if (!((_c = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _c === void 0 ? void 0 : _c.billNo)) {
                            sale.moneyIns[i].billNo = null;
                        }
                        if (!((_d = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _d === void 0 ? void 0 : _d.totalAmount)) {
                            sale.moneyIns[i].totalAmount = null;
                        }
                        if (!((_e = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _e === void 0 ? void 0 : _e.paymentMode)) {
                            sale.moneyIns[i].paymentMode = null;
                        }
                        if (!((_f = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _f === void 0 ? void 0 : _f.paymentId)) {
                            sale.moneyIns[i].paymentId = null;
                        }
                        if (!((_g = sale === null || sale === void 0 ? void 0 : sale.moneyIns[i]) === null || _g === void 0 ? void 0 : _g.linkedSaleUUID)) {
                            sale.moneyIns[i].linkedSaleUUID = null;
                        }
                    }
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.transportDetail) || (sale === null || sale === void 0 ? void 0 : sale.transportDetail) == null || (sale === null || sale === void 0 ? void 0 : sale.transportDetail) == undefined) {
                    let tdv = new TransportDetail_1.TransportDetail();
                    tdv.additionalAmount = null;
                    tdv.deliveryDate = null;
                    tdv.deliveryLocation = null;
                    tdv.eWayBillDate = null;
                    tdv.eWayBillNo = null;
                    tdv.purOrderNo = null;
                    tdv.transporterName = null;
                    tdv.vehicleNumber = null;
                    tdv.challanNo = null;
                    tdv.transDistance = null;
                    tdv.tnc = null;
                    sale.transportDetail = tdv;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.billNo)) {
                    sale.billNo = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.billCompleteStamp)) {
                    sale.billCompleteStamp = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.billDateStamp)) {
                    sale.billDateStamp = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.dueDateStamp)) {
                    sale.dueDateStamp = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.billingTerm)) {
                    sale.billingTerm = null;
                }
                // if(!sale?.senderProvience){sale.senderProvience=null}
                if (!(sale === null || sale === void 0 ? void 0 : sale.deliveryProvience)) {
                    sale.deliveryProvience = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.note)) {
                    sale.note = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.cashDiscount)) {
                    sale.cashDiscount = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.cashDiscountPercentage)) {
                    sale.cashDiscountPercentage = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.additionalDiscount)) {
                    sale.additionalDiscount = 0;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.isPrintedKOT)) {
                    sale.isPrintedKOT = false;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.discountAmount)) {
                    sale.discountAmount = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.gstAmount)) {
                    sale.gstAmount = 0;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.cessAmount)) {
                    sale.cessAmount = 0;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.subTotalAmount)) {
                    sale.subTotalAmount = 0;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.totalAmount)) {
                    sale.totalAmount = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.totalSaving)) {
                    sale.totalSaving = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.amountReceived)) {
                    sale.amountReceived = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.roundOffValue)) {
                    sale.roundOffValue = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.partyPreviousBalance)) {
                    sale.partyPreviousBalance = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.serviceChargePercentage)) {
                    sale.serviceChargePercentage = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.serviceChargeAmount)) {
                    sale.serviceChargeAmount = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.billingMode)) {
                    sale.billingMode = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.expression)) {
                    sale.expression = null;
                }
                if (!(sale === null || sale === void 0 ? void 0 : sale.oldFirebaseId)) {
                    sale.oldFirebaseId = null;
                }
                if (sale === null || sale === void 0 ? void 0 : sale.party) {
                    if (!((_h = sale === null || sale === void 0 ? void 0 : sale.party) === null || _h === void 0 ? void 0 : _h.gstin)) {
                        sale.party.gstin = null;
                    }
                }
                if (sale === null || sale === void 0 ? void 0 : sale.partySecondary) {
                    if (!((_j = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _j === void 0 ? void 0 : _j.gstin)) {
                        sale.partySecondary.gstin = null;
                    }
                }
            }
            return sale;
        };
    }
};
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Sale.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Sale.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "a", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Sale.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "b", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Sale.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "c", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Sale.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "d", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Sale.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "e", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Sale.prototype, "billNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "f", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "billCompleteStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "g", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "billDateStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "h", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "dueDateStamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "i", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Sale.prototype, "billingTerm", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", TransportDetail_1.TransportDetail)
], Sale.prototype, "j", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", TransportDetail_1.TransportDetail)
], Sale.prototype, "transportDetail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], Sale.prototype, "k", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], Sale.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], Sale.prototype, "l", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Party_1.Party)
], Sale.prototype, "partySecondary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Sale.prototype, "billItems", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Sale.prototype, "moneyIns", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "o", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "senderProvience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "p", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "deliveryProvience", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "q", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 2000
    }),
    __metadata("design:type", String)
], Sale.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "r", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "cashDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "s", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "cashDiscountPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "t", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "additionalDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Sale.prototype, "u", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean'
    }),
    __metadata("design:type", Boolean)
], Sale.prototype, "isPrintedKOT", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "v", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "discountAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "w", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "gstAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "x", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "cessAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "y", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "subTotalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "z", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "aa", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "totalSaving", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "ab", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "amountReceived", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "ac", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "roundOffValue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "ad", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "partyPreviousBalance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "ae", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "serviceChargePercentage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sale.prototype, "af", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Sale.prototype, "serviceChargeAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "ag", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: IBillingMode,
        default: null,
    }),
    __metadata("design:type", String)
], Sale.prototype, "billingMode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "ah", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
    }),
    __metadata("design:type", String)
], Sale.prototype, "expression", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sale.prototype, "ai", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Sale.prototype, "oldFirebaseId", void 0);
Sale = __decorate([
    (0, typeorm_1.Entity)({
        name: 'sale'
    })
], Sale);
exports.Sale = Sale;
//# sourceMappingURL=Sale.js.map