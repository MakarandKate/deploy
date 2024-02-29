"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanRouter = exports.saleRouter = void 0;
const Page_1 = require("../../lib/Page");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SaleService_1 = require("../../api/services/SaleService");
const UserService_1 = require("../../api/services/UserService");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const SaleRepository_1 = require("../../api/repositories/SaleRepository");
const Sale_1 = require("../../api/models/Sale");
const saleService = typeorm_typedi_extensions_1.Container.get(SaleService_1.SaleService);
const userService = typeorm_typedi_extensions_1.Container.get(UserService_1.UserService);
const ns = new Sale_1.Sale();
const saleRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let currentDate = new Date();
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    let hour0StartStamp = +new Date(+currentDate);
    let hour1StartStamp = hour0StartStamp - (1 * 60 * 60 * 1000);
    let hour2StartStamp = hour1StartStamp - (1 * 60 * 60 * 1000);
    let hour3StartStamp = hour2StartStamp - (1 * 60 * 60 * 1000);
    let hour4StartStamp = hour3StartStamp - (1 * 60 * 60 * 1000);
    let hour5StartStamp = hour4StartStamp - (1 * 60 * 60 * 1000);
    let hour6StartStamp = hour5StartStamp - (1 * 60 * 60 * 1000);
    let hour7StartStamp = hour6StartStamp - (1 * 60 * 60 * 1000);
    let hour8StartStamp = hour7StartStamp - (1 * 60 * 60 * 1000);
    let hour9StartStamp = hour8StartStamp - (1 * 60 * 60 * 1000);
    let hour10StartStamp = hour9StartStamp - (1 * 60 * 60 * 1000);
    let hour11StartStamp = hour10StartStamp - (1 * 60 * 60 * 1000);
    let hour12StartStamp = hour11StartStamp - (1 * 60 * 60 * 1000);
    let hour13StartStamp = hour12StartStamp - (1 * 60 * 60 * 1000);
    let hour14StartStamp = hour13StartStamp - (1 * 60 * 60 * 1000);
    let hour15StartStamp = hour14StartStamp - (1 * 60 * 60 * 1000);
    let hour16StartStamp = hour15StartStamp - (1 * 60 * 60 * 1000);
    let hour17StartStamp = hour16StartStamp - (1 * 60 * 60 * 1000);
    let hour18StartStamp = hour17StartStamp - (1 * 60 * 60 * 1000);
    let hour19StartStamp = hour18StartStamp - (1 * 60 * 60 * 1000);
    let hour20StartStamp = hour19StartStamp - (1 * 60 * 60 * 1000);
    let hour21StartStamp = hour20StartStamp - (1 * 60 * 60 * 1000);
    let hour22StartStamp = hour21StartStamp - (1 * 60 * 60 * 1000);
    let hour23StartStamp = hour22StartStamp - (1 * 60 * 60 * 1000);
    let hour24StartStamp = hour23StartStamp - (1 * 60 * 60 * 1000);
    currentDate.setHours(0);
    let todayStartStamp = +new Date(+currentDate);
    let totalCount = yield saleService.dashTotalBetweenTimev2(0, +new Date());
    let todayCount = yield saleService.dashTotalBetweenTimev2(todayStartStamp, +new Date());
    let hour0Count = yield saleService.dashTotalBetweenTimev2(hour0StartStamp, +new Date());
    let hour1Count = yield saleService.dashTotalBetweenTimev2(hour1StartStamp, hour0StartStamp);
    let hour2Count = yield saleService.dashTotalBetweenTimev2(hour2StartStamp, hour1StartStamp);
    let hour3Count = yield saleService.dashTotalBetweenTimev2(hour3StartStamp, hour2StartStamp);
    let hour4Count = yield saleService.dashTotalBetweenTimev2(hour4StartStamp, hour3StartStamp);
    let hour5Count = yield saleService.dashTotalBetweenTimev2(hour5StartStamp, hour4StartStamp);
    let hour6Count = yield saleService.dashTotalBetweenTimev2(hour6StartStamp, hour5StartStamp);
    let hour7Count = yield saleService.dashTotalBetweenTimev2(hour7StartStamp, hour6StartStamp);
    let hour8Count = yield saleService.dashTotalBetweenTimev2(hour8StartStamp, hour7StartStamp);
    let hour9Count = yield saleService.dashTotalBetweenTimev2(hour9StartStamp, hour8StartStamp);
    let hour10Count = yield saleService.dashTotalBetweenTimev2(hour10StartStamp, hour9StartStamp);
    let hour11Count = yield saleService.dashTotalBetweenTimev2(hour11StartStamp, hour10StartStamp);
    let hour12Count = yield saleService.dashTotalBetweenTimev2(hour12StartStamp, hour11StartStamp);
    let hour13Count = yield saleService.dashTotalBetweenTimev2(hour13StartStamp, hour12StartStamp);
    let hour14Count = yield saleService.dashTotalBetweenTimev2(hour14StartStamp, hour13StartStamp);
    let hour15Count = yield saleService.dashTotalBetweenTimev2(hour15StartStamp, hour14StartStamp);
    let hour16Count = yield saleService.dashTotalBetweenTimev2(hour16StartStamp, hour15StartStamp);
    let hour17Count = yield saleService.dashTotalBetweenTimev2(hour17StartStamp, hour16StartStamp);
    let hour18Count = yield saleService.dashTotalBetweenTimev2(hour18StartStamp, hour17StartStamp);
    let hour19Count = yield saleService.dashTotalBetweenTimev2(hour19StartStamp, hour18StartStamp);
    let hour20Count = yield saleService.dashTotalBetweenTimev2(hour20StartStamp, hour19StartStamp);
    let hour21Count = yield saleService.dashTotalBetweenTimev2(hour21StartStamp, hour20StartStamp);
    let hour22Count = yield saleService.dashTotalBetweenTimev2(hour22StartStamp, hour21StartStamp);
    let hour23Count = yield saleService.dashTotalBetweenTimev2(hour23StartStamp, hour22StartStamp);
    let hour24Count = yield saleService.dashTotalBetweenTimev2(hour24StartStamp, hour23StartStamp);
    //let topUsersAllTime = await saleService.dashMostUsedBetweenTime(0,+new Date());
    //let topUsersToday = await saleService.dashMostUsedBetweenTime(todayStartStamp,+new Date());
    //let topUsersLastHour = await saleService.dashMostUsedBetweenTime((+new Date)-(60*60*1000),+new Date());
    let currentActiveUsers = yield userService.dashCurrentActiveUsersv2();
    let totalProUsers = yield LicenceRepository_1.LicenceRepository.find({
        where: {
            proExpiryStamp: {
                $gt: +new Date()
            }
        }
    });
    let paidUserPhoneArr = [];
    let proUsersPhoneArr = [];
    let paidThreshold = (+new Date()); //-(7*24*60*60*1000);
    totalProUsers.forEach(el => {
        if (el.proActivationStamp < paidThreshold) {
            paidUserPhoneArr.push(el.userId);
        }
        proUsersPhoneArr.push(el.userId);
    });
    let paidActiveUsersCount = 0;
    let proActiveUsersCount = 0;
    currentActiveUsers.forEach((el) => {
        if (paidUserPhoneArr.indexOf(el.phone) > -1) {
            paidActiveUsersCount++;
        }
        if (proUsersPhoneArr.indexOf(el.phone) > -1) {
            proActiveUsersCount++;
        }
    });
    let mapPins = [
        ['Lat', 'Long', 'User'],
    ];
    for (let i = 0; i < currentActiveUsers.length; i++) {
        if (currentActiveUsers[i].lat && currentActiveUsers[i].long) {
            mapPins.push([currentActiveUsers[i].lat, currentActiveUsers[i].long, currentActiveUsers[i].phone]);
        }
    }
    let totalRegistrationDay0 = yield userService.dashRegistrationInTimev2(todayStartStamp, +new Date());
    let totalRegistrationDay1 = yield userService.dashRegistrationInTimev2(todayStartStamp - (1 * 24 * 60 * 60 * 1000), todayStartStamp - (0 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay2 = yield userService.dashRegistrationInTimev2(todayStartStamp - (2 * 24 * 60 * 60 * 1000), todayStartStamp - (1 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay3 = yield userService.dashRegistrationInTimev2(todayStartStamp - (3 * 24 * 60 * 60 * 1000), todayStartStamp - (2 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay4 = yield userService.dashRegistrationInTimev2(todayStartStamp - (4 * 24 * 60 * 60 * 1000), todayStartStamp - (3 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay5 = yield userService.dashRegistrationInTimev2(todayStartStamp - (5 * 24 * 60 * 60 * 1000), todayStartStamp - (4 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay6 = yield userService.dashRegistrationInTimev2(todayStartStamp - (6 * 24 * 60 * 60 * 1000), todayStartStamp - (5 * 24 * 60 * 60 * 1000));
    let oneDayMills = (24 * 60 * 60 * 1000);
    let day0ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 7), +new Date());
    let day1ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 7), todayStartStamp - (oneDayMills * 6));
    let week1ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 7), todayStartStamp - (oneDayMills * 6));
    let week2ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 14), todayStartStamp - (oneDayMills * 13));
    let week3ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 21), todayStartStamp - (oneDayMills * 20));
    let week4ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 28), todayStartStamp - (oneDayMills * 27));
    let week5ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 35), todayStartStamp - (oneDayMills * 34));
    let week6ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 42), todayStartStamp - (oneDayMills * 41));
    let week7ActiveUsers = yield saleService.dashMostUsedBetweenTimeCountv2(todayStartStamp - (oneDayMills * 49), todayStartStamp - (oneDayMills * 48));
    (0, Page_1.setPage)(req, res, {
        title: 'Dashboard',
        description: 'dash',
        view: 'dashboard/sale',
        data: {
            totalRegistrationDay0,
            totalRegistrationDay1,
            totalRegistrationDay2,
            totalRegistrationDay3,
            totalRegistrationDay4,
            totalRegistrationDay5,
            totalRegistrationDay6,
            mapPins: JSON.stringify(mapPins),
            currentActiveUsers,
            currentActiveUsersCount: currentActiveUsers.length,
            totalPaidUsers: paidUserPhoneArr.length,
            paidActiveUsersCount,
            proActiveUsersCount,
            totalProUsers: proUsersPhoneArr.length,
            //topUsersAllTime,
            //topUsersToday,
            //topUsersLastHour,
            totalCount,
            todayCount,
            hour0Count,
            hour1Count,
            hour2Count,
            hour3Count,
            hour4Count,
            hour5Count,
            hour6Count,
            hour7Count,
            hour8Count,
            hour9Count,
            hour10Count,
            hour11Count,
            hour12Count,
            hour13Count,
            hour14Count,
            hour15Count,
            hour16Count,
            hour17Count,
            hour18Count,
            hour19Count,
            hour20Count,
            hour21Count,
            hour22Count,
            hour23Count,
            hour24Count,
            day0ActiveUsers,
            day1ActiveUsers,
            week1ActiveUsers,
            week2ActiveUsers,
            week3ActiveUsers,
            week4ActiveUsers,
            week5ActiveUsers,
            week6ActiveUsers,
            week7ActiveUsers,
        }
    });
});
exports.saleRouter = saleRouter;
const cleanRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let cnt = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.cnt) || 0;
    if (!cnt) {
        cnt = 0;
    }
    yield cleanSale(cnt);
    return res.send({ s: 1 });
});
exports.cleanRouter = cleanRouter;
function cleanSale(cnt) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    return __awaiter(this, void 0, void 0, function* () {
        cnt++;
        console.info('cnt:start', cnt);
        let st = +new Date();
        let arr = yield SaleRepository_1.SaleRepository.find({
            where: {
                "billItems.item.images.0": { $exists: true }
            },
            order: {
                _is: 1
            },
            take: 500
        });
        let ais = [];
        let deletedStrLen = 0;
        for (let i = 0; i < arr.length; i++) {
            let sale = arr[i];
            ais.push(sale._localUUID);
            if ((_a = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _a === void 0 ? void 0 : _a.length) {
                for (let ii = 0; ii < ((_b = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _b === void 0 ? void 0 : _b.length); ii++) {
                    if ((_c = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _c === void 0 ? void 0 : _c.item) {
                        if ((_e = (_d = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _d === void 0 ? void 0 : _d.item) === null || _e === void 0 ? void 0 : _e._localId) {
                            delete sale.billItems[ii].item._localId;
                        }
                        if ((_g = (_f = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _f === void 0 ? void 0 : _f.item) === null || _g === void 0 ? void 0 : _g.profileId) {
                            delete sale.billItems[ii].item.profileId;
                        }
                        if ((_j = (_h = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _h === void 0 ? void 0 : _h.item) === null || _j === void 0 ? void 0 : _j.userId) {
                            delete sale.billItems[ii].item.userId;
                        }
                        if ((_l = (_k = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _k === void 0 ? void 0 : _k.item) === null || _l === void 0 ? void 0 : _l._serverIdRef) {
                            delete sale.billItems[ii].item._serverIdRef;
                        }
                        if ((_o = (_m = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _m === void 0 ? void 0 : _m.item) === null || _o === void 0 ? void 0 : _o.images) {
                            for (let iv = 0; iv < ((_q = (_p = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _p === void 0 ? void 0 : _p.item) === null || _q === void 0 ? void 0 : _q.images.length); iv++) {
                                deletedStrLen += (Number((_s = (_r = sale === null || sale === void 0 ? void 0 : sale.billItems[ii]) === null || _r === void 0 ? void 0 : _r.item) === null || _s === void 0 ? void 0 : _s.images[iv].length) || 0);
                            }
                            sale.billItems[ii].item.images = [];
                        }
                    }
                }
            }
            //sale=ns.compress(sale);
            yield SaleRepository_1.SaleRepository.updateMany({
                _localUUID: sale._localUUID
            }, {
                "$set": Object.assign({}, sale)
            });
        }
        let et = +new Date();
        console.info("DC", et - st, arr[0]._localUUID);
        if (arr.length > 400) {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield cleanSale(cnt);
                // request(`http://localhost:4150/kappa/dashboard/clean?cnt=${cnt}`)
            }), 5);
        }
        return;
    });
}
//# sourceMappingURL=sale.js.map