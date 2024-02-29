"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillItem = void 0;
class BillItem {
    constructor() {
        /**
         *
         * @param billItem : billItems of sale
         * @returns : remove unused key before storing to database
         */
        this.compress = (billItem) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157;
            if (billItem) {
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.quantity)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.quantity;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveQuantity)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.effectiveQuantity;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unit)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.unit;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.convertRatioMultiplier)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.convertRatioMultiplier;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.price)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.price;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectivePrice)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.effectivePrice;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveMrp)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.effectiveMrp;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.discount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.discount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.discountPercentage)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.discountPercentage;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.billCashDiscountPercentage)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.billCashDiscountPercentage;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveDiscountPercentage)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.effectiveDiscountPercentage;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.incTax)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.incTax;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.taxPercentage)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.taxPercentage;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.cessPercentage)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.cessPercentage;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveTaxPercentage)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.effectiveTaxPercentage;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.isTaxExempted)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.isTaxExempted;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.isTaxZero)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.isTaxZero;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.basePrice)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.basePrice;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.subTotal)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.subTotal;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.total)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.total;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.totalSaving)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.totalSaving;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.billNote)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.billNote;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitDiscountAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.unitDiscountAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitGstAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.unitGstAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitCessAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.unitCessAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitTaxAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.unitTaxAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.itemTotalGstAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.itemTotalGstAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.itemTotalCessAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.itemTotalCessAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.itemTotalTaxAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.itemTotalTaxAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.wcdBasePrice)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.wcdBasePrice;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.wcdUnitTaxAmount)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.wcdUnitTaxAmount;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.wcdTotal)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.wcdTotal;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.kotNote)) {
                    billItem === null || billItem === void 0 ? true : delete billItem.kotNote;
                }
                ;
                if (billItem === null || billItem === void 0 ? void 0 : billItem.item) {
                    if (!((_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a.itemName)) {
                        (_b = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _b === void 0 ? true : delete _b.itemName;
                    }
                    ;
                    if (!((_c = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _c === void 0 ? void 0 : _c.sellPrice)) {
                        (_d = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _d === void 0 ? true : delete _d.sellPrice;
                    }
                    ;
                    if (!((_e = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _e === void 0 ? void 0 : _e.purchasePrice)) {
                        (_f = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _f === void 0 ? true : delete _f.purchasePrice;
                    }
                    ;
                    if (!((_g = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _g === void 0 ? void 0 : _g.category)) {
                        (_h = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _h === void 0 ? true : delete _h.category;
                    }
                    ;
                    if (!((_j = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _j === void 0 ? void 0 : _j.mrp)) {
                        (_k = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _k === void 0 ? true : delete _k.mrp;
                    }
                    ;
                    if (!((_l = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _l === void 0 ? void 0 : _l.expiryDate)) {
                        (_m = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _m === void 0 ? true : delete _m.expiryDate;
                    }
                    ;
                    if (!((_o = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _o === void 0 ? void 0 : _o.description)) {
                        (_p = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _p === void 0 ? true : delete _p.description;
                    }
                    ;
                    if (!((_q = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _q === void 0 ? void 0 : _q.spIncTax)) {
                        (_r = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _r === void 0 ? true : delete _r.spIncTax;
                    }
                    ;
                    if (!((_s = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _s === void 0 ? void 0 : _s.primaryUnit)) {
                        (_t = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _t === void 0 ? true : delete _t.primaryUnit;
                    }
                    ;
                    if (!((_u = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _u === void 0 ? void 0 : _u.hsn)) {
                        (_v = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _v === void 0 ? true : delete _v.hsn;
                    }
                    ;
                    if (!((_w = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _w === void 0 ? void 0 : _w.createdStamp)) {
                        (_x = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _x === void 0 ? true : delete _x.createdStamp;
                    }
                    ;
                    if (!((_y = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _y === void 0 ? void 0 : _y.itemCode)) {
                        (_z = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _z === void 0 ? true : delete _z.itemCode;
                    }
                    ;
                    if (!((_0 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _0 === void 0 ? void 0 : _0.barcode)) {
                        (_1 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _1 === void 0 ? true : delete _1.barcode;
                    }
                    ;
                    if (!((_2 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _2 === void 0 ? void 0 : _2.barcode2)) {
                        (_3 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _3 === void 0 ? true : delete _3.barcode2;
                    }
                    ;
                    if (!((_4 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _4 === void 0 ? void 0 : _4.barcode3)) {
                        (_5 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _5 === void 0 ? true : delete _5.barcode3;
                    }
                    ;
                    if (!((_6 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _6 === void 0 ? void 0 : _6.barcode4)) {
                        (_7 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _7 === void 0 ? true : delete _7.barcode4;
                    }
                    ;
                    if (!((_8 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _8 === void 0 ? void 0 : _8.barcode5)) {
                        (_9 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _9 === void 0 ? true : delete _9.barcode5;
                    }
                    ;
                    if (!((_10 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _10 === void 0 ? void 0 : _10.stock)) {
                        (_11 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _11 === void 0 ? true : delete _11.stock;
                    }
                    ;
                    if (!((_12 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _12 === void 0 ? void 0 : _12.onlineDeliverySellPrice)) {
                        (_13 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _13 === void 0 ? true : delete _13.onlineDeliverySellPrice;
                    }
                    ;
                    if (!((_14 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _14 === void 0 ? void 0 : _14.acSellPrice)) {
                        (_15 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _15 === void 0 ? true : delete _15.acSellPrice;
                    }
                    ;
                    if (!((_16 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _16 === void 0 ? void 0 : _16.nonAcSellPrice)) {
                        (_17 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _17 === void 0 ? true : delete _17.nonAcSellPrice;
                    }
                    ;
                    if (!((_18 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _18 === void 0 ? void 0 : _18.isTaxExempted)) {
                        (_19 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _19 === void 0 ? true : delete _19.isTaxExempted;
                    }
                    ;
                    if (!((_20 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _20 === void 0 ? void 0 : _20.isTaxZero)) {
                        (_21 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _21 === void 0 ? true : delete _21.isTaxZero;
                    }
                    ;
                    if (!((_22 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _22 === void 0 ? void 0 : _22.taxPercentage)) {
                        (_23 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _23 === void 0 ? true : delete _23.taxPercentage;
                    }
                    ;
                    if (!((_24 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _24 === void 0 ? void 0 : _24.cessPercentage)) {
                        (_25 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _25 === void 0 ? true : delete _25.cessPercentage;
                    }
                    ;
                    if (!((_26 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _26 === void 0 ? void 0 : _26.convertRatioR)) {
                        (_27 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _27 === void 0 ? true : delete _27.convertRatioR;
                    }
                    ;
                    if (!((_28 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _28 === void 0 ? void 0 : _28.discountPercent)) {
                        (_29 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _29 === void 0 ? true : delete _29.discountPercent;
                    }
                    ;
                    if (!((_30 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _30 === void 0 ? void 0 : _30.isFavourite)) {
                        (_31 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _31 === void 0 ? true : delete _31.isFavourite;
                    }
                    ;
                    (_32 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _32 === void 0 ? true : delete _32._localId;
                    (_33 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _33 === void 0 ? true : delete _33._serverIdRef;
                    (_34 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _34 === void 0 ? true : delete _34._is;
                    (_35 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _35 === void 0 ? true : delete _35._id;
                    (_36 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _36 === void 0 ? true : delete _36.createdStamp;
                    (_37 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _37 === void 0 ? true : delete _37.deletedStamp;
                    (_38 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _38 === void 0 ? true : delete _38.syncStamp;
                    (_39 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _39 === void 0 ? true : delete _39.deviceSyncStartStamp;
                    (_40 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _40 === void 0 ? true : delete _40.updatedStamp;
                    (_41 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _41 === void 0 ? true : delete _41.userId;
                    (_42 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _42 === void 0 ? true : delete _42.profileId;
                    (_43 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _43 === void 0 ? true : delete _43.createdBy;
                    (_44 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _44 === void 0 ? true : delete _44.lastModifiedBy;
                    (_45 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _45 === void 0 ? true : delete _45.createdByName;
                    (_46 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _46 === void 0 ? true : delete _46.lastModifiedByName;
                    (_47 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _47 === void 0 ? true : delete _47.userMetaData;
                    (_48 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _48 === void 0 ? true : delete _48.systemMetaData;
                    (_49 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _49 === void 0 ? true : delete _49.type;
                    (_50 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _50 === void 0 ? true : delete _50.onlineSellPrice;
                    (_51 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _51 === void 0 ? true : delete _51.brandName;
                    (_52 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _52 === void 0 ? true : delete _52.wholesalePrice;
                    (_53 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _53 === void 0 ? true : delete _53.wholesaleMinCutOffQty;
                    (_54 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _54 === void 0 ? true : delete _54.minStock;
                    (_55 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _55 === void 0 ? true : delete _55.storageLocation;
                    (_56 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _56 === void 0 ? true : delete _56.onlineDukanItem;
                    (_57 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _57 === void 0 ? true : delete _57.images;
                    (_58 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _58 === void 0 ? true : delete _58.convertRatio;
                    (_59 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _59 === void 0 ? true : delete _59.discountFlat;
                    (_60 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _60 === void 0 ? true : delete _60.note;
                    (_61 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _61 === void 0 ? true : delete _61.ppIncTax;
                    (_62 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _62 === void 0 ? true : delete _62.oldFirebaseId;
                    if ((_64 = (_63 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _63 === void 0 ? void 0 : _63.itemIngredients) === null || _64 === void 0 ? void 0 : _64.length) {
                        for (let i = 0; i < ((_66 = (_65 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _65 === void 0 ? void 0 : _65.itemIngredients) === null || _66 === void 0 ? void 0 : _66.length); i++) {
                            if ((_67 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _67 === void 0 ? void 0 : _67.itemIngredients[i]) {
                                if (!((_69 = (_68 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _68 === void 0 ? void 0 : _68.itemIngredients[i]) === null || _69 === void 0 ? void 0 : _69.quantity)) {
                                    (_71 = (_70 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _70 === void 0 ? void 0 : _70.itemIngredients[i]) === null || _71 === void 0 ? true : delete _71.quantity;
                                }
                                ;
                                if ((_73 = (_72 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _72 === void 0 ? void 0 : _72.itemIngredients[i]) === null || _73 === void 0 ? void 0 : _73.ingredient) {
                                    if (!((_76 = (_75 = (_74 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _74 === void 0 ? void 0 : _74.itemIngredients[i]) === null || _75 === void 0 ? void 0 : _75.ingredient) === null || _76 === void 0 ? void 0 : _76.name)) {
                                        (_79 = (_78 = (_77 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _77 === void 0 ? void 0 : _77.itemIngredients[i]) === null || _78 === void 0 ? void 0 : _78.ingredient) === null || _79 === void 0 ? true : delete _79.name;
                                    }
                                    ;
                                    if (!((_82 = (_81 = (_80 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _80 === void 0 ? void 0 : _80.itemIngredients[i]) === null || _81 === void 0 ? void 0 : _81.ingredient) === null || _82 === void 0 ? void 0 : _82.unit)) {
                                        (_85 = (_84 = (_83 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _83 === void 0 ? void 0 : _83.itemIngredients[i]) === null || _84 === void 0 ? void 0 : _84.ingredient) === null || _85 === void 0 ? true : delete _85.unit;
                                    }
                                    ;
                                    (_88 = (_87 = (_86 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _86 === void 0 ? void 0 : _86.itemIngredients[i]) === null || _87 === void 0 ? void 0 : _87.ingredient) === null || _88 === void 0 ? true : delete _88._localId;
                                    (_91 = (_90 = (_89 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _89 === void 0 ? void 0 : _89.itemIngredients[i]) === null || _90 === void 0 ? void 0 : _90.ingredient) === null || _91 === void 0 ? true : delete _91._serverIdRef;
                                    (_94 = (_93 = (_92 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _92 === void 0 ? void 0 : _92.itemIngredients[i]) === null || _93 === void 0 ? void 0 : _93.ingredient) === null || _94 === void 0 ? true : delete _94._is;
                                    (_97 = (_96 = (_95 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _95 === void 0 ? void 0 : _95.itemIngredients[i]) === null || _96 === void 0 ? void 0 : _96.ingredient) === null || _97 === void 0 ? true : delete _97._id;
                                    (_100 = (_99 = (_98 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _98 === void 0 ? void 0 : _98.itemIngredients[i]) === null || _99 === void 0 ? void 0 : _99.ingredient) === null || _100 === void 0 ? true : delete _100.deletedStamp;
                                    (_103 = (_102 = (_101 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _101 === void 0 ? void 0 : _101.itemIngredients[i]) === null || _102 === void 0 ? void 0 : _102.ingredient) === null || _103 === void 0 ? true : delete _103.syncStamp;
                                    (_106 = (_105 = (_104 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _104 === void 0 ? void 0 : _104.itemIngredients[i]) === null || _105 === void 0 ? void 0 : _105.ingredient) === null || _106 === void 0 ? true : delete _106.deviceSyncStartStamp;
                                    (_109 = (_108 = (_107 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _107 === void 0 ? void 0 : _107.itemIngredients[i]) === null || _108 === void 0 ? void 0 : _108.ingredient) === null || _109 === void 0 ? true : delete _109.updatedStamp;
                                    (_112 = (_111 = (_110 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _110 === void 0 ? void 0 : _110.itemIngredients[i]) === null || _111 === void 0 ? void 0 : _111.ingredient) === null || _112 === void 0 ? true : delete _112.createdStamp;
                                    (_115 = (_114 = (_113 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _113 === void 0 ? void 0 : _113.itemIngredients[i]) === null || _114 === void 0 ? void 0 : _114.ingredient) === null || _115 === void 0 ? true : delete _115.userId;
                                    (_118 = (_117 = (_116 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _116 === void 0 ? void 0 : _116.itemIngredients[i]) === null || _117 === void 0 ? void 0 : _117.ingredient) === null || _118 === void 0 ? true : delete _118.profileId;
                                    (_121 = (_120 = (_119 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _119 === void 0 ? void 0 : _119.itemIngredients[i]) === null || _120 === void 0 ? void 0 : _120.ingredient) === null || _121 === void 0 ? true : delete _121.createdBy;
                                    (_124 = (_123 = (_122 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _122 === void 0 ? void 0 : _122.itemIngredients[i]) === null || _123 === void 0 ? void 0 : _123.ingredient) === null || _124 === void 0 ? true : delete _124.lastModifiedBy;
                                    (_127 = (_126 = (_125 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _125 === void 0 ? void 0 : _125.itemIngredients[i]) === null || _126 === void 0 ? void 0 : _126.ingredient) === null || _127 === void 0 ? true : delete _127.createdByName;
                                    (_130 = (_129 = (_128 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _128 === void 0 ? void 0 : _128.itemIngredients[i]) === null || _129 === void 0 ? void 0 : _129.ingredient) === null || _130 === void 0 ? true : delete _130.lastModifiedByName;
                                    (_133 = (_132 = (_131 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _131 === void 0 ? void 0 : _131.itemIngredients[i]) === null || _132 === void 0 ? void 0 : _132.ingredient) === null || _133 === void 0 ? true : delete _133.userMetaData;
                                    (_136 = (_135 = (_134 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _134 === void 0 ? void 0 : _134.itemIngredients[i]) === null || _135 === void 0 ? void 0 : _135.ingredient) === null || _136 === void 0 ? true : delete _136.systemMetaData;
                                    (_139 = (_138 = (_137 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _137 === void 0 ? void 0 : _137.itemIngredients[i]) === null || _138 === void 0 ? void 0 : _138.ingredient) === null || _139 === void 0 ? true : delete _139.category;
                                    (_142 = (_141 = (_140 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _140 === void 0 ? void 0 : _140.itemIngredients[i]) === null || _141 === void 0 ? void 0 : _141.ingredient) === null || _142 === void 0 ? true : delete _142.stock;
                                    (_145 = (_144 = (_143 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _143 === void 0 ? void 0 : _143.itemIngredients[i]) === null || _144 === void 0 ? void 0 : _144.ingredient) === null || _145 === void 0 ? true : delete _145.minStock;
                                    (_148 = (_147 = (_146 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _146 === void 0 ? void 0 : _146.itemIngredients[i]) === null || _147 === void 0 ? void 0 : _147.ingredient) === null || _148 === void 0 ? true : delete _148.description;
                                    (_151 = (_150 = (_149 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _149 === void 0 ? void 0 : _149.itemIngredients[i]) === null || _150 === void 0 ? void 0 : _150.ingredient) === null || _151 === void 0 ? true : delete _151.images;
                                    (_154 = (_153 = (_152 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _152 === void 0 ? void 0 : _152.itemIngredients[i]) === null || _153 === void 0 ? void 0 : _153.ingredient) === null || _154 === void 0 ? true : delete _154.yesterdayEOD;
                                    (_157 = (_156 = (_155 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _155 === void 0 ? void 0 : _155.itemIngredients[i]) === null || _156 === void 0 ? void 0 : _156.ingredient) === null || _157 === void 0 ? true : delete _157.todayEOD;
                                }
                            }
                        }
                    }
                }
            }
            return billItem;
        };
        // --------------------------------------------------------
        /**
         *
         * @param billItem :  billItems of sale
         * @returns : provide original key name from abbr key before use to web and android
         */
        this.expand = (billItem) => {
            if (billItem) {
                billItem = this.addDefaults(billItem);
            }
            return billItem;
        };
        // --------------------------------------------------------
        /**
         *
         * @param billItem : billItems of sale
         * @returns : set null value if key not store to database and key used at web and android
         */
        this.addDefaults = (billItem) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
            if (billItem) {
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.quantity)) {
                    billItem.quantity = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveQuantity)) {
                    billItem.effectiveQuantity = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unit)) {
                    billItem.unit = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.convertRatioMultiplier)) {
                    billItem.convertRatioMultiplier = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.price)) {
                    billItem.price = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectivePrice)) {
                    billItem.effectivePrice = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveMrp)) {
                    billItem.effectiveMrp = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.discount)) {
                    billItem.discount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.discountPercentage)) {
                    billItem.discountPercentage = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.billCashDiscountPercentage)) {
                    billItem.billCashDiscountPercentage = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveDiscountPercentage)) {
                    billItem.effectiveDiscountPercentage = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.incTax)) {
                    billItem.incTax = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.taxPercentage)) {
                    billItem.taxPercentage = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.cessPercentage)) {
                    billItem.cessPercentage = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.effectiveTaxPercentage)) {
                    billItem.effectiveTaxPercentage = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.isTaxExempted)) {
                    billItem.isTaxExempted = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.isTaxZero)) {
                    billItem.isTaxZero = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.basePrice)) {
                    billItem.basePrice = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.subTotal)) {
                    billItem.subTotal = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.total)) {
                    billItem.total = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.totalSaving)) {
                    billItem.totalSaving = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.billNote)) {
                    billItem.billNote = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitDiscountAmount)) {
                    billItem.unitDiscountAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitGstAmount)) {
                    billItem.unitGstAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitCessAmount)) {
                    billItem.unitCessAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.unitTaxAmount)) {
                    billItem.unitTaxAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.itemTotalGstAmount)) {
                    billItem.itemTotalGstAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.itemTotalCessAmount)) {
                    billItem.itemTotalCessAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.itemTotalTaxAmount)) {
                    billItem.itemTotalTaxAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.wcdBasePrice)) {
                    billItem.wcdBasePrice = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.wcdUnitTaxAmount)) {
                    billItem.wcdUnitTaxAmount = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.wcdTotal)) {
                    billItem.wcdTotal = null;
                }
                ;
                if (!(billItem === null || billItem === void 0 ? void 0 : billItem.kotNote)) {
                    billItem.kotNote = null;
                }
                ;
                if (billItem === null || billItem === void 0 ? void 0 : billItem.item) {
                    if (!((_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a.itemName)) {
                        billItem.item.itemName = null;
                    }
                    ;
                    if (!((_b = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _b === void 0 ? void 0 : _b.sellPrice)) {
                        billItem.item.sellPrice = null;
                    }
                    ;
                    if (!((_c = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _c === void 0 ? void 0 : _c.purchasePrice)) {
                        billItem.item.purchasePrice = null;
                    }
                    ;
                    if (!((_d = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _d === void 0 ? void 0 : _d.category)) {
                        billItem.item.category = null;
                    }
                    ;
                    if (!((_e = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _e === void 0 ? void 0 : _e.mrp)) {
                        billItem.item.mrp = null;
                    }
                    ;
                    if (!((_f = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _f === void 0 ? void 0 : _f.expiryDate)) {
                        billItem.item.expiryDate = null;
                    }
                    ;
                    if (!((_g = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _g === void 0 ? void 0 : _g.description)) {
                        billItem.item.description = null;
                    }
                    ;
                    if (!((_h = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _h === void 0 ? void 0 : _h.spIncTax)) {
                        billItem.item.spIncTax = false;
                    }
                    ;
                    if (!((_j = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _j === void 0 ? void 0 : _j.primaryUnit)) {
                        billItem.item.primaryUnit = null;
                    }
                    ;
                    if (!((_k = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _k === void 0 ? void 0 : _k.hsn)) {
                        billItem.item.hsn = null;
                    }
                    ;
                    if (!((_l = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _l === void 0 ? void 0 : _l.createdStamp)) {
                        billItem.item.createdStamp = null;
                    }
                    ;
                    if (!((_m = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _m === void 0 ? void 0 : _m.itemCode)) {
                        billItem.item.itemCode = null;
                    }
                    ;
                    if (!((_o = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _o === void 0 ? void 0 : _o.barcode)) {
                        billItem.item.barcode = null;
                    }
                    ;
                    if (!((_p = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _p === void 0 ? void 0 : _p.barcode2)) {
                        billItem.item.barcode2 = null;
                    }
                    ;
                    if (!((_q = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _q === void 0 ? void 0 : _q.barcode3)) {
                        billItem.item.barcode3 = null;
                    }
                    ;
                    if (!((_r = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _r === void 0 ? void 0 : _r.barcode4)) {
                        billItem.item.barcode4 = null;
                    }
                    ;
                    if (!((_s = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _s === void 0 ? void 0 : _s.barcode5)) {
                        billItem.item.barcode5 = null;
                    }
                    ;
                    if (!((_t = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _t === void 0 ? void 0 : _t.stock)) {
                        billItem.item.stock = null;
                    }
                    ;
                    if (!((_u = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _u === void 0 ? void 0 : _u.onlineDeliverySellPrice)) {
                        billItem.item.onlineDeliverySellPrice = null;
                    }
                    ;
                    if (!((_v = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _v === void 0 ? void 0 : _v.acSellPrice)) {
                        billItem.item.acSellPrice = null;
                    }
                    ;
                    if (!((_w = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _w === void 0 ? void 0 : _w.nonAcSellPrice)) {
                        billItem.item.nonAcSellPrice = null;
                    }
                    ;
                    if (!((_x = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _x === void 0 ? void 0 : _x.isTaxExempted)) {
                        billItem.item.isTaxExempted = null;
                    }
                    ;
                    if (!((_y = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _y === void 0 ? void 0 : _y.isTaxZero)) {
                        billItem.item.isTaxZero = null;
                    }
                    ;
                    if (!((_z = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _z === void 0 ? void 0 : _z.taxPercentage)) {
                        billItem.item.taxPercentage = null;
                    }
                    ;
                    if (!((_0 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _0 === void 0 ? void 0 : _0.cessPercentage)) {
                        billItem.item.cessPercentage = null;
                    }
                    ;
                    if (!((_1 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _1 === void 0 ? void 0 : _1.convertRatioR)) {
                        billItem.item.convertRatioR = null;
                    }
                    ;
                    if (!((_2 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _2 === void 0 ? void 0 : _2.discountPercent)) {
                        billItem.item.discountPercent = null;
                    }
                    ;
                    if (!((_3 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _3 === void 0 ? void 0 : _3.isFavourite)) {
                        billItem.item.isFavourite = false;
                    }
                    ;
                    if ((_5 = (_4 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _4 === void 0 ? void 0 : _4.itemIngredients) === null || _5 === void 0 ? void 0 : _5.length) {
                        for (let i = 0; i < ((_7 = (_6 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _6 === void 0 ? void 0 : _6.itemIngredients) === null || _7 === void 0 ? void 0 : _7.length); i++) {
                            if ((_8 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _8 === void 0 ? void 0 : _8.itemIngredients[i]) {
                                if (!((_10 = (_9 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _9 === void 0 ? void 0 : _9.itemIngredients[i]) === null || _10 === void 0 ? void 0 : _10.quantity)) {
                                    billItem.item.itemIngredients[i].quantity = null;
                                }
                                ;
                                if ((_12 = (_11 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _11 === void 0 ? void 0 : _11.itemIngredients[i]) === null || _12 === void 0 ? void 0 : _12.ingredient) {
                                    if (!((_15 = (_14 = (_13 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _13 === void 0 ? void 0 : _13.itemIngredients[i]) === null || _14 === void 0 ? void 0 : _14.ingredient) === null || _15 === void 0 ? void 0 : _15.name)) {
                                        billItem.item.itemIngredients[i].ingredient.name = null;
                                    }
                                    ;
                                    if (!((_18 = (_17 = (_16 = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _16 === void 0 ? void 0 : _16.itemIngredients[i]) === null || _17 === void 0 ? void 0 : _17.ingredient) === null || _18 === void 0 ? void 0 : _18.unit)) {
                                        billItem.item.itemIngredients[i].ingredient.unit = null;
                                    }
                                    ;
                                }
                            }
                        }
                    }
                }
            }
            return billItem;
        };
        // --------------------------------------------------------
    }
}
exports.BillItem = BillItem;
//# sourceMappingURL=BillItem.js.map