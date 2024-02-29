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
exports.checkupRouter = void 0;
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SaleService_1 = require("../../api/services/SaleService");
const UserService_1 = require("../../api/services/UserService");
const SaleRepository_1 = require("../../api/repositories/SaleRepository");
const DummyRepository_1 = require("../../api/repositories/DummyRepository");
const Dummy_1 = require("../../api/models/Dummy");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const saleService = typeorm_typedi_extensions_1.Container.get(SaleService_1.SaleService);
const userService = typeorm_typedi_extensions_1.Container.get(UserService_1.UserService);
const checkupRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    let totalCount = yield saleService.dashTotalBetweenTime(0, +new Date());
    let todayCount = yield saleService.dashTotalBetweenTime(todayStartStamp, +new Date());
    let arr = yield SaleRepository_1.SaleRepository.find({
        where: {},
        take: 10
    });
    let dum = new Dummy_1.Dummy();
    dum.createdStamp = +new Date();
    dum.updatedStamp = +new Date();
    dum.deletedStamp = 0;
    dum._localUUID = Utils_1.default.getUUID();
    dum.age = 21;
    dum.amount = 8;
    let x = yield DummyRepository_1.DummyRepository.save(dum);
    res.send({
        status: "success",
        totalCount,
        todayCount,
        arr,
        x
    });
});
exports.checkupRouter = checkupRouter;
//# sourceMappingURL=checkup.js.map