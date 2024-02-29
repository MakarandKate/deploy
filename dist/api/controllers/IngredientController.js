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
exports.IngredientController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const IngredientService_1 = require("../services/IngredientService");
const Ingredient_1 = require("../models/Ingredient");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let IngredientController = class IngredientController {
    constructor(ingredientService) {
        this.ingredientService = ingredientService;
    }
    save(req, ingredient) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientService.save(ingredient);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    saveAll(req, ingredient, serverSyncStamp, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let records = yield this.ingredientService.saveAll(ingredient, phone);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    getByUUID(req, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientService.getByUUID(uuid);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    getWithOpeningStockByUUID(req, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.ingredientService.getWithOpeningStockByUUID(uuid);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    getAllByProfile(req, profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let records = yield this.ingredientService.getAllByProfile(phone, profileId);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    getAllWithOpeningStockByProfile(req, profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let records = yield this.ingredientService.getAllWithOpeningStockByProfile(phone, profileId);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    fetchAll(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.ingredientService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    fetchAllv3(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.ingredientService.fetchAllv3(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
    fetchAllv4(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = userId;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.ingredientService.fetchAllv4(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Ingredient" } };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/save'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('ingredient')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Ingredient_1.Ingredient]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('array')),
    __param(2, (0, routing_controllers_1.BodyParam)('serverSyncStamp')),
    __param(3, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Number, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "saveAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/getByUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getByUUID", null);
__decorate([
    (0, routing_controllers_1.Get)('/getWithOpeningStockByUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getWithOpeningStockByUUID", null);
__decorate([
    (0, routing_controllers_1.Get)('/getAllByProfile'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('profileId')),
    __param(2, (0, routing_controllers_1.QueryParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getAllByProfile", null);
__decorate([
    (0, routing_controllers_1.Get)('/getAllWithOpeningStockByProfile'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('profileId')),
    __param(2, (0, routing_controllers_1.QueryParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "getAllWithOpeningStockByProfile", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "fetchAllv3", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv4'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IngredientController.prototype, "fetchAllv4", null);
IngredientController = __decorate([
    (0, routing_controllers_1.Controller)('/ingredient')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [IngredientService_1.IngredientService])
], IngredientController);
exports.IngredientController = IngredientController;
//# sourceMappingURL=IngredientController.js.map