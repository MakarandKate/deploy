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
exports.duplicateLicenceRouter = void 0;
const LicenceRepository_1 = require("../../api/repositories/LicenceRepository");
const duplicateLicenceRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let duprs = yield LicenceRepository_1.LicenceRepository.aggregate([
        {
            $match: {},
        },
        {
            $group: {
                _id: {
                    userId: '$userId',
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
            $limit: 20000000
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
        let allDocs = yield LicenceRepository_1.LicenceRepository.find({
            where: {
                userId: el._id.userId
            }
        });
        console.info("Deleting ", i, arr.length, allDocs.length);
        allDocs.sort((a, b) => {
            return b.proActivationStamp - a.proActivationStamp;
        });
        console.info("allDocs", allDocs.length);
        allDocs.shift();
        allDocs.forEach((el) => {
            LicenceRepository_1.LicenceRepository.delete(el._id);
        });
    }
    res.send({ arr });
});
exports.duplicateLicenceRouter = duplicateLicenceRouter;
//# sourceMappingURL=licence.js.map