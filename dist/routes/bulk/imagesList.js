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
exports.deleteRouter = exports.imagesListViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ItemService_1 = require("../../api/services/ItemService");
const ItemRepository_1 = require("../../api/repositories/ItemRepository");
const itemService = typedi_1.default.get(ItemService_1.ItemService);
const imagesListViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.profileId;
    if (userId && profileId) {
        let allItems = yield ItemRepository_1.ItemRepository.find({
            where: {
                userId,
                profileId,
                deletedStamp: 0
            }
        });
        let items = [];
        allItems.forEach(el => {
            if (!el.deletedStamp && el.itemName) {
                items.push(el);
            }
            else {
            }
        });
        items.sort((a, b) => {
            return a.itemName > b.itemName ? 1 : -1;
        });
        (0, Page_1.setPage)(req, res, {
            title: 'Bulk Item Images',
            description: '',
            view: 'bulk/images',
            data: {
                userId,
                profileId,
                items
            }
        });
    }
    else {
        return res.status(400).send("Invalid userId or profileId");
    }
});
exports.imagesListViewRouter = imagesListViewRouter;
const deleteRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    let userId = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId) || '';
    let profileId = ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.profileId) || '';
    let selectedItems = ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.selectedItems) || [];
    if (userId && profileId && selectedItems) {
        for (let i = 0; i < selectedItems.length; i++) {
            yield itemService.deleteItem(userId, profileId, selectedItems[i]);
        }
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.deleteRouter = deleteRouter;
//# sourceMappingURL=imagesList.js.map