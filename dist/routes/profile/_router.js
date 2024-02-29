"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restore_1 = require("./restore");
const router = (0, express_1.Router)();
router.get('/restore', restore_1.getDeletedProfiles);
router.post('/restore', restore_1.restoreProfile);
exports.default = router;
//# sourceMappingURL=_router.js.map