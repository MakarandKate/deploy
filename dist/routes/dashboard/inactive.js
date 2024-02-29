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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inactiveRouter = void 0;
const Page_1 = require("../../lib/Page");
const SaleRepository_1 = require("../../api/repositories/SaleRepository");
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const ezo_connect_wa_1 = require("@makarandkate/ezo-connect-wa");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const inactiveRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let currentDate = new Date();
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    let todayStartStamp = +new Date(+currentDate);
    let inactiveDays = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.inactiveDays) || 2;
    let taggtele = Boolean((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.taggtele) || false;
    let startStamp = todayStartStamp - (inactiveDays * (24 * 60 * 60 * 1000));
    let endStamp = startStamp + (24 * 60 * 60 * 1000);
    let sales = yield SaleRepository_1.SaleRepository.find({
        where: {
            createdStamp: {
                $gte: startStamp
            }
        }
    });
    let users = {};
    sales.forEach((el) => {
        let st = Number(users[el.userId]) || 0;
        if (Number(el.createdStamp) > st) {
            users[el.userId] = el.createdStamp;
        }
    });
    let usersArrRaw = [];
    for (let k in users) {
        if (users[k] <= endStamp) {
            usersArrRaw.push({
                phone: k,
                createdStamp: users[k],
                isPro: false
            });
        }
    }
    for (let i = 0; i < usersArrRaw.length; i++) {
        let licencearr = yield LicenceRepository_1.LicenceRepository.find({
            where: {
                userId: usersArrRaw[i].phone
            }
        });
        if (licencearr && licencearr[0]) {
            let lic = licencearr[0];
            if (lic.proExpiryStamp > (todayStartStamp /*+(7*24*60*60*1000)*/)) {
                usersArrRaw[i].isPro = true;
            }
        }
    }
    let usersArr = [];
    usersArrRaw.forEach((el) => {
        if (el.isPro) {
            usersArr.push(el);
        }
    });
    usersArr.sort((a, b) => {
        return a.createdStamp - b.createdStamp;
    });
    if (taggtele) {
        sendTaggtele(usersArr, inactiveDays);
    }
    (0, Page_1.setPage)(req, res, {
        title: 'Dashboard',
        description: 'dash',
        view: 'dashboard/inactive',
        data: {
            usersArr,
            inactiveDays
        }
    });
});
exports.inactiveRouter = inactiveRouter;
const sendTaggtele = (usersArr, inactiveDays) => __awaiter(void 0, void 0, void 0, function* () {
    let dayWiseAudioFileNames = {
        '2': 'ActivationYesterday.wav',
        '3': 'Activation02Days.wav',
        '4': 'Activation03Days.wav',
        '8': 'Activation07Days.wav',
        '16': 'Activation15Days.wav',
        '31': 'Activation30Days.wav',
    };
    for (let i = 0; i < usersArr.length; i++) {
        const user = usersArr[i];
        Utils_1.default.wait(50);
        ezo_connect_wa_1.Taggtele.telephonicCall({
            phone: user === null || user === void 0 ? void 0 : user.phone,
            voiceFile: dayWiseAudioFileNames[`${inactiveDays}`],
            serviceNumber: '7317178132',
            retryAttempt: 1,
            retryDuration: 15 * 60,
        });
    }
});
//# sourceMappingURL=inactive.js.map