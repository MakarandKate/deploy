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
exports.viewRouter = void 0;
const CalcRecordRepository_1 = require("../../api/repositories/CalcRecordRepository");
const Page_1 = require("../../lib/Page");
const viewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let savedRecords = [];
    try {
        savedRecords = yield CalcRecordRepository_1.CalcRecordRepository.find({
            where: {},
            order: {
                updatedStamp: -1
            },
            take: 1000
        });
    }
    catch (err) {
    }
    savedRecords.forEach((rec) => {
        rec = rec.expand();
        if (rec.recordText) {
            try {
                rec.recordObject = JSON.parse(rec.recordText);
            }
            catch (err) {
            }
        }
    });
    res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { savedRecords }));
});
exports.viewRouter = viewRouter;
//# sourceMappingURL=view.js.map