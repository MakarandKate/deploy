"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const record_1 = require("./record");
const view_1 = require("./view");
const router = (0, express_1.Router)();
router.post('/record', record_1.recordRouter);
router.get('/view', view_1.viewRouter);
router.post('/deviceAuth', record_1.deviceAuthRouter);
router.post('/dataEntry', record_1.dataEntryRouter);
router.get('/deviceValid', record_1.deviceValidRouter);
router.post('/wifiTest', record_1.wifiTestRouter);
router.get('/version', record_1.versionRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map