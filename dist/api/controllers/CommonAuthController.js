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
exports.CommonAuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("../services/UserService");
const Page_1 = require("../../lib/Page");
let CommonAuthController = class CommonAuthController {
    constructor(userService) {
        this.userService = userService;
    }
    setFixedOtp(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let phone = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.phone;
            let fixedOtp = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.fixedOtp;
            if (phone && fixedOtp) {
                let result = yield this.userService.setFixedOtp(phone, fixedOtp);
                return { result };
            }
            return { result: false };
        });
    }
    resetFixedOtp(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let phone = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.phone;
            let otp = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.otp;
            if (phone && otp) {
                let result = yield this.userService.resetFixedOtp(phone, otp);
                if (result) {
                    return Page_1.StatusSuccess;
                }
            }
            return Page_1.StatusFailed;
        });
    }
    sendPinResetOTP(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            if (phone) {
                let result = yield this.userService.sendPinResetOTP(phone);
                return { result };
            }
            return { result: false };
        });
    }
    verifyPinResetOTP(req, phone, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (phone && otp) {
                let result = yield this.userService.verifyPinResetOTP(phone, otp);
                return { result };
            }
            return { result: false };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/setFixedOtp'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonAuthController.prototype, "setFixedOtp", null);
__decorate([
    (0, routing_controllers_1.Post)('/resetFixedOtp'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonAuthController.prototype, "resetFixedOtp", null);
__decorate([
    (0, routing_controllers_1.Post)('/sendPinResetOTP'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonAuthController.prototype, "sendPinResetOTP", null);
__decorate([
    (0, routing_controllers_1.Post)('/verifyPinResetOTP'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __param(2, (0, routing_controllers_1.BodyParam)('otp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CommonAuthController.prototype, "verifyPinResetOTP", null);
CommonAuthController = __decorate([
    (0, routing_controllers_1.Controller)('/auth')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    __metadata("design:paramtypes", [UserService_1.UserService])
], CommonAuthController);
exports.CommonAuthController = CommonAuthController;
//# sourceMappingURL=CommonAuthController.js.map