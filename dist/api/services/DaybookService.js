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
exports.DayBookService = void 0;
const typedi_1 = require("typedi");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const Sale_1 = require("../models/Sale");
const sale_1 = require("../modelsv2/sale");
const moneyin_1 = require("../modelsv2/moneyin");
const purchase_1 = require("../modelsv2/purchase");
const moneyout_1 = require("../modelsv2/moneyout");
const profile_1 = require("../modelsv2/profile");
const ns = new Sale_1.Sale();
let DayBookService = class DayBookService {
    constructor() { }
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
                        let saleSumResult = yield sale_1.SaleRepo.aggregate([
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
                        ]);
                        let saleSum = 0;
                        if (saleSumResult && saleSumResult[0] && ((_a = saleSumResult[0]) === null || _a === void 0 ? void 0 : _a.count)) {
                            saleSum = Number((_b = saleSumResult[0]) === null || _b === void 0 ? void 0 : _b.count) || 0;
                        }
                        let moneyInSumResult = yield moneyin_1.MoneyInRepo.aggregate([
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
                        ]);
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
                    let qr = yield profile_1.ProfileRepo.findOne({
                        userId: phone,
                        _localUUID: profileId
                    });
                    let profile = qr.toObject();
                    dayBookReportData.profile = profile;
                    const d = new Date(startStamp + 1), dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(), mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1), yyyy = d.getFullYear();
                    dayBookReportData.dateStr = dd + '/' + mm + '/' + yyyy;
                    let sales = [];
                    let sqr = yield sale_1.SaleRepo.find({
                        userId: phone,
                        profileId,
                        deletedStamp: 0,
                        f: { $gt: 0 },
                        g: {
                            $lt: endStamp,
                            $gte: startStamp
                        }
                    });
                    if (sqr && sqr.length) {
                        sqr.map((el) => { sales.push(el.toObject()); });
                    }
                    let purchases = [];
                    let pqr = yield purchase_1.PurchaseRepo.find({
                        userId: phone,
                        profileId,
                        deletedStamp: 0,
                        billDateStamp: {
                            $lt: endStamp,
                            $gte: startStamp
                        }
                    });
                    if (pqr && pqr.length) {
                        pqr.map((el) => { purchases.push(el.toObject()); });
                    }
                    let moneyIns = [];
                    let miqr = yield moneyin_1.MoneyInRepo.find({
                        userId: phone,
                        profileId,
                        deletedStamp: 0,
                        billDateStamp: {
                            $lt: endStamp,
                            $gte: startStamp
                        }
                    });
                    if (miqr && miqr.length) {
                        miqr.map((el) => { moneyIns.push(el.toObject()); });
                    }
                    let moneyOuts = [];
                    let moqr = yield moneyout_1.MoneyOutRepo.find({
                        userId: phone,
                        profileId,
                        deletedStamp: 0,
                        billDateStamp: {
                            $lt: endStamp,
                            $gte: startStamp
                        }
                    });
                    if (moqr && moqr.length) {
                        moqr.map((el) => { moneyOuts.push(el.toObject()); });
                    }
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
};
DayBookService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], DayBookService);
exports.DayBookService = DayBookService;
//# sourceMappingURL=DaybookService.js.map