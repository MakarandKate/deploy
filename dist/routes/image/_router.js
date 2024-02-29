"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getImage_1 = require("./getImage");
const router = (0, express_1.Router)();
router.get('/get/:userId/:profileId/:_localUUID', getImage_1.getImageRouter);
router.get('/getUnProceesed', getImage_1.getUnprocessed);
router.get('/task', getImage_1.task);
exports.default = router;
//# sourceMappingURL=_router.js.map