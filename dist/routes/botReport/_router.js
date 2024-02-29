"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesReport_1 = require("./salesReport");
const moneyInReport_1 = require("./moneyInReport");
const moneyOutReport_1 = require("./moneyOutReport");
const purchaseReport_1 = require("./purchaseReport");
const router = (0, express_1.Router)();
router.get('/saleReport', salesReport_1.salesReport);
router.get('/moneyInReport', moneyInReport_1.moneyInReport);
router.get('/moneyOutReport', moneyOutReport_1.moneyOutReport);
router.get('/purchaseReport', purchaseReport_1.purchaseReport);
// http://localhost:4150/kappa/botReport/saleReport?phone=9998887775&lastSyncStamp=1684261800000
// http://localhost:4150/kappa/botReport/moneyInReport?phone=9998887775&lastSyncStamp=1684261800000
// http://localhost:4150/kappa/botReport/moneyOutReport?phone=9998887775&lastSyncStamp=1684261800000
// http://localhost:4150/kappa/botReport/purchaseReport?phone=9998887775&lastSyncStamp=1684261800000
exports.default = router;
//# sourceMappingURL=_router.js.map