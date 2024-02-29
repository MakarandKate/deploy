"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_1 = require("./otp");
const router = (0, express_1.Router)();
router.get('/view', otp_1.otpViewRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map