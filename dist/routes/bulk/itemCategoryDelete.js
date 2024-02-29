"use strict";
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
exports.itemCategoryDeleteRouter = exports.itemCategoryListViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ItemService_1 = require("../../api/services/ItemService");
const ItemCategoryService_1 = require("../../api/services/ItemCategoryService");
const ItemCategoryRepository_1 = require("../../api/repositories/ItemCategoryRepository");
const itemService = typedi_1.default.get(ItemService_1.ItemService);
const itemCategoryService = typedi_1.default.get(ItemCategoryService_1.ItemCategoryService);
const itemCategoryListViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.profileId;
    if (userId && profileId) {
        let allItemCategories = yield ItemCategoryRepository_1.ItemCategoryRepository.find({
            where: {
                userId,
                profileId,
                deletedStamp: 0
            }
        });
        let itemCategories = [];
        allItemCategories.forEach(el => {
            if (!el.deletedStamp && el.name) {
                itemCategories.push(el);
            }
            else {
            }
        });
        itemCategories.sort((a, b) => {
            var _a, _b, _c, _d;
            if (((_a = a === null || a === void 0 ? void 0 : a.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = b === null || b === void 0 ? void 0 : b.name) === null || _b === void 0 ? void 0 : _b.toLowerCase())) {
                return (a === null || a === void 0 ? void 0 : a.createdStamp) - (b === null || b === void 0 ? void 0 : b.createdStamp);
            }
            if (((_c = a === null || a === void 0 ? void 0 : a.name) === null || _c === void 0 ? void 0 : _c.toLowerCase()) > ((_d = b === null || b === void 0 ? void 0 : b.name) === null || _d === void 0 ? void 0 : _d.toLowerCase())) {
                return 1;
            }
            return -1;
        });
        itemCategories.sort((a, b) => {
            return a.savedPosition - b.savedPosition;
        });
        (0, Page_1.setPage)(req, res, {
            title: 'Bulk Delete',
            description: '',
            view: 'bulk/itemCategoryDelete',
            data: {
                userId,
                profileId,
                itemCategories
            }
        });
    }
    else {
        return res.status(400).send("Invalid userId or profileId");
    }
});
exports.itemCategoryListViewRouter = itemCategoryListViewRouter;
const itemCategoryDeleteRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    let userId = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId) || '';
    let profileId = ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.profileId) || '';
    let selectedItems = ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.selectedItems) || [];
    if (userId && profileId && selectedItems) {
        for (let i = 0; i < selectedItems.length; i++) {
            let deletedCategory = yield itemCategoryService.deleteItemCategory(userId, profileId, selectedItems[i]);
            if ((deletedCategory === null || deletedCategory === void 0 ? void 0 : deletedCategory._localUUID) && (deletedCategory === null || deletedCategory === void 0 ? void 0 : deletedCategory.deletedStamp)) {
                let items = yield itemService.getItemsByCategory(userId, profileId, deletedCategory === null || deletedCategory === void 0 ? void 0 : deletedCategory.name);
                for (let i = 0; i < items.length; i++) {
                    if (!((_f = items[i]) === null || _f === void 0 ? void 0 : _f.deletedStamp)) {
                        items[i].category = null;
                        yield itemService.update(items[i]);
                    }
                }
            }
        }
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.itemCategoryDeleteRouter = itemCategoryDeleteRouter;
//# sourceMappingURL=itemCategoryDelete.js.map