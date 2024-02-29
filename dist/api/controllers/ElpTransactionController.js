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
exports.ElpTransactionController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ablyLoader_1 = require("../../loaders/ablyLoader");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const ElpTransactionService_1 = require("../services/ElpTransactionService");
const ElpTransaction_1 = require("../models/ElpTransaction");
let ElpTransactionController = class ElpTransactionController {
    constructor(elpTransactionService) {
        this.elpTransactionService = elpTransactionService;
    }
    save(req, elpTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.elpTransactionService.save(elpTransaction);
            (0, ablyLoader_1.broadCastMessage)(phone, {
                type: 'ElpTransaction',
            });
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
    getByUUID(req, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.elpTransactionService.getByUUID(uuid);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
    getByPartyUUID(req, uuid, profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.elpTransactionService.getByPartyUUID(uuid, profileId, userId);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
    getAllByProfile(req, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.elpTransactionService.getAllByProfile(phone, profileId);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
    saveAll(req, elpTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.elpTransactionService.saveAll(elpTransaction, phone);
            (0, ablyLoader_1.broadCastMessage)(phone, {
                type: 'ElpTransaction',
            });
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
    fetchAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.elpTransactionService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
    fetchAllv3(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.elpTransactionService.fetchAllv3(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "ElpTransaction" } };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/save'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('array')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ElpTransaction_1.ElpTransaction]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "save", null);
__decorate([
    (0, routing_controllers_1.Get)('/getByUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "getByUUID", null);
__decorate([
    (0, routing_controllers_1.Get)('/getByPartyUUID'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('uuid')),
    __param(2, (0, routing_controllers_1.QueryParam)('profileId')),
    __param(3, (0, routing_controllers_1.QueryParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "getByPartyUUID", null);
__decorate([
    (0, routing_controllers_1.Get)('/getAllByProfile'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.QueryParam)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "getAllByProfile", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('array')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "saveAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ElpTransactionController.prototype, "fetchAllv3", null);
ElpTransactionController = __decorate([
    (0, routing_controllers_1.Controller)('/elpTransaction')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [ElpTransactionService_1.ElpTransactionService])
], ElpTransactionController);
exports.ElpTransactionController = ElpTransactionController;
//# sourceMappingURL=ElpTransactionController.js.map