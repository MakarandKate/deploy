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
exports.lastBillDataRouter = exports.lastBillRouter = void 0;
const Page_1 = require("../../lib/Page");
const SaleRepository_1 = require("../../api/repositories/SaleRepository");
const request_1 = __importDefault(require("request"));
const Utils_1 = __importDefault(require("../../lib/Utils"));
const Helpers_1 = require("../../lib/Helpers");
const lastBillRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deliveredDateStart = Number(req.query.deliveredDateStart);
    if (!deliveredDateStart) {
        deliveredDateStart = Utils_1.default.todayStartStamp();
    }
    let deliveredArr = yield getDelivered(deliveredDateStart);
    (0, Page_1.setPage)(req, res, {
        title: 'lastBill',
        description: 'lastBill',
        view: 'dashboard/lastBill',
        data: {
            deliveredArr
        }
    });
});
exports.lastBillRouter = lastBillRouter;
const lastBillDataRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let phone = req.query.phone;
    let reg = yield getRegistration(phone + '');
    if (!reg) {
        yield Utils_1.default.wait(500);
        reg = yield getRegistration(phone + '');
    }
    if (!reg) {
        return res.send({});
    }
    let sales = [];
    let appType = 'Fire';
    if (reg.ezo_lightning) {
        sales = yield SaleRepository_1.SaleRepository.find({
            where: {
                userId: phone
            },
            order: {
                createdStamp: -1
            }
        });
        appType = 'Fast';
    }
    res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { totalSales: sales.length, lastBillStamp: ((_a = sales[0]) === null || _a === void 0 ? void 0 : _a.createdStamp) || 0, lastBillDate: Helpers_1.Helpers.fns.stampToSimpleDate(((_b = sales[0]) === null || _b === void 0 ? void 0 : _b.createdStamp) || 0), appType }));
});
exports.lastBillDataRouter = lastBillDataRouter;
function getDelivered(dt) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let options = {
                'method': 'GET',
                'url': `https://ops.ezobooks.in/kappa/api/admin/delivery/getDeliveredByDate?dt=${dt}`
            };
            try {
                (0, request_1.default)(options, (error, response) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        console.error("-----------------------");
                        console.error("lastBill:71");
                        console.error(error);
                        console.error("-----------------------");
                        return resolve([]);
                    }
                    if (response === null || response === void 0 ? void 0 : response.body) {
                        try {
                            let obj = JSON.parse(response.body);
                            return resolve(obj.result);
                        }
                        catch (err) {
                            return resolve([]);
                        }
                    }
                    return resolve([]);
                }));
            }
            catch (error) {
                return resolve([]);
            }
        });
    });
}
function getRegistration(phone) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let options = {
                'method': 'GET',
                'url': `https://ezobanks.com:5001/api/v2/user/proUserStampByPhone?phone=${phone}`
            };
            try {
                (0, request_1.default)(options, (error, response) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        console.error("-----------------------");
                        console.error("lastBill:111");
                        console.error(error);
                        console.error("-----------------------");
                        return resolve(null);
                    }
                    if (response === null || response === void 0 ? void 0 : response.body) {
                        try {
                            let obj = JSON.parse(response.body);
                            return resolve(obj);
                        }
                        catch (err) {
                            return resolve(null);
                        }
                    }
                    return resolve(null);
                }));
            }
            catch (error) {
                return resolve(null);
            }
        });
    });
}
//# sourceMappingURL=lastBill.js.map