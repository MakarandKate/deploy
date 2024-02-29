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
exports.ReportService = void 0;
const ItemStockAdjustRepo_1 = require("./../repos/ItemStockAdjustRepo");
const typedi_1 = require("typedi");
const PartyRepo_1 = require("../repos/PartyRepo");
const ItemRepo_1 = require("../repos/ItemRepo");
const PartyCategoryRepo_1 = require("../repos/PartyCategoryRepo");
const ItemCategoryRepo_1 = require("../repos/ItemCategoryRepo");
const MoneyInRepo_1 = require("../repos/MoneyInRepo");
const MoneyOutRepo_1 = require("../repos/MoneyOutRepo");
const SaleRepo_1 = require("../repos/SaleRepo");
const PurchaseRepo_1 = require("../repos/PurchaseRepo");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const Sale_1 = require("../models/Sale");
const ProfileRepo_1 = require("../repos/ProfileRepo");
const ImageRepo_1 = require("../repos/ImageRepo");
const SaleRepository_1 = require("../repositories/SaleRepository");
const PurchaseRepository_1 = require("../repositories/PurchaseRepository");
const MoneyInRepository_1 = require("../repositories/MoneyInRepository");
const MoneyOutRepository_1 = require("../repositories/MoneyOutRepository");
const lib_1 = require("@makarandkate/ezo-connect-wa/lib");
const whatsapp_1 = require("@makarandkate/ezo-connect-wa/lib/whatsapp");
const UserRepository_1 = require("../repositories/UserRepository");
const ProfileRepository_1 = require("../repositories/ProfileRepository");
const ns = new Sale_1.Sale();
let ReportService = class ReportService {
    constructor(partyRepo, itemRepo, moneyInRepo, moneyOutRepo, saleRepo, purchaseRepo, itemStockAdjustRepo, partyCategoryRepo, itemCategoryRepo, profileRepo, imageRepo) {
        this.partyRepo = partyRepo;
        this.itemRepo = itemRepo;
        this.moneyInRepo = moneyInRepo;
        this.moneyOutRepo = moneyOutRepo;
        this.saleRepo = saleRepo;
        this.purchaseRepo = purchaseRepo;
        this.itemStockAdjustRepo = itemStockAdjustRepo;
        this.partyCategoryRepo = partyCategoryRepo;
        this.itemCategoryRepo = itemCategoryRepo;
        this.profileRepo = profileRepo;
        this.imageRepo = imageRepo;
    }
    getProfile(phone, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let profile = yield this.profileRepo.getByUUID(phone, profileId);
            if (profile === null || profile === void 0 ? void 0 : profile.logoLink) {
                let image = yield this.imageRepo.getByUUID(phone, profileId, profile.logoLink);
                if (image.imageBase64) {
                    profile.logoLink = image.imageBase64;
                }
            }
            return profile;
        });
    }
    getSaleReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let saleReportData = null;
                    saleReportData = {
                        sales: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalSalesQuantity: 0,
                        totalSalesAmount: 0,
                    };
                    const sales = yield this.saleRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                    sales === null || sales === void 0 ? void 0 : sales.forEach(sale => {
                        var _a;
                        let totalBillItemQuantity = 0;
                        (_a = sale.billItems) === null || _a === void 0 ? void 0 : _a.forEach(billItem => {
                            totalBillItemQuantity += Number(billItem.quantity);
                        });
                        saleReportData.totalSalesQuantity += totalBillItemQuantity;
                        saleReportData.totalSalesAmount += sale.totalAmount;
                        saleReportData.sales.push({
                            sale,
                            totalBillItemQuantity,
                            totalTax: sale.gstAmount + sale.cessAmount
                        });
                    });
                    return resolve(saleReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getSaleWisePnlReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let saleWisePnlReportData = null;
                    saleWisePnlReportData = {
                        sales: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalSalesAmount: 0,
                        totalPurchasesAmount: 0,
                        totalSalesProfit: 0,
                    };
                    const sales = yield this.saleRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                    sales === null || sales === void 0 ? void 0 : sales.forEach(sale => {
                        var _a;
                        let totalPurchaseAmount = 0;
                        let purchaseAmountNote = null;
                        (_a = sale.billItems) === null || _a === void 0 ? void 0 : _a.forEach(billItem => {
                            totalPurchaseAmount += (Number(billItem.item.purchasePrice || 0) * (billItem === null || billItem === void 0 ? void 0 : billItem.quantity));
                            if (Number(billItem.item.purchasePrice || 0) <= 0) {
                                purchaseAmountNote = 'One or more items in this bill have 0 purchase amount';
                            }
                        });
                        saleWisePnlReportData.totalPurchasesAmount += totalPurchaseAmount;
                        saleWisePnlReportData.totalSalesAmount += (sale === null || sale === void 0 ? void 0 : sale.totalAmount) || 0;
                        saleWisePnlReportData.sales.push({
                            sale,
                            totalPurchaseAmount,
                            totalSaleProfit: ((sale === null || sale === void 0 ? void 0 : sale.totalAmount) || 0) - totalPurchaseAmount,
                            purchaseAmountNote,
                        });
                    });
                    saleWisePnlReportData.totalSalesProfit = saleWisePnlReportData.totalSalesAmount - saleWisePnlReportData.totalPurchasesAmount;
                    return resolve(saleWisePnlReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getPurchaseReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let purchaseReportData = null;
                    purchaseReportData = {
                        purchases: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalPurchasesQuantity: 0,
                        totalPurchasesAmount: 0,
                    };
                    const purchases = yield this.purchaseRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                    purchases === null || purchases === void 0 ? void 0 : purchases.forEach(purchase => {
                        var _a;
                        let totalBillItemQuantity = 0;
                        (_a = purchase.billItems) === null || _a === void 0 ? void 0 : _a.forEach(billItem => {
                            totalBillItemQuantity += billItem.quantity;
                        });
                        purchaseReportData.totalPurchasesQuantity += totalBillItemQuantity;
                        purchaseReportData.totalPurchasesAmount += purchase.totalAmount;
                        purchaseReportData.purchases.push({
                            purchase,
                            totalBillItemQuantity,
                            totalTax: purchase.gstAmount + purchase.cessAmount
                        });
                    });
                    return resolve(purchaseReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getMoneyInReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let moneyInReportData = null;
                    moneyInReportData = {
                        moneyIns: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalMoneyInsAmount: 0,
                    };
                    const moneyIns = yield this.moneyInRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                    moneyIns === null || moneyIns === void 0 ? void 0 : moneyIns.forEach(moneyIn => {
                        moneyInReportData.totalMoneyInsAmount += Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount);
                        moneyInReportData.moneyIns.push({ moneyIn });
                    });
                    return resolve(moneyInReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getMoneyOutReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let moneyOutReportData = null;
                    moneyOutReportData = {
                        moneyOuts: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalMoneyOutsAmount: 0,
                    };
                    const moneyOuts = yield this.moneyOutRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                    moneyOuts === null || moneyOuts === void 0 ? void 0 : moneyOuts.forEach(moneyOut => {
                        moneyOutReportData.totalMoneyOutsAmount += Number(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount);
                        moneyOutReportData.moneyOuts.push({ moneyOut });
                    });
                    return resolve(moneyOutReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getPartyReportData(phone, profileId, startStamp, endStamp, partyUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (partyUUID) {
                    try {
                        let partyReportData = null;
                        partyReportData = {
                            party: null,
                            records: [],
                            startTime: `${Utils_1.default.dateToDDMMYYY(startStamp)}`,
                            endTime: `${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                            totalSalesAmount: 0,
                            totalMoneyInsAmount: 0,
                            totalPurchasesAmount: 0,
                            totalMoneyOutsAmount: 0,
                        };
                        let party = yield this.partyRepo.getByUUID(phone, profileId, partyUUID);
                        let sales = yield this.saleRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                        let moneyIns = yield this.moneyInRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                        let purchases = yield this.purchaseRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                        let moneyOuts = yield this.moneyOutRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                        // Note - Add in future -  saleReturn, purchaseReturn & expense
                        partyReportData.party = party;
                        sales === null || sales === void 0 ? void 0 : sales.forEach(sale => {
                            var _a;
                            if (((_a = sale === null || sale === void 0 ? void 0 : sale.party) === null || _a === void 0 ? void 0 : _a._localUUID) === partyUUID) {
                                partyReportData.records.push({
                                    txnType: 'Sale',
                                    record: sale,
                                });
                                partyReportData.totalSalesAmount += Number(sale === null || sale === void 0 ? void 0 : sale.totalAmount);
                            }
                        });
                        moneyIns === null || moneyIns === void 0 ? void 0 : moneyIns.forEach(moneyIn => {
                            var _a;
                            if (((_a = moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.party) === null || _a === void 0 ? void 0 : _a._localUUID) === partyUUID) {
                                partyReportData.records.push({
                                    txnType: 'Money In',
                                    record: moneyIn,
                                });
                                partyReportData.totalMoneyInsAmount += Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount);
                            }
                        });
                        purchases === null || purchases === void 0 ? void 0 : purchases.forEach(purchase => {
                            var _a;
                            if (((_a = purchase === null || purchase === void 0 ? void 0 : purchase.party) === null || _a === void 0 ? void 0 : _a._localUUID) === partyUUID) {
                                partyReportData.records.push({
                                    txnType: 'Purchase',
                                    record: purchase,
                                });
                                partyReportData.totalPurchasesAmount += Number(purchase === null || purchase === void 0 ? void 0 : purchase.totalAmount);
                            }
                        });
                        moneyOuts === null || moneyOuts === void 0 ? void 0 : moneyOuts.forEach(moneyOut => {
                            var _a;
                            if (((_a = moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.party) === null || _a === void 0 ? void 0 : _a._localUUID) === partyUUID) {
                                partyReportData.records.push({
                                    txnType: 'Money Out',
                                    record: moneyOut,
                                });
                                partyReportData.totalMoneyOutsAmount += Number(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount);
                            }
                        });
                        (_a = partyReportData.records) === null || _a === void 0 ? void 0 : _a.sort((a, b) => {
                            if (b.record.billDateStamp == a.record.billDateStamp) {
                                return b.record.createdStamp - a.record.createdStamp;
                            }
                            return b.record.billDateStamp - a.record.billDateStamp;
                        });
                        return resolve(partyReportData);
                    }
                    catch (error) {
                        return resolve(null);
                    }
                }
                else {
                    return resolve(null);
                }
            }));
        });
    }
    getPartyReceivablePayableReportData(phone, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let partyReceivablePayableReportData = null;
                    partyReceivablePayableReportData = {
                        customerRecords: [],
                        supplierRecords: [],
                        totalPayableAmount: 0,
                        totalReceivableAmount: 0,
                    };
                    let parties = yield this.partyRepo.getAllByPromise(phone, profileId);
                    parties === null || parties === void 0 ? void 0 : parties.forEach(party => {
                        let payableAmount = 0;
                        let receivableAmount = 0;
                        if (Number(party.credit) < 0) {
                            payableAmount = Number(party.credit) * -1;
                        }
                        else {
                            receivableAmount = Number(party.credit);
                        }
                        if (payableAmount || receivableAmount) {
                            if (party.type === 'Customer') {
                                partyReceivablePayableReportData.customerRecords.push({
                                    party,
                                    payableAmount,
                                    receivableAmount
                                });
                            }
                            else {
                                partyReceivablePayableReportData.supplierRecords.push({
                                    party,
                                    payableAmount,
                                    receivableAmount
                                });
                            }
                        }
                        partyReceivablePayableReportData.totalPayableAmount += payableAmount;
                        partyReceivablePayableReportData.totalReceivableAmount += receivableAmount;
                    });
                    return resolve(partyReceivablePayableReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getStockSummaryReportData(phone, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let stockSummaryReportData = null;
                    stockSummaryReportData = {
                        items: [],
                        duration: `${Utils_1.default.dateToDDMMYYY(+new Date().setHours(0, 0, 0, 0))}`,
                        totalLowStockItems: 0,
                        totalStocksValue: 0,
                        totalStocksValuation: 0,
                    };
                    const items = yield this.itemRepo.getAllByPromise(phone, profileId);
                    items === null || items === void 0 ? void 0 : items.forEach(item => {
                        let stockValue = (Number(item.stock) || 0) * (Number(item.purchasePrice) || 0);
                        let stockValuation = (Number(item.stock) || 0) * (Number(item.sellPrice) || 0);
                        stockSummaryReportData.items.push({
                            item,
                            stockValue,
                            stockValuation,
                        });
                        stockSummaryReportData.totalStocksValue += stockValue;
                        stockSummaryReportData.totalStocksValuation += stockValuation;
                        stockSummaryReportData.totalLowStockItems += ((item === null || item === void 0 ? void 0 : item.stock) <= (item === null || item === void 0 ? void 0 : item.minStock)) ? 1 : 0;
                    });
                    return resolve(stockSummaryReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getItemSaleReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let itemSaleReportData = null;
                    itemSaleReportData = {
                        records: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalSalesQuantity: 0,
                        totalSalesAmount: 0,
                    };
                    const sales = yield this.saleRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                    sales === null || sales === void 0 ? void 0 : sales.forEach(sale => {
                        var _a;
                        (_a = sale.billItems) === null || _a === void 0 ? void 0 : _a.forEach(billItem => {
                            var _a, _b, _c;
                            const index = itemSaleReportData.records.findIndex(x => { var _a; return (x === null || x === void 0 ? void 0 : x._localUUID) === ((_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a._localUUID); });
                            if (index !== -1) {
                                itemSaleReportData.records[index].saleAmount += billItem.total;
                                itemSaleReportData.records[index].saleQuantity += billItem.quantity;
                            }
                            else {
                                itemSaleReportData.records.push({
                                    _localUUID: (_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a._localUUID,
                                    itemName: (_b = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _b === void 0 ? void 0 : _b.itemName,
                                    category: (_c = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _c === void 0 ? void 0 : _c.category,
                                    saleAmount: billItem === null || billItem === void 0 ? void 0 : billItem.total,
                                    saleQuantity: billItem === null || billItem === void 0 ? void 0 : billItem.quantity
                                });
                            }
                        });
                    });
                    itemSaleReportData.records.forEach(record => {
                        itemSaleReportData.totalSalesAmount += record.saleAmount;
                        itemSaleReportData.totalSalesQuantity += record.saleQuantity;
                    });
                    return resolve(itemSaleReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    getItemReportData(phone, profileId, startStamp, endStamp, itemUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (itemUUID) {
                    try {
                        let itemReportData = null;
                        itemReportData = {
                            item: null,
                            records: [],
                            duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                            totalSalesAmount: 0,
                            totalSalesQuantity: 0,
                            totalPurchasesAmount: 0,
                            totalPurchasesQuantity: 0,
                            totalAddedQuantity: 0,
                            totalReducedQuantity: 0,
                        };
                        let item = yield this.itemRepo.getByUUID(phone, profileId, itemUUID);
                        let sales = yield this.saleRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                        let purchases = yield this.purchaseRepo.getByBillDateRange(phone, profileId, startStamp, endStamp);
                        let allStockAdjust = yield this.itemStockAdjustRepo.getAllByLinkedItemUUIDByDateRange(phone, profileId, startStamp, endStamp, itemUUID);
                        // Note - Add in future -  saleReturn, purchaseReturn & expense
                        itemReportData.item = item;
                        sales === null || sales === void 0 ? void 0 : sales.forEach(sale => {
                            var _a;
                            if ((_a = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _a === void 0 ? void 0 : _a.length) {
                                sale === null || sale === void 0 ? void 0 : sale.billItems.forEach(billItem => {
                                    var _a;
                                    if (((_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a._localUUID) === itemUUID) {
                                        itemReportData.totalSalesAmount += billItem.total;
                                        itemReportData.totalSalesQuantity += Number(billItem.quantity);
                                        itemReportData.records.push({
                                            txnType: 'Sale',
                                            billItem,
                                            record: sale,
                                        });
                                    }
                                });
                            }
                        });
                        purchases === null || purchases === void 0 ? void 0 : purchases.forEach(purchase => {
                            var _a;
                            if ((_a = purchase === null || purchase === void 0 ? void 0 : purchase.billItems) === null || _a === void 0 ? void 0 : _a.length) {
                                purchase === null || purchase === void 0 ? void 0 : purchase.billItems.forEach(billItem => {
                                    var _a;
                                    if (((_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a._localUUID) === itemUUID) {
                                        itemReportData.totalPurchasesAmount += billItem.total;
                                        itemReportData.totalPurchasesQuantity += Number(billItem.quantity);
                                        itemReportData.records.push({
                                            txnType: 'Purchase',
                                            billItem,
                                            record: purchase,
                                        });
                                    }
                                });
                            }
                        });
                        allStockAdjust.forEach(stockAdjust => {
                            if (stockAdjust.quantity < 0) {
                                itemReportData.totalAddedQuantity += Math.abs(stockAdjust.quantity);
                                itemReportData.records.push({
                                    txnType: 'Item Add',
                                    billItem: null,
                                    record: stockAdjust,
                                });
                            }
                            else {
                                itemReportData.totalReducedQuantity += Math.abs(stockAdjust.quantity);
                                itemReportData.records.push({
                                    txnType: 'Item Reduce',
                                    billItem: null,
                                    record: stockAdjust,
                                });
                            }
                        });
                        return resolve(itemReportData);
                    }
                    catch (error) {
                        return resolve(null);
                    }
                }
                else {
                    return resolve(null);
                }
            }));
        });
    }
    getDayBookReportData(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                try {
                    let dayBookReportData = null;
                    dayBookReportData = {
                        dateStr: '',
                        records: [],
                        saleList: [],
                        duration: `From ${Utils_1.default.dateToDDMMYYY(startStamp)} To ${Utils_1.default.dateToDDMMYYY(endStamp)}`,
                        totalSalesAmount: 0,
                        totalSalesAmountChangePercentage: 0,
                        totalSalesAmountChangePercentagePositive: false,
                        totalPurchasesAmount: 0,
                        totalMoneyInsAmount: 0,
                        totalMoneyOutsAmount: 0,
                        totalCashInHandAmount: 0,
                        totalUPIAmount: 0,
                        totalChequeAmount: 0,
                        totalCashAmount: 0,
                        itemList: [],
                        categoryList: [],
                        hourlyCount: {},
                        weeklyCount: {},
                        profile: null,
                        trends: {
                            threeDaysMovingAvgChangePercentage: 0,
                            threeDaysMovingAvgChangePercentagePositive: false,
                            day0LastWeekChangePercentage: 0,
                            day1LastWeekChangePercentage: 0,
                            day2LastWeekChangePercentage: 0,
                            day0LastWeekChangePercentagePositive: false,
                            day1LastWeekChangePercentagePositive: false,
                            day2LastWeekChangePercentagePositive: false,
                            day0Name: '',
                            day1Name: '',
                            day2Name: '',
                            prevDaysDataAvailable: false,
                        }
                    };
                    for (let i = 0; i <= 23; i++) {
                        dayBookReportData.hourlyCount[i + ''] = {
                            sale: 0,
                            moneyIn: 0
                        };
                    }
                    let weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
                    const WeekDaysNames = ['Somvar', 'Mangalvar', 'Budhvar', 'Guruvar', 'Shukravar', 'Shanivar', 'Ravivar'];
                    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    let currentWeekDay = (new Date()).getDay() - 1;
                    let oneDayTimeSpan = 24 * 60 * 60 * 1000;
                    const TOTAL_DAYS = 10;
                    for (let i = 0; i <= TOTAL_DAYS; i++) {
                        let iDate = new Date((+new Date()) - ((TOTAL_DAYS - i + 1) * oneDayTimeSpan));
                        let iDayMonth = iDate.getDate();
                        let iMonth = months[iDate.getMonth()];
                        let iDay = currentWeekDay - (TOTAL_DAYS - i + 1);
                        if (iDay < 0) {
                            iDay = 7 + iDay;
                        }
                        if (iDay < 0) {
                            iDay = 7 + iDay;
                        }
                        let dayStart = startStamp - ((TOTAL_DAYS - i) * oneDayTimeSpan);
                        let dayEnd = dayStart + oneDayTimeSpan;
                        let saleSumResult = yield SaleRepository_1.SaleRepository.aggregate([
                            {
                                $match: {
                                    userId: phone,
                                    profileId,
                                    deletedStamp: 0,
                                    f: { $gt: 0 },
                                    g: {
                                        $lt: dayEnd,
                                        $gte: dayStart
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: {
                                        userId: '$userId',
                                    },
                                    count: {
                                        $sum: '$z',
                                    }
                                }
                            }
                        ]).toArray();
                        let saleSum = 0;
                        if (saleSumResult && saleSumResult[0] && ((_a = saleSumResult[0]) === null || _a === void 0 ? void 0 : _a.count)) {
                            saleSum = Number((_b = saleSumResult[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
                        }
                        let moneyInSumResult = yield MoneyInRepository_1.MoneyInRepository.aggregate([
                            {
                                $match: {
                                    userId: phone,
                                    profileId,
                                    deletedStamp: 0,
                                    billDateStamp: {
                                        $lt: dayEnd,
                                        $gte: dayStart
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: {
                                        userId: '$userId',
                                    },
                                    count: {
                                        $sum: '$totalAmount',
                                    }
                                }
                            }
                        ]).toArray();
                        let moneyInSum = 0;
                        if (moneyInSumResult && moneyInSumResult[0] && ((_c = moneyInSumResult[0]) === null || _c === void 0 ? void 0 : _c.count)) {
                            moneyInSum = Number((_d = moneyInSumResult[0]) === null || _d === void 0 ? void 0 : _d.count) || 0;
                        }
                        dayBookReportData.weeklyCount[i + ''] = {
                            day: weekDays[iDay] + ` (${iDayMonth} ${iMonth})`,
                            sale: saleSum,
                            moneyIn: moneyInSum
                        };
                        if (i < 3) {
                            dayBookReportData.weeklyCount[i + ''].threeDaysMovingAvg = saleSum;
                        }
                        else {
                            dayBookReportData.weeklyCount[i + ''].threeDaysMovingAvg =
                                Math.ceil((dayBookReportData.weeklyCount[(i - 0) + ''].sale
                                    + dayBookReportData.weeklyCount[(i - 1) + ''].sale
                                    + dayBookReportData.weeklyCount[(i - 2) + ''].sale) / 3);
                        }
                    }
                    let profile = yield this.profileRepo.getByUUID(phone, profileId);
                    dayBookReportData.profile = profile;
                    const d = new Date(startStamp + 1), dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(), mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1), yyyy = d.getFullYear();
                    dayBookReportData.dateStr = dd + '/' + mm + '/' + yyyy;
                    let sales = yield SaleRepository_1.SaleRepository.find({
                        where: {
                            userId: phone,
                            profileId,
                            deletedStamp: 0,
                            f: { $gt: 0 },
                            g: {
                                $lt: endStamp,
                                $gte: startStamp
                            }
                        }
                    });
                    let purchases = yield PurchaseRepository_1.PurchaseRepository.find({
                        where: {
                            userId: phone,
                            profileId,
                            deletedStamp: 0,
                            billDateStamp: {
                                $lt: endStamp,
                                $gte: startStamp
                            }
                        }
                    });
                    let moneyIns = yield MoneyInRepository_1.MoneyInRepository.find({
                        where: {
                            userId: phone,
                            profileId,
                            deletedStamp: 0,
                            billDateStamp: {
                                $lt: endStamp,
                                $gte: startStamp
                            }
                        }
                    });
                    let moneyOuts = yield MoneyOutRepository_1.MoneyOutRepository.find({
                        where: {
                            userId: phone,
                            profileId,
                            deletedStamp: 0,
                            billDateStamp: {
                                $lt: endStamp,
                                $gte: startStamp
                            }
                        }
                    });
                    dayBookReportData.saleList = sales;
                    // Note - Add in future -  saleReturn, purchaseReturn & expense
                    let uniqueItems = {};
                    let itemList = [];
                    let uniqueCategories = {};
                    let categoryList = [];
                    sales === null || sales === void 0 ? void 0 : sales.forEach(sale => {
                        var _a, _b;
                        sale = ns.expand(sale);
                        dayBookReportData.totalSalesAmount += Utils_1.default.capFractionsToSix(Number(sale === null || sale === void 0 ? void 0 : sale.totalAmount));
                        dayBookReportData.records.push({
                            txnType: 'Sale',
                            record: sale,
                        });
                        if ((_a = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _a === void 0 ? void 0 : _a.length) {
                            (_b = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _b === void 0 ? void 0 : _b.forEach((billItem) => {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                                if (!uniqueItems[(_a = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _a === void 0 ? void 0 : _a._localUUID]) {
                                    uniqueItems[(_b = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _b === void 0 ? void 0 : _b._localUUID] = {
                                        itemName: (_c = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _c === void 0 ? void 0 : _c.itemName,
                                        quantity: 0,
                                        totalSalePrice: 0
                                    };
                                }
                                uniqueItems[(_d = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _d === void 0 ? void 0 : _d._localUUID].quantity += Utils_1.default.capFractionsToSix(Number(billItem === null || billItem === void 0 ? void 0 : billItem.quantity) || 0);
                                uniqueItems[(_e = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _e === void 0 ? void 0 : _e._localUUID].totalSalePrice += Utils_1.default.capFractionsToSix(Number(billItem === null || billItem === void 0 ? void 0 : billItem.total) || 0);
                                if (!((_f = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _f === void 0 ? void 0 : _f.category)) {
                                    billItem.item.category = 'No Category';
                                }
                                if (!uniqueCategories[(_g = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _g === void 0 ? void 0 : _g.category]) {
                                    uniqueCategories[(_h = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _h === void 0 ? void 0 : _h.category] = {
                                        categoryName: (_j = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _j === void 0 ? void 0 : _j.category,
                                        quantity: 0,
                                        totalSalePrice: 0
                                    };
                                }
                                uniqueCategories[(_k = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _k === void 0 ? void 0 : _k.category].quantity += Utils_1.default.capFractionsToSix(Number(billItem === null || billItem === void 0 ? void 0 : billItem.quantity) || 0);
                                uniqueCategories[(_l = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _l === void 0 ? void 0 : _l.category].totalSalePrice += Utils_1.default.capFractionsToSix(Number(billItem === null || billItem === void 0 ? void 0 : billItem.total) || 0);
                            });
                        }
                        let saleHour = (new Date(sale.billCompleteStamp || 0)).getHours();
                        if (!dayBookReportData.hourlyCount[saleHour + '']) {
                            dayBookReportData.hourlyCount[saleHour + ''] = {
                                sale: 0,
                                moneyIn: 0
                            };
                        }
                        dayBookReportData.hourlyCount[saleHour + ''].sale += Utils_1.default.capFractionsToSix(sale.totalAmount);
                    });
                    for (let k in uniqueItems) {
                        itemList.push(uniqueItems[k]);
                    }
                    for (let k in uniqueCategories) {
                        categoryList.push(uniqueCategories[k]);
                    }
                    itemList.sort((a, b) => {
                        return b.quantity - a.quantity;
                    });
                    categoryList.sort((a, b) => {
                        return b.quantity - a.quantity;
                    });
                    dayBookReportData.itemList = itemList;
                    dayBookReportData.categoryList = categoryList;
                    purchases === null || purchases === void 0 ? void 0 : purchases.forEach(purchase => {
                        dayBookReportData.totalPurchasesAmount += Utils_1.default.capFractionsToSix(Number(purchase === null || purchase === void 0 ? void 0 : purchase.totalAmount));
                        dayBookReportData.records.push({
                            txnType: 'Purchase',
                            record: purchase,
                        });
                    });
                    let totalMoneyInCashAmount = 0;
                    let totalMoneyInUPIAmount = 0;
                    let totalMoneyInChequeAmount = 0;
                    moneyIns === null || moneyIns === void 0 ? void 0 : moneyIns.forEach(moneyIn => {
                        dayBookReportData.totalMoneyInsAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        if (moneyIn.paymentMode === 'cash' || !moneyIn.paymentMode) {
                            totalMoneyInCashAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        }
                        else if (moneyIn.paymentMode === 'bank') {
                            totalMoneyInUPIAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        }
                        else if (moneyIn.paymentMode === 'cheque') {
                            totalMoneyInChequeAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        }
                        dayBookReportData.records.push({
                            txnType: 'Money In',
                            record: moneyIn,
                        });
                        let moneyInHour = (new Date(moneyIn.createdStamp || 0)).getHours();
                        if (!dayBookReportData.hourlyCount[moneyInHour + '']) {
                            dayBookReportData.hourlyCount[moneyInHour + ''] = {
                                sale: 0,
                                moneyIn: 0
                            };
                        }
                        dayBookReportData.hourlyCount[moneyInHour + ''].moneyIn += Utils_1.default.capFractionsToSix(moneyIn.totalAmount);
                    });
                    let totalMoneyOutCashAmount = 0;
                    let totalMoneyOutUPIAmount = 0;
                    let totalMoneyOutChequeAmount = 0;
                    moneyOuts === null || moneyOuts === void 0 ? void 0 : moneyOuts.forEach(moneyOut => {
                        dayBookReportData.totalMoneyOutsAmount += Utils_1.default.capFractionsToSix(Number(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount));
                        if (moneyOut.paymentMode === 'cash' || !moneyOut.paymentMode) {
                            totalMoneyOutCashAmount += Utils_1.default.capFractionsToSix(Number(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount));
                        }
                        else if (moneyOut.paymentMode === 'bank') {
                            totalMoneyOutUPIAmount += Utils_1.default.capFractionsToSix(Number(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount));
                        }
                        else if (moneyOut.paymentMode === 'cheque') {
                            totalMoneyOutChequeAmount += Utils_1.default.capFractionsToSix(Number(moneyOut === null || moneyOut === void 0 ? void 0 : moneyOut.totalAmount));
                        }
                        dayBookReportData.records.push({
                            txnType: 'Money Out',
                            record: moneyOut,
                        });
                    });
                    dayBookReportData.totalCashInHandAmount = Utils_1.default.capFractionsToSix(dayBookReportData.totalMoneyInsAmount - dayBookReportData.totalMoneyOutsAmount);
                    dayBookReportData.totalUPIAmount = Utils_1.default.capFractionsToSix(totalMoneyInUPIAmount - totalMoneyOutUPIAmount);
                    dayBookReportData.totalChequeAmount = Utils_1.default.capFractionsToSix(totalMoneyInChequeAmount - totalMoneyOutChequeAmount);
                    dayBookReportData.totalCashAmount = Utils_1.default.capFractionsToSix(totalMoneyInCashAmount - totalMoneyOutCashAmount);
                    (_e = dayBookReportData.records) === null || _e === void 0 ? void 0 : _e.sort((a, b) => {
                        if (b.record.billDateStamp == a.record.billDateStamp) {
                            return b.record.createdStamp - a.record.createdStamp;
                        }
                        return b.record.billDateStamp - a.record.billDateStamp;
                    });
                    try {
                        if (dayBookReportData.weeklyCount[10].threeDaysMovingAvg && dayBookReportData.weeklyCount[9].threeDaysMovingAvg) {
                            dayBookReportData.trends.threeDaysMovingAvgChangePercentage =
                                Math.round(((dayBookReportData.weeklyCount[10].threeDaysMovingAvg
                                    - dayBookReportData.weeklyCount[9].threeDaysMovingAvg) / dayBookReportData.weeklyCount[9].threeDaysMovingAvg) * 10000) / 100;
                            if (dayBookReportData.trends.threeDaysMovingAvgChangePercentage > 0) {
                                dayBookReportData.trends.threeDaysMovingAvgChangePercentagePositive = true;
                            }
                        }
                        if (dayBookReportData.weeklyCount[10].sale
                            && dayBookReportData.weeklyCount[3].sale) {
                            dayBookReportData.trends.day0LastWeekChangePercentage =
                                Math.round(((dayBookReportData.weeklyCount[10].sale
                                    - dayBookReportData.weeklyCount[3].sale)
                                    / dayBookReportData.weeklyCount[3].sale) * 10000) / 100;
                            if (dayBookReportData.trends.day0LastWeekChangePercentage > 0) {
                                dayBookReportData.trends.day0LastWeekChangePercentagePositive = true;
                            }
                            dayBookReportData.trends.day0Name = WeekDaysNames[weekDays.indexOf(dayBookReportData.weeklyCount[10].day.substring(0, 2))];
                        }
                        if (dayBookReportData.weeklyCount[9].sale
                            && dayBookReportData.weeklyCount[2].sale) {
                            dayBookReportData.trends.day1LastWeekChangePercentage =
                                Math.round(((dayBookReportData.weeklyCount[9].sale
                                    - dayBookReportData.weeklyCount[2].sale)
                                    / dayBookReportData.weeklyCount[2].sale) * 10000) / 100;
                            if (dayBookReportData.trends.day1LastWeekChangePercentage > 0) {
                                dayBookReportData.trends.day1LastWeekChangePercentagePositive = true;
                            }
                            dayBookReportData.trends.day1Name = WeekDaysNames[weekDays.indexOf(dayBookReportData.weeklyCount[9].day.substring(0, 2))];
                        }
                        if (dayBookReportData.weeklyCount[8].sale
                            && dayBookReportData.weeklyCount[1].sale) {
                            dayBookReportData.trends.day2LastWeekChangePercentage =
                                Math.round(((dayBookReportData.weeklyCount[8].sale
                                    - dayBookReportData.weeklyCount[1].sale)
                                    / dayBookReportData.weeklyCount[1].sale) * 10000) / 100;
                            if (dayBookReportData.trends.day2LastWeekChangePercentage > 0) {
                                dayBookReportData.trends.day2LastWeekChangePercentagePositive = true;
                            }
                            dayBookReportData.trends.day2Name = WeekDaysNames[weekDays.indexOf(dayBookReportData.weeklyCount[8].day.substring(0, 2))];
                            dayBookReportData.trends.prevDaysDataAvailable = true;
                        }
                        if (dayBookReportData.weeklyCount[TOTAL_DAYS - 1].sale) {
                            dayBookReportData.totalSalesAmountChangePercentage = Math.round(((dayBookReportData.totalSalesAmount - dayBookReportData.weeklyCount[TOTAL_DAYS - 1].sale) / dayBookReportData.weeklyCount[TOTAL_DAYS - 1].sale) * 10000) / 100;
                            if (dayBookReportData.totalSalesAmountChangePercentage > 0) {
                                dayBookReportData.totalSalesAmountChangePercentagePositive = true;
                            }
                        }
                    }
                    catch (err) {
                    }
                    return resolve(dayBookReportData);
                }
                catch (error) {
                    return resolve(null);
                }
            }));
        });
    }
    sendDayBookMessage(phone, profile, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    //let profile =  await this.profileRepo.getByUUID(phone,profileId);
                    lib_1.WhatsApp.sendTransactionalMessage({
                        accountType: whatsapp_1.WhatsappAccountType.sales,
                        phone,
                        templateId: 'daily_report_is_ready_utility',
                        headerValues: [],
                        bodyValues: [
                            ((profile === null || profile === void 0 ? void 0 : profile.legalName) || (profile === null || profile === void 0 ? void 0 : profile.profileName) || ((profile === null || profile === void 0 ? void 0 : profile._localUUID) + '').slice(-4)) + '',
                        ],
                        buttonValues: {
                            '0': [`${phone}/${profileId}/${startStamp}/${endStamp}`]
                        }
                    });
                    return resolve(true);
                }
                catch (err) {
                    return resolve(false);
                }
            }));
        });
    }
    sendDayBookMessageObj(phone, profileId, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    let profile = yield this.profileRepo.getByUUID(phone, profileId);
                    let saleSumResult = yield SaleRepository_1.SaleRepository.aggregate([
                        {
                            $match: {
                                userId: phone,
                                profileId,
                                deletedStamp: 0,
                                f: { $gt: 0 },
                                g: {
                                    $lt: endStamp,
                                    $gte: startStamp
                                }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    userId: '$userId',
                                },
                                count: {
                                    $sum: '$z',
                                }
                            }
                        }
                    ]).toArray();
                    let saleSum = 0;
                    if (saleSumResult && saleSumResult[0] && ((_a = saleSumResult[0]) === null || _a === void 0 ? void 0 : _a.count)) {
                        saleSum = Number((_b = saleSumResult[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
                    }
                    let moneyIns = yield MoneyInRepository_1.MoneyInRepository.find({
                        where: {
                            userId: phone,
                            profileId,
                            deletedStamp: 0,
                            billDateStamp: {
                                $lt: endStamp,
                                $gte: startStamp
                            }
                        }
                    });
                    let totalMoneyInCashAmount = 0;
                    let totalMoneyInUPIAmount = 0;
                    let totalMoneyInChequeAmount = 0;
                    let totalMoneyInsAmount = 0;
                    moneyIns === null || moneyIns === void 0 ? void 0 : moneyIns.forEach(moneyIn => {
                        totalMoneyInsAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        if (moneyIn.paymentMode === 'cash' || !moneyIn.paymentMode) {
                            totalMoneyInCashAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        }
                        else if (moneyIn.paymentMode === 'bank') {
                            totalMoneyInUPIAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        }
                        else if (moneyIn.paymentMode === 'cheque') {
                            totalMoneyInChequeAmount += Utils_1.default.capFractionsToSix(Number(moneyIn === null || moneyIn === void 0 ? void 0 : moneyIn.totalAmount));
                        }
                    });
                    console.info(`https://pdf.ezobooks.in/DayBookReport?name=${phone}&url=https://db.ezobooks.in/kappa/reports/dayBookReport/${phone}/${profileId}/${startStamp}/${endStamp}`);
                    resolve({ data: [
                            ((profile === null || profile === void 0 ? void 0 : profile.legalName) || (profile === null || profile === void 0 ? void 0 : profile.profileName) || ((profile === null || profile === void 0 ? void 0 : profile._localUUID) + '').slice(-4)) + '',
                            Utils_1.default.representAsWhole(saleSum) + '',
                            Utils_1.default.representAsWhole(totalMoneyInsAmount) + '',
                            Utils_1.default.representAsWhole(totalMoneyInCashAmount) + '',
                            Utils_1.default.representAsWhole(totalMoneyInUPIAmount) + '',
                            Utils_1.default.representAsWhole(totalMoneyInChequeAmount) + '',
                        ] });
                }
                catch (err) {
                    resolve({});
                }
            }));
        });
    }
    getAllAccountsInDays(days) {
        return __awaiter(this, void 0, void 0, function* () {
            let dt = new Date();
            dt.setHours(0);
            dt.setMinutes(0);
            dt.setSeconds(0);
            dt.setMilliseconds(0);
            let dayStartStamp = +dt;
            let reportStartStamp = dayStartStamp - (24 * 60 * 60 * 1000);
            let userCutOffStamp = dayStartStamp - (days * 24 * 60 * 60 * 1000);
            let users = yield UserRepository_1.UserRepository.find({
                where: {
                    lastActiveStamp: {
                        $gte: userCutOffStamp
                    }
                }
            });
            this.sendMsgToUsers(users, reportStartStamp, dayStartStamp);
            return users;
        });
    }
    sendMsgToUsers(users, reportStartStamp, reportEndStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < users.length; i++) {
                try {
                    yield Utils_1.default.wait(100);
                    let profile = yield ProfileRepository_1.ProfileRepository.findOne({
                        where: {
                            userId: users[i].phone,
                            deletedStamp: 0
                        }
                    });
                    if (profile) {
                        try {
                            yield this.sendDayBookMessage(users[i].phone, profile, profile === null || profile === void 0 ? void 0 : profile._localUUID, reportStartStamp, reportEndStamp);
                        }
                        catch (err) {
                        }
                    }
                }
                catch (err) {
                }
            }
        });
    }
};
ReportService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PartyRepo_1.PartyRepo,
        ItemRepo_1.ItemRepo,
        MoneyInRepo_1.MoneyInRepo,
        MoneyOutRepo_1.MoneyOutRepo,
        SaleRepo_1.SaleRepo,
        PurchaseRepo_1.PurchaseRepo,
        ItemStockAdjustRepo_1.ItemStockAdjustRepo,
        PartyCategoryRepo_1.PartyCategoryRepo,
        ItemCategoryRepo_1.ItemCategoryRepo,
        ProfileRepo_1.ProfileRepo,
        ImageRepo_1.ImageRepo])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=ReportService.js.map