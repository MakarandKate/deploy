"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ImageService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Image_1 = require("../models/Image");
const ImageRepository_1 = require("../repositories/ImageRepository");
const fs_1 = __importDefault(require("fs"));
const Config_1 = require("../../Config");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const RedisApp_1 = require("../../lib/RedisApp");
const ImageModel_1 = require("../modelsv2/ImageModel");
let ImageService = class ImageService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(ImageRepository_1.ImageRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ImageRepository_1.ImageRepository.findDeleted();
        });
    }
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            document = Utils_1.default.removeNullKeysRecursively(document);
            document.syncStamp = +new Date();
            if (document.deviceSyncStartStamp) {
                document.syncStamp = document.deviceSyncStartStamp;
            }
            let localId = document._localId;
            delete document._localId;
            let folderName = document.userId + "/" + document.profileId;
            let folderPath = Config_1.Config.imageUpload + '/' + folderName;
            if (!fs_1.default.existsSync(folderPath)) {
                fs_1.default.mkdirSync(folderPath, { recursive: true });
            }
            let fileStr = document.imageBase64;
            let checkDocument = yield ImageRepository_1.ImageRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                    profileId: document.profileId
                },
                order: {
                    updatedStamp: -1
                }
            });
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    try {
                        fs_1.default.writeFileSync(folderPath + '/' + document._localUUID + ".png", Buffer.from(fileStr, "base64"));
                        delete document.imageBase64;
                    }
                    catch (err) {
                    }
                    document._is = +new Date();
                    let updateResult = yield ImageRepository_1.ImageRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield ImageRepository_1.ImageRepository.findOne({
                        where: {
                            _localUUID: document._localUUID,
                            profileId: document.profileId
                        },
                        order: {
                            updatedStamp: -1
                        }
                    });
                    savedDocument._serverIdRef = savedDocument._id.toString();
                    savedDocument._localId = localId;
                    checkDocument = savedDocument;
                }
                else {
                    checkDocument._serverIdRef = checkDocument._id.toString();
                }
            }
            else {
                try {
                    fs_1.default.writeFileSync(folderPath + '/' + document._localUUID + ".png", Buffer.from(fileStr, "base64"));
                    delete document.imageBase64;
                }
                catch (err) {
                }
                document._is = +new Date();
                let savedDocument = yield ImageRepository_1.ImageRepository.save(document);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                checkDocument = savedDocument;
            }
            try {
                let collectionName = 'Image';
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
            if (document.deviceSyncStartStamp) {
                if (checkDocument.syncStamp < document.deviceSyncStartStamp) {
                    checkDocument.syncStamp = document.deviceSyncStartStamp;
                }
            }
            return checkDocument;
        });
    }
    saveAll(images, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedImages = [];
            for (let i = 0; i < (images === null || images === void 0 ? void 0 : images.length); i++) {
                const image = images[i];
                if (!image.userId) {
                    image.userId = phone;
                }
                savedImages.push(yield this.save(image));
            }
            return savedImages;
        });
    }
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Image';
            let images = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                images = yield ImageRepository_1.ImageRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted)
                });
            }
            if (images == null) {
                images = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileImages = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileImages = yield ImageRepository_1.ImageRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted)
                        });
                    }
                    if (profileImages && profileImages.length) {
                        images.push(...profileImages);
                    }
                }
            }
            let rawDocuments = images;
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAllv3(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Image';
            let images = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                images = yield ImageRepository_1.ImageRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (images == null) {
                images = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileImages = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileImages = yield ImageRepository_1.ImageRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profileImages && profileImages.length) {
                        images.push(...profileImages);
                    }
                }
            }
            let rawDocuments = images;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAllv4(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            let collectionName = 'Image';
            let documents = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                let qr = yield ImageModel_1.ImageRepo.find(Object.assign({ userId: phone, updatedStamp: {
                        $gt: lastSyncStamp || 0
                    } }, includeDeleted)).sort({
                    updatedStamp: 1
                }).limit(500);
                if (qr && qr.length) {
                    qr.map((el) => { documents.push(el.toObject()); });
                }
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileDocuments = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        let qr = yield ImageModel_1.ImageRepo.find(Object.assign({ profileId, updatedStamp: {
                                $gt: lastSyncStamp || 0
                            } }, includeDeleted)).sort({
                            updatedStamp: 1
                        }).limit(500);
                        if (qr && qr.length) {
                            qr.map((el) => { profileDocuments.push(el.toObject()); });
                        }
                        if (profileDocuments && profileDocuments.length) {
                            documents.push(...profileDocuments);
                        }
                    }
                }
            }
            let rawDocuments = documents;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    getImage(userId, profileId, imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            let folderName = userId + "/" + profileId;
            let folderPath = Config_1.Config.imageUpload + '/' + folderName;
            let filePath = folderPath + "/" + imageId + ".png";
            try {
                if (fs_1.default.existsSync(filePath)) {
                    return fs_1.default.readFileSync(filePath).toString("base64");
                }
                else {
                    return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF////p8QbyAAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=';
                }
            }
            catch (err) {
                return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF////p8QbyAAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=';
            }
        });
    }
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ImageRepository_1.ImageRepository.delete({
                userId
            });
        });
    }
    saveImageByData(userId, profileId, base64) {
        return __awaiter(this, void 0, void 0, function* () {
            let image = new Image_1.Image();
            image._localUUID = Utils_1.default.getUUID();
            image.createdStamp = image.updatedStamp = +new Date();
            image.deletedStamp = 0;
            image.profileId = profileId;
            image.userId = userId;
            image.imageBase64 = base64;
            return yield this.save(image);
        });
    }
};
ImageService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=ImageService.js.map