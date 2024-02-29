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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateSaleService = void 0;
const typedi_1 = require("typedi");
const SaleService_1 = require("./SaleService");
const ProfileService_1 = require("./ProfileService");
const PartyService_1 = require("./PartyService");
const MoneyInService_1 = require("./MoneyInService");
const Party_1 = require("../models/Party");
const BillCalculations_1 = require("../../lib/BillCalculations");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const MoneyIn_1 = require("../models/MoneyIn");
let GenerateSaleService = class GenerateSaleService {
    constructor(saleService, profileService, partyService, moneyInService) {
        this.saleService = saleService;
        this.profileService = profileService;
        this.partyService = partyService;
        this.moneyInService = moneyInService;
    }
    generateSale(userId, profileId, partyPhone, expBillItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let profile = yield this.profileService.getByUUID(userId, profileId);
                let party = null;
                if (partyPhone) {
                    party = yield this.partyService.getByPartyPhone(userId, profileId, partyPhone);
                    if (!(party === null || party === void 0 ? void 0 : party._localUUID) || (party === null || party === void 0 ? void 0 : party.deletedStamp)) {
                        const newParty = new Party_1.Party();
                        newParty.createdStamp = newParty.updatedStamp = (+new Date() - 100);
                        newParty.deletedStamp = 0;
                        newParty.syncStamp = (+new Date());
                        newParty._localUUID = Utils_1.default.getUUID();
                        newParty.name = partyPhone;
                        newParty.phone = partyPhone;
                        newParty.type = 'Customer';
                        newParty.sendAlerts = false;
                        newParty.profileId = profileId;
                        newParty.userId = userId;
                        newParty.credit = 0;
                        party = yield this.partyService.save(newParty);
                    }
                }
                else {
                    party = yield this.partyService.getCashSaleParty(userId, profileId);
                }
                let billItems = [];
                expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.forEach(expBillItem => {
                    billItems.push(this.expBillItemToBillItem(expBillItem));
                });
                let sale = {
                    "billNo": yield this.saleService.getNewSaleNo(userId, profileId),
                    "billDateStamp": +new Date().setHours(0, 0, 0, 0),
                    "dueDateStamp": null,
                    "billingTerm": null,
                    "party": party,
                    "partySecondary": null,
                    "billItems": billItems,
                    "gstAmount": 0.0,
                    "cessAmount": 0.0,
                    "discountAmount": 0.0,
                    "cashDiscount": null,
                    "cashDiscountPercentage": null,
                    "totalAmount": null,
                    "amountReceived": 0.0,
                    "subTotalAmount": null,
                    "totalSaving": 0.0,
                    "note": null,
                    "isPrintedKOT": false,
                    "roundOffValue": 0.0,
                    "partyPreviousBalance": null,
                    "serviceChargePercentage": null,
                    "serviceChargeAmount": 0.0,
                    "moneyIns": [],
                    "billCompleteStamp": +new Date(),
                    "userId": userId,
                    "profileId": profileId,
                    "lastModifiedBy": userId,
                    "createdBy": userId,
                    "lastModifiedByName": "Admin",
                    "createdByName": "Admin",
                    "_localUUID": Utils_1.default.getUUID(),
                    "userMetaData": [],
                    "createdStamp": +new Date(),
                    "updatedStamp": +new Date(),
                    "deletedStamp": 0,
                    "syncStamp": +new Date() + 2000,
                    "deliveryProvience": null,
                    "senderProvience": null,
                    "additionalDiscount": 0.0,
                    "_id": null,
                    "_serverIdRef": null,
                    "_localId": null,
                    "_is": +new Date(),
                };
                sale = this.calculate(sale, profile);
                sale['profile'] = profile;
                sale.amountReceived = sale.totalAmount;
                let moneyIn = new MoneyIn_1.MoneyIn();
                moneyIn.party = sale.party;
                moneyIn.billDateStamp = sale.billDateStamp;
                moneyIn.totalAmount = sale.amountReceived;
                moneyIn.billNo = yield this.moneyInService.getNewMoneyInNo(userId, profileId),
                    moneyIn.paymentMode = 'cash';
                moneyIn.paymentId = null;
                moneyIn.userId = userId;
                moneyIn.profileId = profileId;
                moneyIn.createdBy = userId;
                moneyIn.lastModifiedBy = userId;
                moneyIn.createdByName = 'Admin';
                moneyIn.lastModifiedByName = 'Admin';
                moneyIn.linkedSaleUUID = sale._localUUID;
                moneyIn._localUUID = Utils_1.default.getUUID();
                moneyIn.createdStamp = +new Date();
                moneyIn.updatedStamp = +new Date();
                moneyIn.deletedStamp = 0;
                moneyIn.syncStamp = +new Date() + 2000;
                sale.moneyIns.push(moneyIn);
                sale = yield this.saleService.save(sale);
                if (sale === null || sale === void 0 ? void 0 : sale._localUUID) {
                    moneyIn = yield this.moneyInService.save(sale.moneyIns[0]);
                }
                //SyncPublish(profileId);
                return sale;
            }
            catch (error) {
                return error;
            }
        });
    }
    expBillItemToBillItem(expBillItem) {
        return {
            item: {
                itemName: expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.name,
                sellPrice: expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.rate,
            },
            quantity: expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.quantity,
            effectiveQuantity: 0,
            unit: null,
            convertRatioMultiplier: 1.0,
            price: (expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.rate) || 0.0,
            effectivePrice: (expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.rate) || 0.0,
            effectiveMrp: null,
            discount: null,
            discountPercentage: 0.0,
            billCashDiscountPercentage: null,
            effectiveDiscountPercentage: null,
            incTax: true,
            taxPercentage: (expBillItem === null || expBillItem === void 0 ? void 0 : expBillItem.tax) || 0.0,
            cessPercentage: 0.0,
            isTaxExempted: 0,
            isTaxZero: 0,
            effectiveTaxPercentage: null,
            basePrice: null,
            subTotal: null,
            total: null,
            totalSaving: null,
            billNote: null,
            kotNote: null,
            unitDiscountAmount: null,
            unitGstAmount: null,
            unitCessAmount: null,
            unitTaxAmount: null,
            itemTotalGstAmount: null,
            itemTotalCessAmount: null,
            itemTotalTaxAmount: null,
            wcdBasePrice: null,
            wcdUnitTaxAmount: null,
            wcdTotal: null,
        };
    }
    calculate(sale, profile) {
        let cashDiscountAmount = 0.0;
        let cashDiscountPercentage = 0.0;
        let serviceChargeAmount = 0.0;
        let serviceChargePercentage = 0.0;
        let unitDiscountAmountTotal = 0.0;
        let unitGstAmountTotal = 0.0;
        let unitCessAmountTotal = 0.0;
        let unitTaxAmountTotal = 0.0;
        let unitSubTotalAmountTotal = 0.0;
        let unitTotalAmountTotal = 0.0;
        let unitTotalSavingAmountTotal = 0.0;
        let billItemsTotal = 0.0;
        let wcdBillItemsTotal = 0.0;
        function calculateSubTotalAmount() {
            unitDiscountAmountTotal = 0.0;
            unitGstAmountTotal = 0.0;
            unitCessAmountTotal = 0.0;
            unitTaxAmountTotal = 0.0;
            unitSubTotalAmountTotal = 0.0;
            unitTotalAmountTotal = 0.0;
            unitTotalSavingAmountTotal = 0.0;
            billItemsTotal = 0.0;
            wcdBillItemsTotal = 0.0;
            let billItems = (sale === null || sale === void 0 ? void 0 : sale.billItems) || [];
            billItems === null || billItems === void 0 ? void 0 : billItems.forEach(billItem => {
                unitDiscountAmountTotal += billItem.unitDiscountAmount || 0.0;
                unitGstAmountTotal += billItem.itemTotalGstAmount || 0.0;
                unitCessAmountTotal += billItem.itemTotalCessAmount || 0.0;
                unitTaxAmountTotal += billItem.itemTotalTaxAmount || 0.0;
                unitSubTotalAmountTotal += billItem.subTotal || 0.0;
                unitTotalAmountTotal += billItem.total || 0.0;
                unitTotalSavingAmountTotal += billItem.totalSaving || 0.0;
                billItemsTotal += billItem.total || 0.0;
                wcdBillItemsTotal += billItem.wcdTotal || 0.0;
            });
            sale.discountAmount = unitDiscountAmountTotal;
            sale.gstAmount = unitGstAmountTotal;
            sale.cessAmount = unitCessAmountTotal;
            sale.subTotalAmount = unitSubTotalAmountTotal;
            sale.totalSaving = unitTotalSavingAmountTotal;
            calculateServiceCharge(BillCalculations_1.CalculateBillTask.SERVICE_CHARGE_FROM_PERCENTAGE);
            calculateTotalAmount();
        }
        function calculateCashDiscount(task = BillCalculations_1.CalculateBillTask.CALCULATE) {
            cashDiscountAmount = 0.0;
            cashDiscountPercentage = 0.0;
            if (task == BillCalculations_1.CalculateBillTask.DISCOUNT_FROM_PERCENTAGE) {
                cashDiscountPercentage = sale.cashDiscountPercentage;
                if (wcdBillItemsTotal > 0) {
                    cashDiscountAmount = Utils_1.default.capFractionsToSix(wcdBillItemsTotal * cashDiscountPercentage / 100);
                }
                sale.cashDiscount = cashDiscountAmount;
            }
            else if (task == BillCalculations_1.CalculateBillTask.DISCOUNT_FROM_AMOUNT) {
                cashDiscountAmount = sale.cashDiscount;
                if (wcdBillItemsTotal > 0) {
                    cashDiscountPercentage = Utils_1.default.capFractionsToSix((cashDiscountAmount * 100) / wcdBillItemsTotal);
                }
                sale.cashDiscountPercentage = cashDiscountPercentage;
            }
            if (cashDiscountAmount > wcdBillItemsTotal || cashDiscountAmount < 0) {
                cashDiscountAmount = 0.0;
                cashDiscountPercentage = 0.0;
                sale.cashDiscount = null;
                sale.cashDiscountPercentage = null;
            }
            recalculateBillItems();
        }
        function calculateServiceCharge(task = BillCalculations_1.CalculateBillTask.CALCULATE) {
            serviceChargeAmount = 0.0;
            serviceChargePercentage = 0.0;
            if (task == BillCalculations_1.CalculateBillTask.SERVICE_CHARGE_FROM_PERCENTAGE) {
                serviceChargePercentage = sale.serviceChargePercentage;
                if (unitSubTotalAmountTotal > 0) {
                    serviceChargeAmount = Utils_1.default.capFractionsToSix(unitSubTotalAmountTotal * serviceChargePercentage / 100);
                }
                sale.serviceChargeAmount = serviceChargeAmount;
            }
            else if (task == BillCalculations_1.CalculateBillTask.SERVICE_CHARGE_FROM_AMOUNT) {
                serviceChargeAmount = sale.serviceChargeAmount;
                if (unitSubTotalAmountTotal > 0) {
                    serviceChargePercentage = Utils_1.default.capFractionsToSix((serviceChargeAmount * 100) / unitSubTotalAmountTotal);
                }
                sale.serviceChargePercentage = serviceChargePercentage;
            }
            if (cashDiscountAmount < 0) {
                cashDiscountAmount = 0.0;
                cashDiscountPercentage = 0.0;
                sale.cashDiscount = null;
                sale.cashDiscountPercentage = null;
            }
        }
        function calculateTotalAmount() {
            var _a;
            let additionalCharges = ((_a = sale.transportDetail) === null || _a === void 0 ? void 0 : _a.additionalAmount) || 0;
            if (!Utils_1.default.isNumber(additionalCharges)) {
                additionalCharges = 0.0;
            }
            let serviceChargeAmount = sale.serviceChargeAmount || 0;
            if (!Utils_1.default.isNumber(serviceChargeAmount)) {
                serviceChargeAmount = 0.0;
            }
            let totalAmount = unitTotalAmountTotal + Number(additionalCharges) + Number(serviceChargeAmount);
            totalAmount = Utils_1.default.capFractionsToSix(totalAmount);
            let roundOffValue = 0.0;
            if (profile === null || profile === void 0 ? void 0 : profile.iSetRoundOffTotalAmountStatus) {
                let floorDelta = (totalAmount || 0.0) - Math.floor(totalAmount || 0.0);
                let ceilDelta = Math.ceil(totalAmount || 0.0) - (totalAmount || 0.0);
                if (floorDelta > ceilDelta) {
                    roundOffValue = ceilDelta;
                }
                else {
                    roundOffValue = floorDelta * -1;
                }
                roundOffValue = Utils_1.default.capFractionsToSix(roundOffValue);
                totalAmount = Math.round(totalAmount + roundOffValue);
            }
            sale.totalAmount = totalAmount;
            sale.roundOffValue = roundOffValue;
        }
        function calculateAdditionalDiscount() {
            var _a, _b;
            let isValid = false;
            if (sale.partySecondary && (profile === null || profile === void 0 ? void 0 : profile.dSetDiscountStatusII)) {
                let discountPercent = profile === null || profile === void 0 ? void 0 : profile.dSetDiscountPercentII;
                let discountMaximumAmount = profile === null || profile === void 0 ? void 0 : profile.dSetDiscountMaximumAmountII;
                let discountMinimumAmount = profile === null || profile === void 0 ? void 0 : profile.dSetDiscountMinimumAmountII;
                if (((profile === null || profile === void 0 ? void 0 : profile.dSetDiscountOfferTypeII) || 0) == 0) {
                    isValid = true;
                }
                else if ((profile === null || profile === void 0 ? void 0 : profile.dSetDiscountOfferTypeII) == 1) {
                    // TODO Change minute to days before release
                    let discountExpiryStamp = (profile === null || profile === void 0 ? void 0 : profile.dSetDiscountExpiryDaysII) * 60000;
                    let lastSaleStamp = ((_a = sale.partySecondary) === null || _a === void 0 ? void 0 : _a.lastSaleStamp) || 0;
                    if (lastSaleStamp > 0 && discountExpiryStamp > 0) {
                        if ((lastSaleStamp + discountExpiryStamp) > +new Date()) {
                            isValid = true;
                        }
                    }
                }
                let additionalDiscountAmount = 0.0;
                if (isValid && discountMinimumAmount <= unitTotalAmountTotal) {
                    additionalDiscountAmount = (unitTotalAmountTotal / 100) * discountPercent;
                    if (discountMaximumAmount && additionalDiscountAmount > discountMaximumAmount) {
                        additionalDiscountAmount = discountMaximumAmount;
                    }
                }
                cashDiscountAmount = 0.0;
                cashDiscountPercentage = 0.0;
                cashDiscountAmount = additionalDiscountAmount;
                sale.cashDiscount = cashDiscountAmount;
                sale.cashDiscountPercentage = null;
                calculateCashDiscount(BillCalculations_1.CalculateBillTask.DISCOUNT_FROM_AMOUNT);
            }
            if (isValid == false && sale.partySecondary != null && (profile === null || profile === void 0 ? void 0 : profile.dSetDiscountStatusI)) {
                let discountPercent = profile === null || profile === void 0 ? void 0 : profile.dSetDiscountPercentI;
                let discountMaximumAmount = profile === null || profile === void 0 ? void 0 : profile.dSetDiscountMaximumAmountI;
                let discountMinimumAmount = profile === null || profile === void 0 ? void 0 : profile.dSetDiscountMinimumAmountI;
                if (((profile === null || profile === void 0 ? void 0 : profile.dSetDiscountOfferTypeI) || 0) == 0) {
                    isValid = true;
                }
                else if ((profile === null || profile === void 0 ? void 0 : profile.dSetDiscountOfferTypeI) == 1) {
                    // TODO Change minute to days before release
                    let discountExpiryStamp = (profile === null || profile === void 0 ? void 0 : profile.dSetDiscountExpiryDaysI) * 60000;
                    let lastSaleStamp = ((_b = sale.partySecondary) === null || _b === void 0 ? void 0 : _b.lastSaleStamp) || 0;
                    if (lastSaleStamp > 0 && discountExpiryStamp > 0) {
                        if ((lastSaleStamp + discountExpiryStamp) > +new Date()) {
                            isValid = true;
                        }
                    }
                }
                let additionalDiscountAmount = 0.0;
                if (isValid && discountMinimumAmount <= unitTotalAmountTotal) {
                    additionalDiscountAmount = (unitTotalAmountTotal / 100) * discountPercent;
                    if (discountMaximumAmount && additionalDiscountAmount > discountMaximumAmount) {
                        additionalDiscountAmount = discountMaximumAmount;
                    }
                }
                cashDiscountAmount = 0.0;
                cashDiscountPercentage = 0.0;
                cashDiscountAmount = additionalDiscountAmount;
                sale.cashDiscount = cashDiscountAmount;
                sale.cashDiscountPercentage = null;
                calculateCashDiscount(BillCalculations_1.CalculateBillTask.DISCOUNT_FROM_AMOUNT);
            }
        }
        function recalculateBillItems() {
            let billItems = sale.billItems;
            billItems === null || billItems === void 0 ? void 0 : billItems.forEach(billItem => {
                BillCalculations_1.BillCalculations.calculateBillItem(billItem, BillCalculations_1.BillType.SALE, null, sale.cashDiscountPercentage);
            });
            sale.billItems = billItems;
            calculateSubTotalAmount();
        }
        recalculateBillItems();
        return sale;
    }
};
GenerateSaleService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [SaleService_1.SaleService,
        ProfileService_1.ProfileService,
        PartyService_1.PartyService,
        MoneyInService_1.MoneyInService])
], GenerateSaleService);
exports.GenerateSaleService = GenerateSaleService;
//# sourceMappingURL=GenearteSaleService.js.map