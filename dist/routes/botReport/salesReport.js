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
exports.salesReport = void 0;
const typedi_1 = __importDefault(require("typedi"));
const SaleService_1 = require("../../api/services/SaleService");
const saleService = typedi_1.default.get(SaleService_1.SaleService);
//@UseBefore(express.json({limit:'500mb'}))
const salesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let phone = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.phone;
        let lastSyncStamp = Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.lastSyncStamp);
        let records = yield saleService.getSaleReport(phone, lastSyncStamp);
        if (records) {
            res.status(200).send({
                records,
            });
        }
        else {
            res.status(400).send({
                message: "Invalid Parameters",
            });
        }
    }
    catch (error) {
        // Handle any errors that occur during the execution of the code
        console.error('Error:', error);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
});
exports.salesReport = salesReport;
//# sourceMappingURL=salesReport.js.map