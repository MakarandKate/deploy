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
exports.task = exports.getUnprocessed = exports.getImageRouter = void 0;
const fs_1 = __importDefault(require("fs"));
const Config_1 = require("../../Config");
const ImageRepository_1 = require("../../api/repositories/ImageRepository");
const Page_1 = require("../../lib/Page");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const getImageRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
    let profileId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.profileId;
    let _localUUID = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c._localUUID;
    if (userId && profileId && _localUUID) {
        let folderName = userId + "/" + profileId;
        let folderPath = Config_1.Config.imageUpload + '/' + folderName;
        let filePath = folderPath + "/" + _localUUID + ".png";
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.readFile(filePath, (err, file) => {
                if (err) {
                    res.setHeader('Content-Type', 'image/png');
                    return res.sendStatus(404);
                }
                res.setHeader('Content-Type', 'image/png');
                res.setHeader('Content-Disposition', `inline; filename="${_localUUID}.png"`);
                return res.send(file);
            });
        }
        else {
            res.setHeader('Content-Type', 'image/png');
            return res.sendStatus(404);
        }
    }
    else {
        res.setHeader('Content-Type', 'image/png');
        return res.sendStatus(404);
    }
});
exports.getImageRouter = getImageRouter;
const getUnprocessed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    proceessImages();
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.getUnprocessed = getUnprocessed;
function proceessImages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let processed = false;
            let unprocessedArr = yield ImageRepository_1.ImageRepository.find({
                where: {
                    imageBase64: {
                        $ne: ""
                    }
                },
                order: {
                    createdStamp: -1
                },
                take: 10
            });
            if (unprocessedArr && unprocessedArr.length) {
                for (let i = 0; i < unprocessedArr.length; i++) {
                    let userId = unprocessedArr[i].userId;
                    let profileId = unprocessedArr[i].profileId;
                    let _localUUID = unprocessedArr[i]._localUUID;
                    if (userId && profileId && _localUUID) {
                        let folderName = userId + "/" + profileId;
                        let folderPath = Config_1.Config.imageUpload + '/' + folderName;
                        let filePath = folderPath + "/" + _localUUID + ".png";
                        let fileExists = fs_1.default.existsSync(filePath);
                        if (!fileExists) {
                            try {
                                if (!fs_1.default.existsSync(folderPath)) {
                                    fs_1.default.mkdirSync(folderPath, { recursive: true });
                                }
                                fs_1.default.writeFileSync(filePath, Buffer.from(unprocessedArr[i].imageBase64, "base64"));
                            }
                            catch (err) {
                            }
                        }
                        yield ImageRepository_1.ImageRepository.updateMany({
                            _localUUID
                        }, {
                            "$set": {
                                _is: +new Date(),
                                imageBase64: ""
                            }
                        });
                        processed = true;
                    }
                }
            }
            setTimeout(() => {
                if (processed) {
                    proceessImages();
                }
            });
        }
        catch (err) {
        }
    });
}
const task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let rawImages = yield ImageRepository_1.ImageRepository.find({
        where: {},
        order: {
            createdStamp: -1
        },
        take: 3000
    });
    let items = [];
    rawImages.forEach((el) => {
        let item = {
            itemName: Utils_1.default.generateRandomString(Utils_1.default.getRandomInt(5, 20)),
            itemPrice: Utils_1.default.getRandomInt(100, 400),
            itemBarcode: Utils_1.default.getRandomInt(100, 999) + '' + Utils_1.default.getRandomInt(100, 999) + '' + Utils_1.default.getRandomInt(100, 999),
            url: `https://db.ezobooks.in/kappa/image/get/${el.userId}/${el.profileId}/${el._localUUID}`
        };
        items.push(item);
    });
    res.send(Object.assign(Object.assign({}, Page_1.StatusSuccess), { items }));
});
exports.task = task;
//# sourceMappingURL=getImage.js.map