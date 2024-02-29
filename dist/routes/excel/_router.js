"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const excel_1 = require("./excel");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.Router)();
router.get('/profiles', excel_1.excelProfileViewRouter);
router.get('/upload', excel_1.excelUploadViewRouter);
router.get('/partyUpload', excel_1.excelPartyUploadViewRouter);
router.post('/save', [(0, express_fileupload_1.default)()], excel_1.saveExcelRouter);
router.post('/saveParty', [(0, express_fileupload_1.default)()], excel_1.savePartyExcelRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map