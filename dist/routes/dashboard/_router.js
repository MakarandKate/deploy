"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sale_1 = require("./sale");
const sale2_1 = require("./sale2");
const inactive_1 = require("./inactive");
const lastBill_1 = require("./lastBill");
const checkup_1 = require("./checkup");
const router = (0, express_1.Router)();
router.get('/sales', sale_1.saleRouter);
router.get('/clean', sale_1.cleanRouter);
router.get('/sales2', sale2_1.sale2Router);
router.get('/inactive', inactive_1.inactiveRouter);
router.get('/lastBill', lastBill_1.lastBillRouter);
router.get('/lastBillData', lastBill_1.lastBillDataRouter);
router.get('/checkup', checkup_1.checkupRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map