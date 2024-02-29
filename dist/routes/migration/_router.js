"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const process_1 = require("./process");
const router = (0, express_1.Router)();
router.get('/process', process_1.processRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map