"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillCalculations = exports.CalculateBillTask = exports.CalculateBillItemTask = exports.BillingType = exports.BillType = void 0;
const Utils_1 = __importDefault(require("./Utils"));
var BillType;
(function (BillType) {
    BillType["ESTIMATE"] = "ESTIMATE";
    BillType["SALE"] = "SALE";
    BillType["PURCHASE"] = "PURCHASE";
})(BillType = exports.BillType || (exports.BillType = {}));
var BillingType;
(function (BillingType) {
    BillingType["OnlineDeliverySellPrice"] = "OnlineDeliverySellPrice";
    BillingType["AcSellPrice"] = "AcSellPrice";
    BillingType["NonAcSellPrice"] = "NonAcSellPrice";
    BillingType["SellPrice"] = "SellPrice";
})(BillingType = exports.BillingType || (exports.BillingType = {}));
var CalculateBillItemTask;
(function (CalculateBillItemTask) {
    CalculateBillItemTask["CALCULATE"] = "CALCULATE";
    CalculateBillItemTask["DISCOUNT_FROM_AMOUNT"] = "DISCOUNT_FROM_AMOUNT";
    CalculateBillItemTask["QUANTITY_FROM_TOTAL"] = "QUANTITY_FROM_TOTAL";
})(CalculateBillItemTask = exports.CalculateBillItemTask || (exports.CalculateBillItemTask = {}));
var CalculateBillTask;
(function (CalculateBillTask) {
    CalculateBillTask["CALCULATE"] = "CALCULATE";
    CalculateBillTask["DISCOUNT_FROM_AMOUNT"] = "DISCOUNT_FROM_AMOUNT";
    CalculateBillTask["DISCOUNT_FROM_PERCENTAGE"] = "DISCOUNT_FROM_PERCENTAGE";
    CalculateBillTask["SERVICE_CHARGE_FROM_AMOUNT"] = "SERVICE_CHARGE_FROM_AMOUNT";
    CalculateBillTask["SERVICE_CHARGE_FROM_PERCENTAGE"] = "SERVICE_CHARGE_FROM_PERCENTAGE";
})(CalculateBillTask = exports.CalculateBillTask || (exports.CalculateBillTask = {}));
class BillCalculations {
    static calculateBillItem(billItem, billType, billingType, masterBillCashDiscountPercentage, task = CalculateBillItemTask.CALCULATE) {
        billItem.effectiveTaxPercentage = this.calculateEffectiveTaxPercentage(billItem);
        billItem.effectiveQuantity = this.calculateEffectiveQuantity(billItem);
        billItem.effectivePrice = this.calculateEffectivePrice(billItem);
        billItem.effectiveMrp = this.calculateEffectiveMrp(billItem);
        if (task == CalculateBillItemTask.DISCOUNT_FROM_AMOUNT) {
            billItem.discountPercentage = this.calculateDiscountPercentageFromAmount(billItem);
        }
        billItem.discount = this.calculateDiscount(billItem);
        if ((billItem.discountPercentage || 0.0) > 100.0) {
            billItem.discountPercentage = 0.0;
            billItem.discount = 0.0;
        }
        billItem.billCashDiscountPercentage = this.calculateBillCashDiscountPercentageForItem(billItem, masterBillCashDiscountPercentage);
        billItem.effectiveDiscountPercentage = this.calculateEffectiveDiscountPercentage(billItem);
        if ((billItem.effectiveDiscountPercentage || 0.0) > 100.0) {
            billItem.effectiveDiscountPercentage = 0.0;
        }
        billItem.basePrice = this.calculateBasePrice(billItem);
        billItem.unitDiscountAmount = this.calculateEffectiveDiscount(billItem);
        billItem.unitGstAmount = this.calculateUnitGstAmount(billItem);
        billItem.unitCessAmount = this.calculateUnitCessAmount(billItem);
        billItem.unitTaxAmount = this.calculateUnitTaxAmount(billItem);
        billItem.itemTotalGstAmount = this.calculateItemTotalGstAmount(billItem);
        billItem.itemTotalCessAmount = this.calculateItemTotalCessAmount(billItem);
        billItem.itemTotalTaxAmount = this.calculateItemTotalTaxAmount(billItem);
        if (task == CalculateBillItemTask.QUANTITY_FROM_TOTAL) {
            billItem.quantity = this.calculateReversQuantity(billItem);
        }
        billItem.subTotal = this.calculateSubTotal(billItem);
        billItem.total = this.calculateTotal(billItem);
        billItem.totalSaving = this.calculateTotalSaving(billItem);
        billItem.wcdBasePrice = this.calculateWcdBasePrice(billItem);
        billItem.wcdUnitTaxAmount = this.calculateWcdUnitTaxAmount(billItem);
        billItem.wcdTotal = this.calculateWcdTotal(billItem);
        return billItem;
    }
    static calculateEffectiveTaxPercentage(billItem) {
        return (billItem.taxPercentage || 0.0) + (billItem.cessPercentage || 0.0);
    }
    static calculateEffectiveQuantity(billItem) {
        const number = (billItem.quantity || 1.0) / (billItem.convertRatioMultiplier || 1.0);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculatePrice(billItem) {
        const number = (billItem.price || 0.0) * (1 / (billItem.convertRatioMultiplier || 1.0));
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateEffectivePrice(billItem) {
        if (billItem.incTax == true) {
            return billItem.price || 0.0;
        }
        else {
            return (billItem.price || 0.0) * (1 + ((billItem.effectiveTaxPercentage || 0.0) / 100));
        }
    }
    static calculateEffectiveMrp(billItem) {
        var _a, _b, _c, _d;
        let number = 0.0;
        if (billItem.convertRatioMultiplier == 1.0) {
            if ((((_a = billItem.item) === null || _a === void 0 ? void 0 : _a.mrp) || 0.0) > (billItem.effectivePrice || 0.0)) {
                number = ((_b = billItem.item) === null || _b === void 0 ? void 0 : _b.mrp) || 0.0;
            }
            else {
                number = billItem.effectivePrice || 0.0;
            }
        }
        else {
            if (((((_c = billItem.item) === null || _c === void 0 ? void 0 : _c.mrp) || 0.0) * (1 / (billItem.convertRatioMultiplier || 1.0))) > (billItem.effectivePrice || 0.0)) {
                number = (((_d = billItem.item) === null || _d === void 0 ? void 0 : _d.mrp) || 0.0) * (1 / (billItem.convertRatioMultiplier || 1.0));
            }
            else {
                number = billItem.effectivePrice || 0.0;
            }
        }
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateDiscountPercentageFromAmount(billItem) {
        const number = ((billItem.discount || 0.0) * 100) / (billItem.price || 0.0);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateDiscount(billItem) {
        const number = ((billItem.discountPercentage || 0.0) * (billItem.price || 0.0)) / 100;
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateBillCashDiscountPercentageForItem(billItem, masterBillCashDiscountPercentage) {
        const number = ((100 - (billItem.discountPercentage || 0.0)) * (masterBillCashDiscountPercentage)) / 100;
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateEffectiveDiscountPercentage(billItem) {
        return (billItem.discountPercentage || 0.0) + (billItem.billCashDiscountPercentage || 0.0);
    }
    static calculateBasePrice(billItem) {
        let number = 0.0;
        if (billItem.incTax == true) {
            number = (((billItem.price || 0.0) * ((100 - (billItem.effectiveDiscountPercentage || 0.0)) / 100)) / (100 + (billItem.effectiveTaxPercentage || 0.0))) * 100;
        }
        else {
            number = ((billItem.price || 0.0) * ((100 - (billItem.effectiveDiscountPercentage || 0.0)) / 100));
        }
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateEffectiveDiscount(billItem) {
        let number = 0.0;
        if ((billItem.effectiveDiscountPercentage || 0.0) < 100.0) {
            number = ((billItem.basePrice || 0.0) * (billItem.effectiveDiscountPercentage || 0.0)) / (100 - (billItem.effectiveDiscountPercentage || 0.0));
        }
        else {
            number = 0.0;
        }
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateUnitGstAmount(billItem) {
        const number = (billItem.basePrice || 0.0) * ((billItem.taxPercentage || 0.0) / 100);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateUnitCessAmount(billItem) {
        const number = (billItem.basePrice || 0.0) * ((billItem.cessPercentage || 0.0) / 100);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateUnitTaxAmount(billItem) {
        const number = (billItem.basePrice || 0.0) * ((billItem.effectiveTaxPercentage || 0.0) / 100);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateItemTotalGstAmount(billItem) {
        const number = (billItem.unitGstAmount || 0.0) * (billItem.quantity || 0.0);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateItemTotalCessAmount(billItem) {
        const number = (billItem.unitCessAmount || 0.0) * (billItem.quantity || 0.0);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateItemTotalTaxAmount(billItem) {
        const number = (billItem.unitTaxAmount || 0.0) * (billItem.quantity || 0.0);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateReversQuantity(billItem) {
        const number = (billItem.total || 0.0) / Utils_1.default.capFractionsToSix((billItem.basePrice || 0.0) + (billItem.unitTaxAmount || 0.0));
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateSubTotal(billItem) {
        let number = 0.0;
        if (billItem.incTax == true) {
            number = ((billItem.price || 0.0) / (100 + (billItem.effectiveTaxPercentage || 0.0))) * 100;
        }
        else {
            number = billItem.price || 0.0;
        }
        number = Utils_1.default.capFractionsToSix(number);
        return number * (billItem.quantity || 0.0);
    }
    static calculateTotal(billItem) {
        const number = ((billItem.basePrice || 0.0) + (billItem.unitTaxAmount || 0.0)) * (billItem.quantity || 0.0);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateTotalSaving(billItem) {
        return ((billItem.effectiveMrp || 0.0) * (billItem.quantity || 0.0)) - (billItem.total || 0.0);
    }
    static calculateWcdBasePrice(billItem) {
        let number = 0.0;
        if (billItem.incTax == true) {
            number = (((billItem.price || 0.0) * ((100 - (billItem.discountPercentage || 0.0)) / 100)) / (100 + (billItem.effectiveTaxPercentage || 0.0))) * 100;
        }
        else {
            number = ((billItem.price || 0.0) * ((100 - (billItem.discountPercentage || 0.0)) / 100));
        }
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateWcdUnitTaxAmount(billItem) {
        const number = (billItem.wcdBasePrice || 0.0) * ((billItem.effectiveTaxPercentage || 0.0) / 100);
        return Utils_1.default.capFractionsToSix(number);
    }
    static calculateWcdTotal(billItem) {
        return ((billItem.wcdBasePrice || 0.0) + (billItem.wcdUnitTaxAmount || 0.0)) * (billItem.quantity || 0.0);
    }
}
exports.BillCalculations = BillCalculations;
//# sourceMappingURL=BillCalculations.js.map