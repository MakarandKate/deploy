"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sample_1 = require("./sample");
const saleReport_1 = require("./saleReport");
const saleWisePnlReport_1 = require("./saleWisePnlReport");
const purchaseReport_1 = require("./purchaseReport");
const moneyInReport_1 = require("./moneyInReport");
const moneyOutReport_1 = require("./moneyOutReport");
const partyReport_1 = require("./partyReport");
const partyReceivablePayableReport_1 = require("./partyReceivablePayableReport");
const stockSummaryReport_1 = require("./stockSummaryReport");
const itemSaleReport_1 = require("./itemSaleReport");
const itemReport_1 = require("./itemReport");
const dayBookReport_1 = require("./dayBookReport");
const allItems_1 = require("./allItems");
const router = (0, express_1.Router)();
router.get('/sample', sample_1.sampleRouter);
router.get('/saleReport', saleReport_1.saleReport);
router.get('/saleWisePnlReport', saleWisePnlReport_1.saleWisePnlReport);
router.get('/purchaseReport', purchaseReport_1.purchaseReport);
router.get('/moneyInReport', moneyInReport_1.moneyInReport);
router.get('/moneyOutReport', moneyOutReport_1.moneyOutReport);
router.get('/partyReport', partyReport_1.partyReport);
router.get('/partyReceivablePayableReport', partyReceivablePayableReport_1.partyReceivablePayableReport);
router.get('/stockSummaryReport', stockSummaryReport_1.stockSummaryReport);
router.get('/itemSaleReport', itemSaleReport_1.itemSaleReport);
router.get('/itemReport', itemReport_1.itemReport);
router.get('/dayBookReport/:phone/:profileId/:startStamp/:endStamp', dayBookReport_1.dayBookReport);
router.get('/dayBookReportMsg/:phone/:profileId/:startStamp/:endStamp', dayBookReport_1.dayBookReportMsg);
router.get('/activeUsers/:days', dayBookReport_1.activeUsers);
router.post('/allItems', allItems_1.allItems);
exports.default = router;
// urls
// saleReport :- http://localhost:4150/kappa/reports/saleReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// saleWisePnlReport :- http://localhost:4150/kappa/reports/saleWisePnlReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// purchaseReport :- http://localhost:4150/kappa/reports/purchaseReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// moneyInReport :- http://localhost:4150/kappa/reports/moneyInReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// moneyOutReport :- http://localhost:4150/kappa/reports/moneyOutReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// partyReport :- http://localhost:4150/kappa/reports/partyReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000&partyUUID=0b32edf8-eebe-4cba-aebc-3a6f4843f2b3
// partyReceivablePayableReport :- http://localhost:4150/kappa/reports/partyReceivablePayableReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119
// stockSummaryReport :- http://localhost:4150/kappa/reports/stockSummaryReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// itemSaleReport :- http://localhost:4150/kappa/reports/itemSaleReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
// itemReport :- http://localhost:4150/kappa/reports/itemReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000&itemUUID=157c34a9-cd8d-4115-898f-8872d833a32c
// dayBookReport :- http://localhost:4150/kappa/reports/dayBookReport?phone=9998887775&profileId=9c1f7557-541d-40b9-a774-5468e98b213b69119&startStamp=1680287400000&endStamp=1684261800000
//# sourceMappingURL=_router.js.map