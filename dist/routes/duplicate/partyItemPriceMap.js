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
exports.duplicatePartyItemPriceMapRouter = void 0;
const PartyItemPriceMapRepository_1 = require("../../api/repositories/PartyItemPriceMapRepository");
const duplicatePartyItemPriceMapRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let duprs = yield PartyItemPriceMapRepository_1.PartyItemPriceMapRepository.aggregate([
        {
            $match: {
                _is: { $gt: ((+new Date()) - (36 * 60 * 60 * 1000)) }
            },
        },
        {
            $group: {
                _id: {
                    _localUUID: '$_localUUID',
                },
                count: {
                    $sum: 1,
                }
            },
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $limit: 100000
        }
    ]).toArray();
    let arr = [];
    duprs === null || duprs === void 0 ? void 0 : duprs.forEach((el) => {
        if (el.count > 1) {
            arr.push(el);
        }
    });
    console.info("Total duplicates ", arr.length);
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        let allDocs = yield PartyItemPriceMapRepository_1.PartyItemPriceMapRepository.find({
            where: {
                _localUUID: el._id._localUUID
            }
        });
        console.info("Deleting ", i, arr.length, allDocs.length);
        allDocs.sort((a, b) => {
            return b.updatedStamp - a.updatedStamp;
        });
        console.info("allDocs", allDocs.length);
        allDocs.shift();
        allDocs.forEach((el) => {
            PartyItemPriceMapRepository_1.PartyItemPriceMapRepository.delete(el._id);
        });
    }
    res.send({ arr });
});
exports.duplicatePartyItemPriceMapRouter = duplicatePartyItemPriceMapRouter;
//# sourceMappingURL=partyItemPriceMap.js.map