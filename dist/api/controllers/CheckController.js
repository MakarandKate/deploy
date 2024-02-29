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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const RedisService_1 = require("../services/RedisService");
const Page_1 = require("../../lib/Page");
const LoginTokenService_1 = require("../services/LoginTokenService");
let CheckController = class CheckController {
    constructor(redisService, loginTokenService) {
        this.redisService = redisService;
        this.loginTokenService = loginTokenService;
    }
    fetchAll(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let uuid = locals._uuid;
            let collectionWiseLastSyncStamp = req.body.collectionWiseLastSyncStamp || {};
            if (!collectionWiseLastSyncStamp.Item) {
                collectionWiseLastSyncStamp = req.body;
            }
            let collections = {
                "CutOffDay": false,
                "Estimate": false,
                "Expense": false,
                "Image": false,
                "Ingredient": false,
                "IngredientStockAdjust": false,
                "ItemCategory": false,
                "Item": false,
                "ItemStockAdjust": false,
                "ItemUnit": false,
                "Kot": false,
                "Licence": false,
                "MoneyIn": false,
                "MoneyOut": false,
                "Order": false,
                "PartyCategory": false,
                "Party": false,
                "PartyItemPriceMap": false,
                "Profile": false,
                "Purchase": false,
                "Sale": false,
            };
            let collectionArr = Object.keys(collections);
            for (let i = 0; i < (collectionArr === null || collectionArr === void 0 ? void 0 : collectionArr.length); i++) {
                let collectionName = collectionArr[i];
                if (collectionWiseLastSyncStamp.hasOwnProperty(collectionArr[i])) {
                    collections[collectionArr[i]] = yield this.redisService.isUpdateAvailable(phone, (_a = collectionWiseLastSyncStamp[collectionName]) === null || _a === void 0 ? void 0 : _a.lastSyncStamp, (_b = collectionWiseLastSyncStamp[collectionName]) === null || _b === void 0 ? void 0 : _b.accessProfiles, collectionName);
                }
            }
            let isLogoutRequest = yield this.loginTokenService.isLogoutRequest(uuid);
            return Object.assign(Object.assign({}, Page_1.StatusSuccess), { collections,
                isLogoutRequest });
        });
    }
    fetchAllv3(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let uuid = locals._uuid;
            let collectionWiseLastSyncStamp = req.body.collectionWiseLastSyncStamp || {};
            if (!collectionWiseLastSyncStamp.Item) {
                collectionWiseLastSyncStamp = req.body;
            }
            let collections = {
                "CutOffDay": false,
                "Estimate": false,
                "Expense": false,
                "Image": false,
                "Ingredient": false,
                "IngredientStockAdjust": false,
                "ItemCategory": false,
                "Item": false,
                "ItemStockAdjust": false,
                "ItemUnit": false,
                "Kot": false,
                "Licence": false,
                "MoneyIn": false,
                "MoneyOut": false,
                "Order": false,
                "PartyCategory": false,
                "Party": false,
                "PartyItemPriceMap": false,
                "Profile": false,
                "Purchase": false,
                "Sale": false,
            };
            let collectionArr = Object.keys(collections);
            for (let i = 0; i < (collectionArr === null || collectionArr === void 0 ? void 0 : collectionArr.length); i++) {
                let collectionName = collectionArr[i];
                if (collectionWiseLastSyncStamp.hasOwnProperty(collectionArr[i])) {
                    collections[collectionArr[i]] = yield this.redisService.isUpdateAvailable(phone, (_a = collectionWiseLastSyncStamp[collectionName]) === null || _a === void 0 ? void 0 : _a.lastSyncStamp, (_b = collectionWiseLastSyncStamp[collectionName]) === null || _b === void 0 ? void 0 : _b.accessProfiles, collectionName);
                }
            }
            let isLogoutRequest = yield this.loginTokenService.isLogoutRequest(uuid);
            return Object.assign(Object.assign({}, Page_1.StatusSuccess), { collections,
                isLogoutRequest });
        });
    }
    licenceFetchAllv3(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let uuid = locals._uuid;
            let collectionWiseLastSyncStamp = req.body.collectionWiseLastSyncStamp || {};
            let collections = {
                "Licence": false,
            };
            let collectionArr = Object.keys(collections);
            for (let i = 0; i < (collectionArr === null || collectionArr === void 0 ? void 0 : collectionArr.length); i++) {
                let collectionName = collectionArr[i];
                if (collectionWiseLastSyncStamp.hasOwnProperty(collectionArr[i])) {
                    collections[collectionArr[i]] = yield this.redisService.isUpdateAvailable(phone, (_a = collectionWiseLastSyncStamp[collectionName]) === null || _a === void 0 ? void 0 : _a.lastSyncStamp, (_b = collectionWiseLastSyncStamp[collectionName]) === null || _b === void 0 ? void 0 : _b.accessProfiles, collectionName);
                }
            }
            let isLogoutRequest = yield this.loginTokenService.isLogoutRequest(uuid);
            return Object.assign(Object.assign({}, Page_1.StatusSuccess), { collections,
                isLogoutRequest });
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckController.prototype, "fetchAllv3", null);
__decorate([
    (0, routing_controllers_1.Post)('/licenceFetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CheckController.prototype, "licenceFetchAllv3", null);
CheckController = __decorate([
    (0, routing_controllers_1.Controller)('/check')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [RedisService_1.RedisService,
        LoginTokenService_1.LoginTokenService])
], CheckController);
exports.CheckController = CheckController;
//# sourceMappingURL=CheckController.js.map