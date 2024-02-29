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
exports.FBMigrationController = void 0;
const FBMigrationService_1 = require("./../services/FBMigrationService");
const routing_controllers_1 = require("routing-controllers");
let FBMigrationController = class FBMigrationController {
    constructor(fbMigrationService) {
        this.fbMigrationService = fbMigrationService;
    }
    moveProfileToFast(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.fbMigrationService.moveProfileToFast(phone);
            return Object.assign({ status: 'success' }, status);
        });
    }
    movePartyItemCatToFast(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.fbMigrationService.movePartyItemCatToFast(phone);
            return Object.assign({ status: 'success' }, status);
        });
    }
    getAllProfiles(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.fbMigrationService.getAllProfiles(phone);
            return {
                status: 'success',
                user
            };
        });
    }
    getUsersByTimeRange(req, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.fbMigrationService.getUsersByTimeRange(startTime, endTime);
            return {
                status: 'success',
                count: (users === null || users === void 0 ? void 0 : users.length) || 0,
                users,
            };
        });
    }
    start(req, phone, ezoWebProfileId, userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((phone === null || phone === void 0 ? void 0 : phone.length) === 10 && ezoWebProfileId && userId && profileId) {
                const user = yield this.fbMigrationService.getUserByPhone(phone);
                let result = yield this.fbMigrationService.initMigration(phone, ezoWebProfileId, userId, profileId);
                return {
                    status: 'success',
                    result,
                };
            }
            else {
                return {
                    status: 'failure',
                    message: 'Invalid Parameters',
                };
            }
        });
    }
    checkStatus(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((phone === null || phone === void 0 ? void 0 : phone.length) === 10) {
                const user = yield this.fbMigrationService.getUserByPhone(phone);
                if (user) {
                    const userId = user['uid'];
                    if (userId) {
                        let result = yield this.fbMigrationService.checkStatus(userId);
                        return {
                            status: 'success',
                            result
                        };
                    }
                }
            }
            return {
                status: 'failure',
            };
        });
    }
    resetStatus(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((phone === null || phone === void 0 ? void 0 : phone.length) === 10) {
                const user = yield this.fbMigrationService.getUserByPhone(phone);
                if (user) {
                    const userId = user['uid'];
                    if (userId) {
                        let result = yield this.fbMigrationService.updateMigrationFlag(userId, null);
                        return {
                            status: 'success',
                            result
                        };
                    }
                }
            }
            return {
                status: 'failure',
            };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/moveProfileToFast'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "moveProfileToFast", null);
__decorate([
    (0, routing_controllers_1.Post)('/movePartyItemCatToFast'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "movePartyItemCatToFast", null);
__decorate([
    (0, routing_controllers_1.Post)('/getAllProfiles'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "getAllProfiles", null);
__decorate([
    (0, routing_controllers_1.Post)('/getUsersByTimeRange'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('startTime')),
    __param(2, (0, routing_controllers_1.BodyParam)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "getUsersByTimeRange", null);
__decorate([
    (0, routing_controllers_1.Post)('/start'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __param(2, (0, routing_controllers_1.BodyParam)('ezoWebProfileId')),
    __param(3, (0, routing_controllers_1.BodyParam)('userId')),
    __param(4, (0, routing_controllers_1.BodyParam)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "start", null);
__decorate([
    (0, routing_controllers_1.Post)('/checkStatus'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "checkStatus", null);
__decorate([
    (0, routing_controllers_1.Post)('/resetStatus'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FBMigrationController.prototype, "resetStatus", null);
FBMigrationController = __decorate([
    (0, routing_controllers_1.Controller)('/fbMigration')
    //@UseBefore(express.json({limit:'500mb'}))
    // @UseBefore(Authorize)
    ,
    __metadata("design:paramtypes", [FBMigrationService_1.FBMigrationService])
], FBMigrationController);
exports.FBMigrationController = FBMigrationController;
//# sourceMappingURL=FBMigrationController.js.map