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
exports.ImageController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ablyLoader_1 = require("../../loaders/ablyLoader");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const ImageService_1 = require("../services/ImageService");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    saveAll(req, itemCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.imageService.saveAll(itemCategories, phone);
            (0, ablyLoader_1.broadCastMessage)(phone, {
                type: 'Image',
            });
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Image" } };
        });
    }
    fetchAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.imageService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Image" } };
        });
    }
    fetchAllv3(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.imageService.fetchAllv3(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Image" } };
        });
    }
    fetchAllv4(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.imageService.fetchAllv4(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Image" } };
        });
    }
    getImage(req, userId, profileId, _localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let imageBase64 = yield this.imageService.getImage(userId, profileId, _localUUID);
            return { userId, profileId, _localUUID, imageBase64 };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/saveAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('array')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "saveAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "fetchAllv3", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv4'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "fetchAllv4", null);
__decorate([
    (0, routing_controllers_1.Get)('/get/:userId/:profileId/:_localUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Param)('userId')),
    __param(2, (0, routing_controllers_1.Param)('profileId')),
    __param(3, (0, routing_controllers_1.Param)('_localUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getImage", null);
ImageController = __decorate([
    (0, routing_controllers_1.Controller)('/image')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [ImageService_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=ImageController.js.map