"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = require("./chat");
const router = (0, express_1.Router)();
router.get('/chat/:phone', chat_1.chatRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map