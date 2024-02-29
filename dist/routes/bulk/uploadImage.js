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
exports.deleteRouter = exports.uploadImageRouter = void 0;
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ItemService_1 = require("../../api/services/ItemService");
const ItemRepository_1 = require("../../api/repositories/ItemRepository");
const ImageService_1 = require("../../api/services/ImageService");
const RedisApp_1 = require("../../lib/RedisApp");
const itemService = typedi_1.default.get(ItemService_1.ItemService);
const imageService = typedi_1.default.get(ImageService_1.ImageService);
const uploadImageRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.profileId;
    let itemId = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.itemId;
    let base64 = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.base64;
    if (userId && profileId && itemId && base64) {
        let image = yield imageService.saveImageByData(userId, profileId, base64);
        if (image === null || image === void 0 ? void 0 : image._localUUID) {
            let item = yield ItemRepository_1.ItemRepository.findOne({
                where: {
                    _localUUID: itemId,
                    userId,
                    profileId,
                    deletedStamp: 0,
                }
            });
            if (item && (item === null || item === void 0 ? void 0 : item._localUUID)) {
                item.images = [];
                item.images.push(image._localUUID);
                delete item._id;
                item.updatedStamp = +new Date();
                item._is = +new Date();
                let updateResult = yield ItemRepository_1.ItemRepository.updateMany({
                    _localUUID: item._localUUID
                }, {
                    "$set": Object.assign({}, item)
                });
                try {
                    let document = item;
                    let collectionName = 'Item';
                    let latestDocumentUpdateStamp = document.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${document.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${document.profileId}_${collectionName}`, latestDocumentUpdateStamp + '');
                    }
                }
                catch (err) {
                }
                return res.send(Object.assign({}, Page_1.StatusSuccess));
            }
        }
        return res.send(Object.assign({}, Page_1.StatusFailed));
    }
    else {
        return res.send(Object.assign({}, Page_1.StatusFailed));
    }
});
exports.uploadImageRouter = uploadImageRouter;
const deleteRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    let userId = ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.userId) || '';
    let profileId = ((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.profileId) || '';
    let selectedItems = ((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.selectedItems) || [];
    if (userId && profileId && selectedItems) {
        for (let i = 0; i < selectedItems.length; i++) {
            yield itemService.deleteItem(userId, profileId, selectedItems[i]);
        }
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.deleteRouter = deleteRouter;
//# sourceMappingURL=uploadImage.js.map