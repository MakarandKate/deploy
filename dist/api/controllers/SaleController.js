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
exports.SaleController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ablyLoader_1 = require("../../loaders/ablyLoader");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const SaleService_1 = require("../services/SaleService");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let SaleController = class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
    }
    getAllDeleted(req, profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let records = yield this.saleService.getAllDeleted(profileId, userId);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Sale" } };
        });
    }
    saveAll(req, sales) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let v = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.v) || 'old';
            let a = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.a) || 'a';
            // console.info(`SaleController:40: p:${phone} | v:${v} | a:${a}`);
            let records = yield this.saleService.saveAll(sales, phone, v, a);
            let uniqueProfiles = [];
            for (let i = 0; i < records.length; i++) {
                if (uniqueProfiles.indexOf(records[i].profileId) == -1) {
                    uniqueProfiles.push(records[i].profileId);
                }
            }
            // uniqueProfiles.forEach((profileId:string)=>{
            //     SyncPublish(profileId);
            // })
            (0, ablyLoader_1.broadCastMessage)(phone, {
                type: 'Sale',
            });
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Sale" } };
        });
    }
    fetchAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.saleService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Sale" } };
        });
    }
    fetchAllv3(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let compressResponse = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.compressResponse) || false;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let v = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.v) || 'old';
            let records = yield this.saleService.fetchAllv3(phone, lastSyncStamp, accessProfiles, v, compressResponse);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Sale" } };
        });
    }
    fetchAllv4(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let compressResponse = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.compressResponse) || false;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let v = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.v) || 'old';
            let records = yield this.saleService.fetchAllv4(phone, lastSyncStamp, accessProfiles, v, compressResponse);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Sale" } };
        });
    }
    fetchAllv3Clone(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let compressResponse = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.compressResponse) || false;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let v = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.v) || 'old';
            let records = yield this.saleService.fetchAllv3Clone(phone, lastSyncStamp, accessProfiles, v, compressResponse);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Sale" } };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/getAllDeleted'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('profileId')),
    __param(2, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "getAllDeleted", null);
__decorate([
    (0, routing_controllers_1.Post)('/saveAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('array')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "saveAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "fetchAllv3", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv4'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "fetchAllv4", null);
__decorate([
    (0, routing_controllers_1.Post)('/fetchAllv3Clone'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SaleController.prototype, "fetchAllv3Clone", null);
SaleController = __decorate([
    (0, routing_controllers_1.Controller)('/sale')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [SaleService_1.SaleService])
], SaleController);
exports.SaleController = SaleController;
//# sourceMappingURL=SaleController.js.map