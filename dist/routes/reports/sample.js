"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRouter = void 0;
const Page_1 = require("../../lib/Page");
const ExcelJS = __importStar(require("exceljs"));
const sampleRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    const worksheet = workbook.addWorksheet('My Sheet');
    //worksheet.columns = [];
    // Add a couple of Rows by key-value, after the last current row, using the column keys
    //worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
    //worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(2023,1,7)});
    // Add a row by contiguous Array (assign to columns A, B & C)
    worksheet.addRow(['Title 1', '', '', '', 'Title 2', '', 'Title 3', '', '']);
    worksheet.mergeCells('A1:D1');
    worksheet.mergeCells('E1:F1');
    worksheet.mergeCells('G1:I1');
    worksheet.addRow(['ST 1a', 'ST 1b', 'ST 1c', 'ST 1d', 'ST 2a', 'ST 2b', 'ST 3a', 'ST 3b', 'ST 3c']);
    worksheet.addRow(['val 1', 'val 2', 'val 3', 'val 4', 'val 5', 'val 6', 'val 7', 'val 8', 'val 9']);
    worksheet.addRow(['val 1', 'val 2', 'val 3', 'val 4', 'val 5', 'val 6', 'val 7', 'val 8', 'val 9']);
    worksheet.addRow(['val 1', 'val 2', 'val 3', 'val 4', 'val 5', 'val 6', 'val 7', 'val 8', 'val 9']);
    yield workbook.xlsx.writeFile('abc.xls');
    res.send(Page_1.StatusSuccess);
});
exports.sampleRouter = sampleRouter;
//# sourceMappingURL=sample.js.map