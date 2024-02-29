"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const place_1 = require("./place");
const router = (0, express_1.Router)();
router.post('/place', place_1.placeOrderRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map