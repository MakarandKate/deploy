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
exports.IngredientStockAdjustController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const IngredientStockAdjustService_1 = require("../services/IngredientStockAdjustService");
const IngredientStockAdjust_1 = require("../models/IngredientStockAdjust");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let IngredientStockAdjustController = class IngredientStockAdjustController {
    constructor(ingredientsStockAdjustService) {
        this.ingredientsStockAdjustService = ingredientsStockAdjustService;
    }
    save(req, ingredientStockAdjust) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientsStockAdjustService.save(ingredientStockAdjust);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    saveAll(req, ingredientStockAdjusts, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let records = yield this.ingredientsStockAdjustService.saveAll(ingredientStockAdjusts, phone);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    getByUUID(req, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientsStockAdjustService.getByUUID(uuid);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    getAllByProfile(req, profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let records = yield this.ingredientsStockAdjustService.getAllByProfile(phone, profileId);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    getTransactions(req, linkedIngredientUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientsStockAdjustService.getTransactions(linkedIngredientUUID);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    getYesterdayEOD(req, linkedIngredientUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientsStockAdjustService.getYesterdayEOD(linkedIngredientUUID);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    fetchAll(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.ingredientsStockAdjustService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    fetchAllv3(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.ingredientsStockAdjustService.fetchAllv3(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
    fetchAllv4(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.ingredientsStockAdjustService.fetchAllv4(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "IngredientStockAdjust" } };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/save'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('ingredientStockAdjust')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, IngredientStockAdjust_1.IngredientStockAdjust]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('ingredientStockAdjusts')),
    __param(2, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "saveAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/getByUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "getByUUID", null);
__decorate([
    (0, routing_controllers_1.Get)('/getAllByProfile'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('profileId')),
    __param(2, (0, routing_controllers_1.QueryParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "getAllByProfile", null);
__decorate([
    (0, routing_controllers_1.Get)('/getTransactions'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('linkedIngredientUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "getTransactions", null);
__decorate([
    (0, routing_controllers_1.Get)('/getYesterdayEOD'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('linkedIngredientUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "getYesterdayEOD", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "fetchAllv3", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv4'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientStockAdjustController.prototype, "fetchAllv4", null);
IngredientStockAdjustController = __decorate([
    (0, routing_controllers_1.Controller)('/ingredientStockAdjust')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [IngredientStockAdjustService_1.IngredientsStockAdjustService])
], IngredientStockAdjustController);
exports.IngredientStockAdjustController = IngredientStockAdjustController;
//# sourceMappingURL=IngredientStockAdjustController.js.map