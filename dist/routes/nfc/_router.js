"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("./order");
const router = (0, express_1.Router)();
router.get('/order/:phone', order_1.orderRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map