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
exports.sale2Router = void 0;
const Page_1 = require("../../lib/Page");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SaleService_1 = require("../../api/services/SaleService");
const UserService_1 = require("../../api/services/UserService");
const saleService = typeorm_typedi_extensions_1.Container.get(SaleService_1.SaleService);
const userService = typeorm_typedi_extensions_1.Container.get(UserService_1.UserService);
const sale2Router = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    let todayStartStamp = +new Date(+currentDate);
    let day2StartStamp = todayStartStamp - (2 * 24 * 60 * 60 * 1000);
    let hrourWise = [];
    for (let i = 0; i < 72; i++) {
        let sstamp = day2StartStamp + (i * (60 * 60 * 1000));
        hrourWise.push(yield saleService.dashTotalBetweenTime(sstamp, sstamp + (60 * 60 * 1000)));
    }
    let totalCount = yield saleService.dashTotalBetweenTime(0, +new Date());
    let topUsersAllTime = yield saleService.dashMostUsedBetweenTime(0, +new Date());
    let topUsersToday = yield saleService.dashMostUsedBetweenTime(todayStartStamp, +new Date());
    let topUsersLastHour = yield saleService.dashMostUsedBetweenTime((+new Date) - (60 * 60 * 1000), +new Date());
    let currentActiveUsers = yield userService.dashCurrentActiveUsers();
    let mapPins = [
        ['Lat', 'Long', 'User'],
    ];
    for (let i = 0; i < currentActiveUsers.length; i++) {
        if (currentActiveUsers[i].lat && currentActiveUsers[i].long) {
            mapPins.push([currentActiveUsers[i].lat, currentActiveUsers[i].long, currentActiveUsers[i].phone]);
        }
    }
    let totalRegistrationDay0 = yield userService.dashRegistrationInTime(todayStartStamp, +new Date());
    let totalRegistrationDay1 = yield userService.dashRegistrationInTime(todayStartStamp - (1 * 24 * 60 * 60 * 1000), todayStartStamp - (0 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay2 = yield userService.dashRegistrationInTime(todayStartStamp - (2 * 24 * 60 * 60 * 1000), todayStartStamp - (1 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay3 = yield userService.dashRegistrationInTime(todayStartStamp - (3 * 24 * 60 * 60 * 1000), todayStartStamp - (2 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay4 = yield userService.dashRegistrationInTime(todayStartStamp - (4 * 24 * 60 * 60 * 1000), todayStartStamp - (3 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay5 = yield userService.dashRegistrationInTime(todayStartStamp - (5 * 24 * 60 * 60 * 1000), todayStartStamp - (4 * 24 * 60 * 60 * 1000));
    let totalRegistrationDay6 = yield userService.dashRegistrationInTime(todayStartStamp - (6 * 24 * 60 * 60 * 1000), todayStartStamp - (5 * 24 * 60 * 60 * 1000));
    let hhData = [];
    const chunkSize = 24;
    for (let i = 0; i < hrourWise.length; i += chunkSize) {
        const chunk = hrourWise.slice(i, i + chunkSize);
        hhData.push(chunk);
    }
    console.info(hhData);
    let graph2 = JSON.stringify([
        ['Hours', 'Count', { role: 'annotation' }],
        ['1', hhData[2][0], hhData[2][0]],
        ['2', hhData[2][1], hhData[2][1]],
        ['3', hhData[2][2], hhData[2][2]],
        ['4', hhData[2][3], hhData[2][3]],
        ['5', hhData[2][4], hhData[2][4]],
        ['6', hhData[2][5], hhData[2][5]],
        ['7', hhData[2][6], hhData[2][6]],
        ['8', hhData[2][7], hhData[2][7]],
        ['9', hhData[2][8], hhData[2][8]],
        ['10', hhData[2][9], hhData[2][9]],
        ['11', hhData[2][10], hhData[2][10]],
        ['12', hhData[2][11], hhData[2][11]],
        ['13', hhData[2][12], hhData[2][12]],
        ['14', hhData[2][13], hhData[2][13]],
        ['15', hhData[2][14], hhData[2][14]],
        ['16', hhData[2][15], hhData[2][15]],
        ['17', hhData[2][16], hhData[2][16]],
        ['18', hhData[2][17], hhData[2][17]],
        ['19', hhData[2][18], hhData[2][18]],
        ['20', hhData[2][19], hhData[2][19]],
        ['21', hhData[2][20], hhData[2][20]],
        ['22', hhData[2][21], hhData[2][21]],
        ['23', hhData[2][22], hhData[2][22]],
        ['24', hhData[2][23], hhData[2][23]],
    ]);
    let graph0 = JSON.stringify([
        ['Hours', 'Count', { role: 'annotation' }],
        ['1', hhData[0][0], hhData[0][0]],
        ['2', hhData[0][1], hhData[0][1]],
        ['3', hhData[0][2], hhData[0][2]],
        ['4', hhData[0][3], hhData[0][3]],
        ['5', hhData[0][4], hhData[0][4]],
        ['6', hhData[0][5], hhData[0][5]],
        ['7', hhData[0][6], hhData[0][6]],
        ['8', hhData[0][7], hhData[0][7]],
        ['9', hhData[0][8], hhData[0][8]],
        ['10', hhData[0][9], hhData[0][9]],
        ['11', hhData[0][10], hhData[0][10]],
        ['12', hhData[0][11], hhData[0][11]],
        ['13', hhData[0][12], hhData[0][12]],
        ['14', hhData[0][13], hhData[0][13]],
        ['15', hhData[0][14], hhData[0][14]],
        ['16', hhData[0][15], hhData[0][15]],
        ['17', hhData[0][16], hhData[0][16]],
        ['18', hhData[0][17], hhData[0][17]],
        ['19', hhData[0][18], hhData[0][18]],
        ['20', hhData[0][19], hhData[0][19]],
        ['21', hhData[0][20], hhData[0][20]],
        ['22', hhData[0][21], hhData[0][21]],
        ['23', hhData[0][22], hhData[0][22]],
        ['24', hhData[0][23], hhData[0][23]],
    ]);
    let graph1 = JSON.stringify([
        ['Hours', 'Count', { role: 'annotation' }],
        ['1', hhData[1][0], hhData[1][0]],
        ['2', hhData[1][1], hhData[1][1]],
        ['3', hhData[1][2], hhData[1][2]],
        ['4', hhData[1][3], hhData[1][3]],
        ['5', hhData[1][4], hhData[1][4]],
        ['6', hhData[1][5], hhData[1][5]],
        ['7', hhData[1][6], hhData[1][6]],
        ['8', hhData[1][7], hhData[1][7]],
        ['9', hhData[1][8], hhData[1][8]],
        ['10', hhData[1][9], hhData[1][9]],
        ['11', hhData[1][10], hhData[1][10]],
        ['12', hhData[1][11], hhData[1][11]],
        ['13', hhData[1][12], hhData[1][12]],
        ['14', hhData[1][13], hhData[1][13]],
        ['15', hhData[1][14], hhData[1][14]],
        ['16', hhData[1][15], hhData[1][15]],
        ['17', hhData[1][16], hhData[1][16]],
        ['18', hhData[1][17], hhData[1][17]],
        ['19', hhData[1][18], hhData[1][18]],
        ['20', hhData[1][19], hhData[1][19]],
        ['21', hhData[1][20], hhData[1][20]],
        ['22', hhData[1][21], hhData[1][21]],
        ['23', hhData[1][22], hhData[1][22]],
        ['24', hhData[1][23], hhData[1][23]],
    ]);
    (0, Page_1.setPage)(req, res, {
        title: 'Dashboard',
        description: 'dash',
        view: 'dashboard/sale2',
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
            topUsersAllTime,
            topUsersToday,
            topUsersLastHour,
            totalCount,
            graph0,
            graph1,
            graph2
        }
    });
});
exports.sale2Router = sale2Router;
//# sourceMappingURL=sale2.js.map