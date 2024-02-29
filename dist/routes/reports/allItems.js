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
Object.defineProperty(exports, "__esModule", { value: true });
exports.allItems = void 0;
const Page_1 = require("../../lib/Page");
const ItemRepository_1 = require("../../api/repositories/ItemRepository");
const allItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let phone = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.phone;
    let allItems = yield ItemRepository_1.ItemRepository.find({
        where: {
            userId: phone,
        },
        take: 10,
    });
    return res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { items: allItems }));
});
exports.allItems = allItems;
//# sourceMappingURL=allItems.js.map