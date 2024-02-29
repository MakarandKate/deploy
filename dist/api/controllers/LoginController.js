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
exports.LoginController = void 0;
const FBMigrationService_1 = require("./../services/FBMigrationService");
const routing_controllers_1 = require("routing-controllers");
const UserService_1 = require("../services/UserService");
const RedisApp_1 = require("../../lib/RedisApp");
const Page_1 = require("../../lib/Page");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let LoginController = class LoginController {
    constructor(userService, fbMigrationService) {
        this.userService = userService;
        this.fbMigrationService = fbMigrationService;
    }
    sendOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield this.userService.sendOtp(phone, true);
            try {
                yield (0, RedisApp_1.SetToRedis)(`login_attempt_${phone}`, `0`);
            }
            catch (err) {
            }
            return {
                status: "success",
                phone,
                resp
            };
        });
    }
    sendOtp2(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield this.userService.sendOtp(phone, false);
            try {
                yield (0, RedisApp_1.SetToRedis)(`login_attempt_${phone}`, `0`);
            }
            catch (err) {
            }
            return {
                status: "success",
                phone,
                resp
            };
        });
    }
    getVerificationCode(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let verificationString = yield this.userService.getVerificationCode(phone);
            try {
                yield (0, RedisApp_1.SetToRedis)(`login_attempt_${phone}`, `0`);
            }
            catch (err) { }
            return {
                status: "success",
                verificationString,
            };
        });
    }
    verifyVerificationCode(verificationString, lat, long, device) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone = verificationString.substring(0, 10);
            let verificationCode = verificationString.substring(10, 14);
            if ((phone === null || phone === void 0 ? void 0 : phone.length) == 10
                && Utils_1.default.isNumber(phone)
                && (verificationCode === null || verificationCode === void 0 ? void 0 : verificationCode.length)
                && Utils_1.default.isNumber(verificationCode)) {
                let tokenDetails = yield this.userService.verifyOtp(phone, verificationCode, {
                    lat: Number(lat) || 0,
                    long: Number(long) || 0,
                    device: device || ""
                });
                return {
                    status: "success",
                    phone,
                    tokenDetails,
                    otpVerified: tokenDetails ? true : false
                };
            }
            return {
                status: "failed",
                message: "Invalid Paramaters",
            };
        });
    }
    verifyOtp(phone, otp, lat, long, device) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let attemp = Number((0, RedisApp_1.GetFromRedis)(`login_attempt_${phone}`)) || 0;
                if (attemp > 3) {
                    return {
                        status: "success",
                        phone,
                        tokenDetails: null,
                        otpVerified: false
                    };
                }
                yield (0, RedisApp_1.SetToRedis)(`login_attempt_${phone}`, `${++attemp}`);
            }
            catch (err) {
            }
            let tokenDetails = yield this.userService.verifyOtp(phone, otp, {
                lat: Number(lat) || 0,
                long: Number(long) || 0,
                device: device || ""
            });
            if (tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.token) {
                // this.fbMigrationService.initMigration(phone);
            }
            return {
                status: "success",
                phone,
                tokenDetails,
                otpVerified: tokenDetails ? true : false
            };
        });
    }
    getToken(phone, lat, long, device) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isOtp = yield this.userService.sendOtp(phone, false);
                if (!isOtp)
                    return {
                        StatusFailed: Page_1.StatusFailed,
                        message: "couldn't send the OTP"
                    };
                yield (0, RedisApp_1.SetToRedis)(`login_attempt_${phone}`, `0`);
                let otp = yield this.userService.fetchOtp(phone);
                let tokenDetails = yield this.userService.verifyOtp(phone, otp, {
                    lat: Number(lat) || 0,
                    long: Number(long) || 0,
                    device: device || ""
                });
                return {
                    StatusSuccess: Page_1.StatusSuccess,
                    tokenDetails
                };
            }
            catch (error) {
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/sendOtp"),
    __param(0, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "sendOtp", null);
__decorate([
    (0, routing_controllers_1.Post)("/sendOtp2"),
    __param(0, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "sendOtp2", null);
__decorate([
    (0, routing_controllers_1.Post)("/getVerificationCode"),
    __param(0, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getVerificationCode", null);
__decorate([
    (0, routing_controllers_1.Post)("/verifyVerificationCode"),
    __param(0, (0, routing_controllers_1.BodyParam)('verificationString')),
    __param(1, (0, routing_controllers_1.BodyParam)('lat')),
    __param(2, (0, routing_controllers_1.BodyParam)('long')),
    __param(3, (0, routing_controllers_1.BodyParam)('device')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "verifyVerificationCode", null);
__decorate([
    (0, routing_controllers_1.Post)("/verifyOtp"),
    __param(0, (0, routing_controllers_1.BodyParam)('phone')),
    __param(1, (0, routing_controllers_1.BodyParam)('otp')),
    __param(2, (0, routing_controllers_1.BodyParam)('lat')),
    __param(3, (0, routing_controllers_1.BodyParam)('long')),
    __param(4, (0, routing_controllers_1.BodyParam)('device')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "verifyOtp", null);
__decorate([
    (0, routing_controllers_1.Post)('/getToken'),
    __param(0, (0, routing_controllers_1.BodyParam)('phone')),
    __param(1, (0, routing_controllers_1.BodyParam)('lat')),
    __param(2, (0, routing_controllers_1.BodyParam)('long')),
    __param(3, (0, routing_controllers_1.BodyParam)('device')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getToken", null);
LoginController = __decorate([
    (0, routing_controllers_1.Controller)('/login')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    __metadata("design:paramtypes", [UserService_1.UserService,
        FBMigrationService_1.FBMigrationService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map