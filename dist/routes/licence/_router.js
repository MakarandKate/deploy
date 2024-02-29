"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_1 = require("./update");
const setPro_1 = require("./setPro");
const router = (0, express_1.Router)();
router.post('/update', update_1.updateLicenseRouter);
router.post('/updateMessageCredit', update_1.updateMessageCreditRouter);
router.get('/unprocessed', update_1.unprocessedRouter);
router.get('/setPro/:phone/:expiryStamp', setPro_1.setProRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map