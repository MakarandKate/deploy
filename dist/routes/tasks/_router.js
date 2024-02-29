"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sevenDayReMarketing_1 = require("./sevenDayReMarketing");
const licenceReCheck_1 = require("./licenceReCheck");
const router = (0, express_1.Router)();
router.get('/sevenDayReMarketing', sevenDayReMarketing_1.sevenDayReMarketingRouter);
router.get('/licenceRecheck', licenceReCheck_1.licenceRecheckRouter);
router.get('/licenceRecheckAfter30min', licenceReCheck_1.licenceRecheckAfter30MinRouter);
router.get('/licenceRecheckForDay', licenceReCheck_1.licenceRecheckForDayRouter);
router.get('/licenseRecheckAll', licenceReCheck_1.licenceRecheckAllRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map