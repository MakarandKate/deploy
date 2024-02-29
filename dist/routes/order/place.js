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
exports.placeOrderRouter = void 0;
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const Order_1 = require("../../api/models/Order");
const OrderRepository_1 = require("../../api/repositories/OrderRepository");
const placeOrderRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId;
    let saveOrder = new Order_1.Order();
    saveOrder.createdStamp = saveOrder.updatedStamp = +new Date();
    saveOrder.deletedStamp = 0;
    saveOrder.userId = userId;
    saveOrder.status = Order_1.OrderStatus.Placed;
    saveOrder._localUUID = Utils_1.default.getUUID();
    saveOrder._is = +new Date();
    saveOrder = yield OrderRepository_1.OrderRepository.save(saveOrder);
    try {
        let collectionName = 'Order';
        let latestDocumentUpdateStamp = saveOrder.updatedStamp;
        let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${saveOrder.userId}_${collectionName}`);
        let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
        if (userIdCollectionStamp < latestDocumentUpdateStamp) {
            yield (0, RedisApp_1.SetToRedis)(`${saveOrder.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
        }
    }
    catch (err) { }
    res.send({
        userId,
        order: saveOrder
    });
});
exports.placeOrderRouter = placeOrderRouter;
//# sourceMappingURL=place.js.map