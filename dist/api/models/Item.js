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
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let Item = class Item extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        this.hsn = '';
        this.discountFlat = 0;
        this.discountPercent = 0;
        this.compress = (item) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40;
            if (item) {
                item === null || item === void 0 ? true : delete item.oldFirebaseId;
                item === null || item === void 0 ? true : delete item.discountFlat;
                let itemIngredientsLength = (_a = item === null || item === void 0 ? void 0 : item.itemIngredients) === null || _a === void 0 ? void 0 : _a.length;
                if (itemIngredientsLength) {
                    for (let i = 0; i < itemIngredientsLength; i++) {
                        if (!((_b = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _b === void 0 ? void 0 : _b.quantity)) {
                            (_c = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _c === void 0 ? true : delete _c.quantity;
                        }
                        ;
                        if ((_d = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _d === void 0 ? void 0 : _d.ingredient) {
                            if (!((_f = (_e = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _e === void 0 ? void 0 : _e.ingredient) === null || _f === void 0 ? void 0 : _f.createdStamp)) {
                                (_g = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _g === void 0 ? true : delete _g.ingredient.createdStamp;
                            }
                            ;
                            if (!((_j = (_h = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _h === void 0 ? void 0 : _h.ingredient) === null || _j === void 0 ? void 0 : _j.name)) {
                                (_k = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _k === void 0 ? true : delete _k.ingredient.name;
                            }
                            ;
                            if (!((_m = (_l = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _l === void 0 ? void 0 : _l.ingredient) === null || _m === void 0 ? void 0 : _m.category)) {
                                (_o = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _o === void 0 ? true : delete _o.ingredient.category;
                            }
                            ;
                            if (!((_q = (_p = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _p === void 0 ? void 0 : _p.ingredient) === null || _q === void 0 ? void 0 : _q.unit)) {
                                (_r = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _r === void 0 ? true : delete _r.ingredient.unit;
                            }
                            ;
                            if (!((_t = (_s = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _s === void 0 ? void 0 : _s.ingredient) === null || _t === void 0 ? void 0 : _t.stock)) {
                                (_u = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _u === void 0 ? true : delete _u.ingredient.stock;
                            }
                            ;
                            if (!((_w = (_v = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _v === void 0 ? void 0 : _v.ingredient) === null || _w === void 0 ? void 0 : _w.minStock)) {
                                (_x = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _x === void 0 ? true : delete _x.ingredient.minStock;
                            }
                            ;
                            if (!((_z = (_y = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _y === void 0 ? void 0 : _y.ingredient) === null || _z === void 0 ? void 0 : _z.deletedStamp)) {
                                (_0 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _0 === void 0 ? true : delete _0.ingredient.deletedStamp;
                            }
                            ;
                            (_2 = (_1 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _1 === void 0 ? void 0 : _1.ingredient) === null || _2 === void 0 ? true : delete _2._id;
                            (_4 = (_3 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _3 === void 0 ? void 0 : _3.ingredient) === null || _4 === void 0 ? true : delete _4._serverIdRef;
                            (_6 = (_5 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _5 === void 0 ? void 0 : _5.ingredient) === null || _6 === void 0 ? true : delete _6._localId;
                            (_8 = (_7 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _7 === void 0 ? void 0 : _7.ingredient) === null || _8 === void 0 ? true : delete _8._is;
                            (_10 = (_9 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _9 === void 0 ? void 0 : _9.ingredient) === null || _10 === void 0 ? true : delete _10.createdStamp;
                            (_12 = (_11 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _11 === void 0 ? void 0 : _11.ingredient) === null || _12 === void 0 ? true : delete _12.updatedStamp;
                            (_14 = (_13 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _13 === void 0 ? void 0 : _13.ingredient) === null || _14 === void 0 ? true : delete _14.syncStamp;
                            (_16 = (_15 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _15 === void 0 ? void 0 : _15.ingredient) === null || _16 === void 0 ? true : delete _16.deviceSyncStartStamp;
                            (_18 = (_17 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _17 === void 0 ? void 0 : _17.ingredient) === null || _18 === void 0 ? true : delete _18.userMetaData;
                            (_20 = (_19 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _19 === void 0 ? void 0 : _19.ingredient) === null || _20 === void 0 ? true : delete _20.systemMetaData;
                            (_22 = (_21 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _21 === void 0 ? void 0 : _21.ingredient) === null || _22 === void 0 ? true : delete _22.createdBy;
                            (_24 = (_23 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _23 === void 0 ? void 0 : _23.ingredient) === null || _24 === void 0 ? true : delete _24.lastModifiedBy;
                            (_26 = (_25 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _25 === void 0 ? void 0 : _25.ingredient) === null || _26 === void 0 ? true : delete _26.createdByName;
                            (_28 = (_27 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _27 === void 0 ? void 0 : _27.ingredient) === null || _28 === void 0 ? true : delete _28.lastModifiedByName;
                            (_30 = (_29 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _29 === void 0 ? void 0 : _29.ingredient) === null || _30 === void 0 ? true : delete _30.userId;
                            (_32 = (_31 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _31 === void 0 ? void 0 : _31.ingredient) === null || _32 === void 0 ? true : delete _32.profileId;
                            (_34 = (_33 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _33 === void 0 ? void 0 : _33.ingredient) === null || _34 === void 0 ? true : delete _34.description;
                            (_36 = (_35 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _35 === void 0 ? void 0 : _35.ingredient) === null || _36 === void 0 ? true : delete _36.images;
                            (_38 = (_37 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _37 === void 0 ? void 0 : _37.ingredient) === null || _38 === void 0 ? true : delete _38.yesterdayEOD;
                            (_40 = (_39 = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _39 === void 0 ? void 0 : _39.ingredient) === null || _40 === void 0 ? true : delete _40.todayEOD;
                        }
                    }
                }
            }
            this.removeNullAndDefaults(item);
            return item;
        };
        this.expand = (item) => {
            this.addDefaults(item);
            return item;
        };
        this.removeNullAndDefaults = (item) => {
            let np = item;
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
                (np === null || np === void 0 ? void 0 : np.type) == 'product' && (np === null || np === void 0 ? true : delete np.type);
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
        this.addDefaults = (item) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            if (item) {
                if ((item === null || item === void 0 ? void 0 : item.createdBy) == "!!") {
                    item.createdBy = item.userId;
                }
                if ((item === null || item === void 0 ? void 0 : item.lastModifiedBy) == "!!") {
                    item.lastModifiedBy = item.userId;
                }
                if ((item === null || item === void 0 ? void 0 : item.createdByName) == "!!") {
                    item.createdByName = "Admin";
                }
                if ((item === null || item === void 0 ? void 0 : item.lastModifiedByName) == "!!") {
                    item.lastModifiedByName = "Admin";
                }
                if (!(item === null || item === void 0 ? void 0 : item.profileId)) {
                    item.profileId = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.itemName)) {
                    item.itemName = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.sellPrice)) {
                    item.sellPrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.purchasePrice)) {
                    item.purchasePrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.category)) {
                    item.category = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.stock)) {
                    item.stock = 0;
                }
                if (!(item === null || item === void 0 ? void 0 : item.type)) {
                    item.type = 'product';
                }
                if (!(item === null || item === void 0 ? void 0 : item.onlineDeliverySellPrice)) {
                    item.onlineDeliverySellPrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.onlineSellPrice)) {
                    item.onlineSellPrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.acSellPrice)) {
                    item.acSellPrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.nonAcSellPrice)) {
                    item.nonAcSellPrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.mrp)) {
                    item.mrp = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.expiryDate)) {
                    item.expiryDate = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.brandName)) {
                    item.brandName = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.wholesalePrice)) {
                    item.wholesalePrice = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.wholesaleMinCutOffQty)) {
                    item.wholesaleMinCutOffQty = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.itemCode)) {
                    item.itemCode = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.barcode)) {
                    item.barcode = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.barcode2)) {
                    item.barcode2 = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.barcode3)) {
                    item.barcode3 = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.barcode4)) {
                    item.barcode4 = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.barcode5)) {
                    item.barcode5 = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.description)) {
                    item.description = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.minStock)) {
                    item.minStock = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.storageLocation)) {
                    item.storageLocation = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.onlineDukanItem)) {
                    item.onlineDukanItem = false;
                }
                if (!(item === null || item === void 0 ? void 0 : item.isTaxExempted)) {
                    item.isTaxExempted = 0;
                }
                if (!(item === null || item === void 0 ? void 0 : item.isTaxZero)) {
                    item.isTaxZero = 0;
                }
                if (!(item === null || item === void 0 ? void 0 : item.taxPercentage)) {
                    item.taxPercentage = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.cessPercentage)) {
                    item.cessPercentage = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.spIncTax)) {
                    item.spIncTax = false;
                }
                if (!(item === null || item === void 0 ? void 0 : item.primaryUnit)) {
                    item.primaryUnit = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.secondaryUnit)) {
                    item.secondaryUnit = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.images)) {
                    item.images = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.hsn)) {
                    item.hsn = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.convertRatio)) {
                    item.convertRatio = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.convertRatioR)) {
                    item.convertRatioR = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.discountFlat)) {
                    item.discountFlat = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.discountPercent)) {
                    item.discountPercent = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.ppIncTax)) {
                    item.ppIncTax = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.itemIngredients)) {
                    item.itemIngredients = null;
                }
                if (!(item === null || item === void 0 ? void 0 : item.isFavourite)) {
                    item.isFavourite = null;
                }
                let itemIngredientsLength = (_a = item === null || item === void 0 ? void 0 : item.itemIngredients) === null || _a === void 0 ? void 0 : _a.length;
                if (itemIngredientsLength) {
                    for (let i = 0; i < itemIngredientsLength; i++) {
                        if (!((_b = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _b === void 0 ? void 0 : _b.quantity)) {
                            item.itemIngredients[i].quantity = null;
                        }
                        ;
                        if ((_c = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _c === void 0 ? void 0 : _c.ingredient) {
                            if (!((_e = (_d = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _d === void 0 ? void 0 : _d.ingredient) === null || _e === void 0 ? void 0 : _e.createdStamp)) {
                                item.itemIngredients[i].ingredient.createdStamp = null;
                            }
                            ;
                            if (!((_g = (_f = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _f === void 0 ? void 0 : _f.ingredient) === null || _g === void 0 ? void 0 : _g.name)) {
                                item.itemIngredients[i].ingredient.name = null;
                            }
                            ;
                            if (!((_j = (_h = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _h === void 0 ? void 0 : _h.ingredient) === null || _j === void 0 ? void 0 : _j.category)) {
                                item.itemIngredients[i].ingredient.category = null;
                            }
                            ;
                            if (!((_l = (_k = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _k === void 0 ? void 0 : _k.ingredient) === null || _l === void 0 ? void 0 : _l.unit)) {
                                item.itemIngredients[i].ingredient.unit = null;
                            }
                            ;
                            if (!((_o = (_m = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _m === void 0 ? void 0 : _m.ingredient) === null || _o === void 0 ? void 0 : _o.stock)) {
                                item.itemIngredients[i].ingredient.stock = null;
                            }
                            ;
                            if (!((_q = (_p = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _p === void 0 ? void 0 : _p.ingredient) === null || _q === void 0 ? void 0 : _q.minStock)) {
                                item.itemIngredients[i].ingredient.minStock = null;
                            }
                            ;
                            if (!((_s = (_r = item === null || item === void 0 ? void 0 : item.itemIngredients[i]) === null || _r === void 0 ? void 0 : _r.ingredient) === null || _s === void 0 ? void 0 : _s.deletedStamp)) {
                                item.itemIngredients[i].ingredient.deletedStamp = null;
                            }
                            ;
                        }
                    }
                }
            }
            return item;
        };
    }
};
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Item.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Item.prototype, "lastModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Item.prototype, "createdByName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Item.prototype, "lastModifiedByName", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-userId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Item.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)("ind-profileId"),
    (0, typeorm_1.Column)({
        length: 50
    }),
    __metadata("design:type", String)
], Item.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Item.prototype, "itemName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "sellPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "onlineDeliverySellPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "onlineSellPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "acSellPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "nonAcSellPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "mrp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Item.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "wholesalePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Item.prototype, "wholesaleMinCutOffQty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "itemCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "barcode2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "barcode3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "barcode4", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "barcode5", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Item.prototype, "minStock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "storageLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true
    }),
    __metadata("design:type", Boolean)
], Item.prototype, "onlineDukanItem", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Item.prototype, "isTaxExempted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        default: 0,
    }),
    __metadata("design:type", Number)
], Item.prototype, "isTaxZero", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "taxPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'double',
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Item.prototype, "cessPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Item.prototype, "spIncTax", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "primaryUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "secondaryUnit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Item.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100
    }),
    __metadata("design:type", String)
], Item.prototype, "hsn", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "convertRatio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "convertRatioR", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "discountFlat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Item.prototype, "discountPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Item.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Item.prototype, "ppIncTax", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Item.prototype, "itemIngredients", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Item.prototype, "isFavourite", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], Item.prototype, "oldFirebaseId", void 0);
Item = __decorate([
    (0, typeorm_1.Entity)({
        name: 'item'
    })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map