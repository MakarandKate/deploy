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
exports.partyDeleteRouter = exports.partyListViewRouter = exports.deleteRouter = exports.listViewRouter = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ItemService_1 = require("../../api/services/ItemService");
const ItemRepository_1 = require("../../api/repositories/ItemRepository");
const PartyRepository_1 = require("../../api/repositories/PartyRepository");
const Party_1 = require("../../api/models/Party");
const PartyService_1 = require("../../api/services/PartyService");
const itemService = typedi_1.default.get(ItemService_1.ItemService);
const partyService = typedi_1.default.get(PartyService_1.PartyService);
const partyRef = new Party_1.Party();
const listViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            title: 'Item Bulk Delete',
            description: '',
            view: 'bulk/delete',
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
exports.listViewRouter = listViewRouter;
const deleteRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    let userId = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId) || '';
    let profileId = ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.profileId) || '';
    let selectedItems = ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.selectedItems) || [];
    if (userId && profileId && (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length)) {
        for (let i = 0; i < selectedItems.length; i++) {
            yield itemService.deleteItem(userId, profileId, selectedItems[i]);
        }
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.deleteRouter = deleteRouter;
const partyListViewRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    let userId = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.userId;
    let profileId = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.profileId;
    if (userId && profileId) {
        let allParties = yield PartyRepository_1.PartyRepository.find({
            where: {
                userId,
                profileId,
                deletedStamp: 0
            }
        });
        let parties = [];
        allParties.forEach(el => {
            el = partyRef === null || partyRef === void 0 ? void 0 : partyRef.expand(el);
            if (!(el === null || el === void 0 ? void 0 : el.deletedStamp) && !(el === null || el === void 0 ? void 0 : el.isCashSaleParty)) {
                parties.push(el);
            }
        });
        parties.sort((a, b) => {
            return (a === null || a === void 0 ? void 0 : a.name) > (b === null || b === void 0 ? void 0 : b.name) ? 1 : -1;
        });
        (0, Page_1.setPage)(req, res, {
            title: 'Party Bulk Delete',
            description: '',
            view: 'bulk/partyDelete',
            data: {
                userId,
                profileId,
                parties
            }
        });
    }
    else {
        return res.status(400).send("Invalid userId or profileId");
    }
});
exports.partyListViewRouter = partyListViewRouter;
const partyDeleteRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k;
    let userId = ((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.userId) || '';
    let profileId = ((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.profileId) || '';
    let selectedParties = ((_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.selectedParties) || [];
    if (userId && profileId && (selectedParties === null || selectedParties === void 0 ? void 0 : selectedParties.length)) {
        for (let i = 0; i < selectedParties.length; i++) {
            yield partyService.deleteParty(userId, profileId, selectedParties[i]);
        }
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.partyDeleteRouter = partyDeleteRouter;
//# sourceMappingURL=delete.js.map