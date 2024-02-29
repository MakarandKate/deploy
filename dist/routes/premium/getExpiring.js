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
exports.getExpiringByTimeRange = exports.getExpiringViewRouter = void 0;
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const Page_1 = require("../../lib/Page");
const getExpiringViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, Page_1.setPage)(req, res, {
        title: 'Expiring Licence',
        description: '',
        view: 'premium/getExpiring',
    });
});
exports.getExpiringViewRouter = getExpiringViewRouter;
/**
 *
 * @param req req with body having startTime and endTime
 * @param res status along with Lincences
 * @returns it will return all lincence that will expire in upcoming days
 */
const getExpiringByTimeRange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let startTime = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.startTime;
    let endTime = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.endTime;
    if (startTime && endTime) {
        let licences = yield LicenceRepository_1.LicenceRepository.find({
            where: {
                proExpiryStamp: {
                    $gte: +startTime,
                    $lte: +endTime
                },
                deletedStamp: 0
            },
            order: {
                proExpiryStamp: -1
            }
        });
        if (licences) {
            return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { licences }));
        }
        return res.send(Object.assign({}, Page_1.StatusFailed));
    }
    return res.send(Object.assign({}, Page_1.StatusFailed));
});
exports.getExpiringByTimeRange = getExpiringByTimeRange;
//# sourceMappingURL=getExpiring.js.map