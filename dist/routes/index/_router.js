"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const index_1 = require("./index");
const router = (0, express_1.Router)();
const indexRouter = typedi_1.default.get(index_1.IndexRouter);
router.get('/', indexRouter.indexRouter);
router.get('/manifest', indexRouter.manifestRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map