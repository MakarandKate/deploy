"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activate_1 = require("./activate");
const initiate_1 = require("./initiate");
const getExpiring_1 = require("./getExpiring");
const renewalReport_1 = require("./renewalReport");
const router = (0, express_1.Router)();
router.get('/initiate/:phone', initiate_1.initiateViewRouter);
router.get('/activate', activate_1.activateViewRouter);
router.post('/activate', activate_1.activate);
router.get('/getExpiring', getExpiring_1.getExpiringViewRouter);
router.post('/getExpiringByTimeRange', getExpiring_1.getExpiringByTimeRange);
router.get('/renewal/report', renewalReport_1.getRenewalReportViewRouter);
router.post('/renewal/getReportData', renewalReport_1.getRenewalReportDataRouter);
router.post('/renewal/getAllCSVData', renewalReport_1.getAllCSVData);
exports.default = router;
//# sourceMappingURL=_router.js.map