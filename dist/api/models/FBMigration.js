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
exports.FBPurchase = exports.FBItemCategory = exports.FBPartyCategory = exports.FBParty = exports.FBMoneyOut = exports.FBMoneyIn = exports.FBItem = exports.FBInvoice = void 0;
const typeorm_1 = require("typeorm");
let FBInvoice = class FBInvoice {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBInvoice.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBInvoice.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBInvoice.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBInvoice.prototype, "data", void 0);
FBInvoice = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbInvoice'
    })
], FBInvoice);
exports.FBInvoice = FBInvoice;
let FBItem = class FBItem {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBItem.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBItem.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBItem.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBItem.prototype, "data", void 0);
FBItem = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbItem'
    })
], FBItem);
exports.FBItem = FBItem;
let FBMoneyIn = class FBMoneyIn {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBMoneyIn.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBMoneyIn.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBMoneyIn.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBMoneyIn.prototype, "data", void 0);
FBMoneyIn = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbMoneyIn'
    })
], FBMoneyIn);
exports.FBMoneyIn = FBMoneyIn;
let FBMoneyOut = class FBMoneyOut {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBMoneyOut.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBMoneyOut.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBMoneyOut.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBMoneyOut.prototype, "data", void 0);
FBMoneyOut = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbMoneyOut'
    })
], FBMoneyOut);
exports.FBMoneyOut = FBMoneyOut;
let FBParty = class FBParty {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBParty.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBParty.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBParty.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBParty.prototype, "data", void 0);
FBParty = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbParty'
    })
], FBParty);
exports.FBParty = FBParty;
let FBPartyCategory = class FBPartyCategory {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBPartyCategory.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBPartyCategory.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBPartyCategory.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBPartyCategory.prototype, "data", void 0);
FBPartyCategory = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbPartyCategory'
    })
], FBPartyCategory);
exports.FBPartyCategory = FBPartyCategory;
let FBItemCategory = class FBItemCategory {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBItemCategory.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBItemCategory.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBItemCategory.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBItemCategory.prototype, "data", void 0);
FBItemCategory = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbItemCategory'
    })
], FBItemCategory);
exports.FBItemCategory = FBItemCategory;
let FBPurchase = class FBPurchase {
};
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", typeorm_1.ObjectID)
], FBPurchase.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500
    }),
    __metadata("design:type", String)
], FBPurchase.prototype, "localId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        default: null,
    }),
    __metadata("design:type", String)
], FBPurchase.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Object)
], FBPurchase.prototype, "data", void 0);
FBPurchase = __decorate([
    (0, typeorm_1.Entity)({
        name: 'fbPurchase'
    })
], FBPurchase);
exports.FBPurchase = FBPurchase;
//# sourceMappingURL=FBMigration.js.map