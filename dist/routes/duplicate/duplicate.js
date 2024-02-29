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
exports.duplicateAllRouter = void 0;
const Page_1 = require("../../lib/Page");
const request_1 = __importDefault(require("request"));
const Utils_1 = __importDefault(require("../../lib/Utils"));
const Config_1 = require("../../Config");
const duplicateAllRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let arr = [
        'estimate', 'image', 'item',
        'itemCategory', 'itemStockAdjust', 'itemUnit',
        'kot', 'licence', 'moneyIn',
        'moneyOut', 'party', 'partyCategory',
        'partyItemPriceMap', 'profile', 'purchase',
        'sale', 'user'
    ];
    for (let i = 0; i < arr.length; i++) {
        console.info(`Removing deplicates from ${arr[i]}`);
        yield makeGetCall(`${Config_1.Config.domain}/duplicate/${arr[i]}`);
        yield Utils_1.default.wait(100);
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.duplicateAllRouter = duplicateAllRouter;
function makeGetCall(url) {
    return new Promise((resolve, reject) => {
        try {
            (0, request_1.default)(url, (error, response) => {
                if (error) {
                    console.error("-----------------------");
                    console.error("duplicate:37");
                    console.error(error);
                    console.error("-----------------------");
                }
                resolve(true);
            });
        }
        catch (err) {
            resolve(true);
        }
    });
}
//# sourceMappingURL=duplicate.js.map