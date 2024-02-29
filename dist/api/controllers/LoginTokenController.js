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
exports.LoginTokenController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const LoginTokenService_1 = require("../services/LoginTokenService");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const Page_1 = require("../../lib/Page");
let LoginTokenController = class LoginTokenController {
    constructor(loginTokenService) {
        this.loginTokenService = loginTokenService;
    }
    fetchAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let lastSyncStamp = Number(req.body.lastSyncStamp) || 0;
            let accessProfiles = req.body.accessProfiles;
            let records = yield this.loginTokenService.fetchAll(phone, lastSyncStamp, accessProfiles);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "LoginToken" } };
        });
    }
    fetchAllv3(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let records = yield this.loginTokenService.fetchAllv3(phone);
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "LoginToken" } };
        });
    }
    initiateLogout(localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = yield this.loginTokenService.initiateLogout(localUUID);
            return status ? Page_1.StatusSuccess : Page_1.StatusFailed;
        });
    }
    completeLogout(localUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = yield this.loginTokenService.completeLogout(localUUID);
            return status ? Page_1.StatusSuccess : Page_1.StatusFailed;
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/fetchAll'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginTokenController.prototype, "fetchAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/fetchAllv3'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginTokenController.prototype, "fetchAllv3", null);
__decorate([
    (0, routing_controllers_1.Post)("/initiateLogout"),
    __param(0, (0, routing_controllers_1.BodyParam)('localUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginTokenController.prototype, "initiateLogout", null);
__decorate([
    (0, routing_controllers_1.Post)("/completeLogout"),
    __param(0, (0, routing_controllers_1.BodyParam)('localUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginTokenController.prototype, "completeLogout", null);
LoginTokenController = __decorate([
    (0, routing_controllers_1.Controller)('/loginToken')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [LoginTokenService_1.LoginTokenService])
], LoginTokenController);
exports.LoginTokenController = LoginTokenController;
//# sourceMappingURL=LoginTokenController.js.map