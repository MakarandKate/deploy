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
exports.OrderController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ablyLoader_1 = require("../../loaders/ablyLoader");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const Order_1 = require("../models/Order");
const OrderService_1 = require("../services/OrderService");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getByUUID(req) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let _localUUID = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a._localUUID;
            let profileId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.profileId;
            let userId = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId;
            let record = yield this.orderService.getByUUID(_localUUID, profileId, userId);
            return { record, meta: { collection: "Order" } };
        });
    }
    save(req, order) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield this.orderService.save(order);
            return { record, meta: { collection: "Order" } };
        });
    }
    saveAll(req, itemCategories) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.orderService.saveAll(itemCategories, phone);
            (0, ablyLoader_1.broadCastMessage)(phone, {
                type: 'Order',
            });
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Order" } };
        });
    }
    getAll(req, status, startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.orderService.getAll(phone, status, startStamp, endStamp);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Order" } };
        });
    }
    fetchAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.orderService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Order" } };
        });
    }
    fetchAllv3(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.orderService.fetchAllv3(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Order" } };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/getByUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getByUUID", null);
__decorate([
    (0, routing_controllers_1.Post)('/save'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Order_1.Order]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('array')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "saveAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/getAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('status')),
    __param(2, (0, routing_controllers_1.QueryParam)('startStamp')),
    __param(3, (0, routing_controllers_1.QueryParam)('endStamp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "fetchAllv3", null);
OrderController = __decorate([
    (0, routing_controllers_1.Controller)('/order')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [OrderService_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map