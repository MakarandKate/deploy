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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePartyExcelRouter = exports.saveExcelRouter = exports.excelProfileViewRouter = exports.excelPartyUploadViewRouter = exports.excelUploadViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const ExcelJS = __importStar(require("exceljs"));
const Config_1 = require("../../Config");
const Item_1 = require("../../api/models/Item");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const typedi_1 = __importDefault(require("typedi"));
const ItemService_1 = require("../../api/services/ItemService");
const fs_1 = __importDefault(require("fs"));
const ItemCategoryService_1 = require("../../api/services/ItemCategoryService");
const ItemCategory_1 = require("../../api/models/ItemCategory");
const Party_1 = require("../../api/models/Party");
const PartyService_1 = require("../../api/services/PartyService");
const ItemStockAdjust_1 = require("../../api/models/ItemStockAdjust");
const ItemStockAdjustService_1 = require("../../api/services/ItemStockAdjustService");
const itemService = typedi_1.default.get(ItemService_1.ItemService);
const itemCategoryService = typedi_1.default.get(ItemCategoryService_1.ItemCategoryService);
const itemStockAdjustService = typedi_1.default.get(ItemStockAdjustService_1.ItemStockAdjustService);
const partyService = typedi_1.default.get(PartyService_1.PartyService);
const excelUploadViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.profileId;
    if (userId && profileId) {
        (0, Page_1.setPage)(req, res, {
            title: 'Excel Upload',
            description: '',
            view: 'excel/upload',
            data: {
                userId,
                profileId
            }
        });
    }
    else {
        return res.status(400).send("Invalid userId or profileId");
    }
});
exports.excelUploadViewRouter = excelUploadViewRouter;
const excelPartyUploadViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    let userId = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.userId;
    let profileId = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.profileId;
    if (userId && profileId) {
        (0, Page_1.setPage)(req, res, {
            title: 'Excel Upload',
            description: '',
            view: 'excel/partyUpload',
            data: {
                userId,
                profileId
            }
        });
    }
    else {
        return res.status(400).send("Invalid userId or profileId");
    }
});
exports.excelPartyUploadViewRouter = excelPartyUploadViewRouter;
const excelProfileViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    let phone = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.phone;
    (0, Page_1.setPage)(req, res, {
        title: 'Excel Profiles',
        description: '',
        view: 'excel/profiles',
        data: {
            phone,
        }
    });
});
exports.excelProfileViewRouter = excelProfileViewRouter;
const saveExcelRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    if ((_f = req === null || req === void 0 ? void 0 : req.files) === null || _f === void 0 ? void 0 : _f.uploadFile) {
        // @ts-ignore
        let uploadFile = req.files.uploadFile;
        let userId = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.userId;
        let profileId = (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.profileId;
        if (userId && profileId) {
            if (!fs_1.default.existsSync(Config_1.Config.excelUploadPath)) {
                fs_1.default.mkdirSync(Config_1.Config.excelUploadPath, { recursive: true });
            }
            let fileName = Utils_1.default.generateRandomString(20);
            uploadFile.mv(Config_1.Config.excelUploadPath + '/' + fileName, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.send("failed");
                }
                let itemCategory = yield itemCategoryService.fetchAllv3(userId, 0, null);
                let categories = [];
                itemCategory === null || itemCategory === void 0 ? void 0 : itemCategory.forEach(x => {
                    if ((x === null || x === void 0 ? void 0 : x.profileId) == profileId && !(x === null || x === void 0 ? void 0 : x.deletedStamp)) {
                        categories.push(x.name);
                    }
                });
                // read from a file
                const workbook = new ExcelJS.Workbook();
                yield workbook.xlsx.readFile(Config_1.Config.excelUploadPath + '/' + fileName);
                // ... use workbook
                let workSheet = workbook.getWorksheet(1);
                let workSheetArr = [];
                workSheet.eachRow((row, rowNumber) => __awaiter(void 0, void 0, void 0, function* () {
                    if (rowNumber >= 5) {
                        workSheetArr.push(row);
                    }
                }));
                for (let i = 0; i < workSheetArr.length; i++) {
                    let row = workSheetArr[i];
                    const item = getMappedItem(row.values, userId, profileId);
                    if ((item === null || item === void 0 ? void 0 : item.itemName) && (item === null || item === void 0 ? void 0 : item.sellPrice) >= 0) {
                        let savedItem = yield itemService.save(item);
                        if (savedItem === null || savedItem === void 0 ? void 0 : savedItem.stock) {
                            const itemStockAdjust = new ItemStockAdjust_1.ItemStockAdjust();
                            itemStockAdjust.quantity = savedItem === null || savedItem === void 0 ? void 0 : savedItem.stock;
                            itemStockAdjust.linkedItemUUID = savedItem === null || savedItem === void 0 ? void 0 : savedItem._localUUID;
                            itemStockAdjust.note = 'Initial Stock From Excel Upload';
                            itemStockAdjust.userId = userId;
                            itemStockAdjust.profileId = profileId;
                            itemStockAdjust.createdBy = itemStockAdjust.lastModifiedBy = userId;
                            itemStockAdjust._localUUID = Utils_1.default.getUUID();
                            let timeStamp = +new Date();
                            itemStockAdjust.createdStamp = timeStamp;
                            itemStockAdjust.updatedStamp = timeStamp;
                            itemStockAdjust.deletedStamp = 0;
                            itemStockAdjust.syncStamp = timeStamp;
                            yield itemStockAdjustService.save(itemStockAdjust);
                        }
                        if (savedItem === null || savedItem === void 0 ? void 0 : savedItem.category) {
                            if (!categories.includes(savedItem.category)) {
                                let ct = new ItemCategory_1.ItemCategory();
                                ct.userId = userId;
                                ct.profileId = profileId;
                                let timeStamp = +new Date();
                                ct.createdStamp = timeStamp;
                                ct.updatedStamp = timeStamp;
                                ct.deletedStamp = 0;
                                ct.syncStamp = timeStamp;
                                ct._localUUID = Utils_1.default.getUUID();
                                ct.name = savedItem.category;
                                let itemCat = yield itemCategoryService.save(ct);
                                categories.push(itemCat.name);
                            }
                        }
                    }
                }
                setTimeout(() => {
                    fs_1.default.unlink(Config_1.Config.excelUploadPath + '/' + fileName, () => {
                        console.info('file deleted');
                    });
                }, 3 * 60 * 1000);
                return res.send("File Upload complete");
            }));
        }
        else {
            return res.send("Wrong request");
        }
    }
    else {
        return res.send("Wrong request");
    }
});
exports.saveExcelRouter = saveExcelRouter;
const savePartyExcelRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l;
    if ((_j = req === null || req === void 0 ? void 0 : req.files) === null || _j === void 0 ? void 0 : _j.uploadFile) {
        // @ts-ignore
        let uploadFile = req.files.uploadFile;
        let userId = (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.userId;
        let profileId = (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.profileId;
        if (userId && profileId) {
            if (!fs_1.default.existsSync(Config_1.Config.excelUploadPath)) {
                fs_1.default.mkdirSync(Config_1.Config.excelUploadPath, { recursive: true });
            }
            let fileName = Utils_1.default.generateRandomString(20);
            uploadFile.mv(Config_1.Config.excelUploadPath + '/' + fileName, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.send("failed");
                }
                // read from a file
                const workbook = new ExcelJS.Workbook();
                yield workbook.xlsx.readFile(Config_1.Config.excelUploadPath + '/' + fileName);
                // ... use workbook
                let workSheet = workbook.getWorksheet(1);
                let workSheetArr = [];
                workSheet.eachRow((row, rowNumber) => __awaiter(void 0, void 0, void 0, function* () {
                    if (rowNumber >= 5) {
                        workSheetArr.push(row);
                    }
                }));
                for (let i = 0; i < workSheetArr.length; i++) {
                    let row = workSheetArr[i];
                    const party = getMappedParty(row.values, userId, profileId);
                    if (party) {
                        let savedParty = yield partyService.save(party);
                    }
                }
                setTimeout(() => {
                    fs_1.default.unlink(Config_1.Config.excelUploadPath + '/' + fileName, () => {
                        console.info('file deleted');
                    });
                }, 3 * 60 * 1000);
                return res.send("File Upload complete");
            }));
        }
        else {
            return res.send("Wrong request");
        }
    }
    else {
        return res.send("Wrong request");
    }
});
exports.savePartyExcelRouter = savePartyExcelRouter;
function getMappedItem(excelItem, userId, profileId) {
    var _a;
    try {
        if (excelItem === null || excelItem === void 0 ? void 0 : excelItem.length) {
            const item = new Item_1.Item();
            item.userId = userId;
            item.profileId = profileId;
            let timeStamp = +new Date();
            item.createdStamp = timeStamp;
            item.updatedStamp = timeStamp;
            item.deletedStamp = 0;
            item.syncStamp = timeStamp;
            item._localUUID = Utils_1.default.getUUID();
            for (let i = 0; i < excelItem.length; i++) {
                if (excelItem[i] && ((_a = excelItem[i]) === null || _a === void 0 ? void 0 : _a.result)) {
                    excelItem[i] = excelItem[i].result;
                }
            }
            item.itemName = excelItem[1] ? Utils_1.default.capitalFirstLetter(excelItem[1] + '') : null;
            item.itemName = item.itemName ? (item.itemName + '').trim() : item.itemName;
            item.sellPrice = Number(excelItem[2]) || 0.0;
            item.mrp = Number(excelItem[3]) || 0.0;
            item.purchasePrice = Number(excelItem[4]) || 0.0;
            item.primaryUnit = Utils_1.default.unitAbvrMapReverse[excelItem[5]] || '';
            item.category = excelItem[6];
            item.category = item.category ? (item.category + '').trim() : item.category;
            if (excelItem[7] != null || excelItem[7] != undefined) {
                if (excelItem[7] == 'Exempted') {
                    item.taxPercentage = 0;
                    item.isTaxExempted = 1;
                    item.isTaxZero = 0;
                }
                else if (excelItem[7] == 0) {
                    item.taxPercentage = 0;
                    item.isTaxExempted = 0;
                    item.isTaxZero = 1;
                }
                else if (excelItem[7] > 0) {
                    item.taxPercentage = Number(excelItem[7]);
                }
            }
            item.spIncTax = true;
            if (excelItem[8] == 'Tax Amt Excluded') {
                item.spIncTax = false;
            }
            item.type = 'Product';
            if (excelItem[9] == 'Service') {
                item.type = 'Service';
            }
            if (excelItem[10]) {
                item.hsn = excelItem[10];
            }
            if (excelItem[11]) {
                item.barcode = excelItem[11];
            }
            if (excelItem[12]) {
                item.itemCode = excelItem[12];
            }
            if (excelItem[13]) {
                item.description = excelItem[13];
            }
            item.stock = Number(excelItem[14]) || 0.0;
            if (excelItem[15]) {
                item.minStock = Number(excelItem[15]);
            }
            if (excelItem[16]) {
                item.storageLocation = excelItem[16];
            }
            if (excelItem[17]) {
                item.cessPercentage = Number(excelItem[17]);
            }
            if (excelItem[18]) {
                item.onlineDeliverySellPrice = Number(excelItem[18]);
            }
            if (excelItem[19]) {
                item.acSellPrice = Number(excelItem[19]);
            }
            if (excelItem[20]) {
                item.nonAcSellPrice = Number(excelItem[20]);
            }
            return item;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.error("error parsing excel ", userId, profileId, excelItem);
    }
}
function getMappedParty(excelParty, userId, profileId) {
    var _a;
    if (excelParty === null || excelParty === void 0 ? void 0 : excelParty.length) {
        const party = new Party_1.Party();
        party.userId = userId;
        party.profileId = profileId;
        let timeStamp = +new Date();
        party.createdStamp = timeStamp;
        party.updatedStamp = timeStamp;
        party.deletedStamp = 0;
        party.syncStamp = timeStamp;
        party._localUUID = Utils_1.default.getUUID();
        for (let i = 0; i < excelParty.length; i++) {
            if (excelParty[i] && ((_a = excelParty[i]) === null || _a === void 0 ? void 0 : _a.result)) {
                excelParty[i] = excelParty[i].result;
            }
        }
        party.businessName = Utils_1.default.capitalFirstLetter(excelParty[1]) || '';
        party.name = Utils_1.default.capitalFirstLetter(excelParty[2]);
        party.name = party.name ? (party.name + '').trim() : party.name;
        party.phone = (excelParty[3] + '').replace(/ /g, '').replace(/\+91/g, '').replace(/undefined/, '');
        party.email = excelParty[4] || '';
        //party.pan =  excelParty[5] || '';
        party.gstin = excelParty[6] || '';
        party.billingAddress = excelParty[7] || '';
        //party.billingCity = excelParty[8] || '';
        party.billingProvience = excelParty[9] || '';
        party.billingPostalCode = excelParty[10] || '';
        party.deliveryAddress = excelParty[11] || '';
        //party.deliveryCity = excelParty[12] || '';
        party.deliveryProvience = excelParty[13] || '';
        party.deliveryPostalCode = excelParty[14] || '';
        //party.tan = excelParty[15] || '';
        //party.bankAccountNumber = excelParty[16] || '';
        //party.bankName = excelParty[17] || '';
        //party.bankIfsc = excelParty[18] || '';
        //party.bankAccountType = excelParty[19] || '';
        //party.upi = excelParty[20] || '';
        //party.creditLimit = Number(excelParty[21]) || 0;
        //party.monthlyAlertDate = Number(excelParty[22]) || 0;
        //party.smsAlert = Number(excelParty[23]) || 0;
        //party.billingType = excelParty[24] || '';
        return party;
    }
    else {
        return null;
    }
}
// [
//     [0]   <1 empty item>,
//     [1]   'Demo ITEM Vivo V19 Red 256 GB',
//     [2]   26999,
//     [3]   31999,
//     [4]   24000,
//     [5]   'Box',
//     [6]   'Vivo Mobile',
//     [7]   0.25,
//     [8]   'Tax Amt Included',
//     [9]   'Product',
//     [10]   45,
//     [11]   123456789,
//     [12]   <1 empty item>,
//     [13]   'One Year Warrenty, Charger and Head Phone Included',
//     [14]   10,
//     [15]   5,
//     [16]   'rack 1',
//     [17]   <1 empty item>,
//     [18]   26999,
//     [19]   26999,
//     [20]   26999
//     [21] ]
//# sourceMappingURL=excel.js.map