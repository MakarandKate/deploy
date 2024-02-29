"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const saleView_1 = require("./saleView");
const purchaseView_1 = require("./purchaseView");
const expenseView_1 = require("./expenseView");
const moneyInView_1 = require("./moneyInView");
const moneyOutView_1 = require("./moneyOutView");
const estimateViews_1 = require("./estimateViews");
const router = (0, express_1.Router)();
router.get('/sale/:userId/:saleId', saleView_1.saleViewRouter);
router.get('/purchase/:userId/:purchaseId', purchaseView_1.purchaseViewRouter);
router.get('/expense/:userId/:expenseId', expenseView_1.expenseViewRouter);
router.get('/moneyIn/:userId/:moneyInId', moneyInView_1.moneyInViewRouter);
router.get('/moneyOut/:userId/:moneyOutId', moneyOutView_1.moneyOutViewRouter);
router.get('/estimate/:userId/:estimateId', estimateViews_1.estimateViewRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map