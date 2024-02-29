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
exports.CalcTokenController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const LoginToken_1 = require("../models/LoginToken");
const LoginTokenRepository_1 = require("../repositories/LoginTokenRepository");
const UserService_1 = require("../services/UserService");
const Page_1 = require("../../lib/Page");
let CalcTokenController = class CalcTokenController {
    constructor(userService) {
        this.userService = userService;
    }
    getToken(req, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let locals = req.locals;
            let phone = locals.phone;
            let loginToken = new LoginToken_1.LoginToken();
            loginToken.createdStamp = loginToken.updatedStamp = loginToken._is = +new Date();
            loginToken._localUUID = Utils_1.default.getUUID();
            loginToken.device = "Ezo Smart Calculator";
            //loginToken.lat=tokenParams.lat;
            //loginToken.long=tokenParams.long;
            loginToken.lastActiveStamp = +new Date();
            loginToken.userId = phone;
            let savedToken = yield LoginTokenRepository_1.LoginTokenRepository.save(loginToken);
            let tokenDetails = yield this.userService.generateNewToken(savedToken);
            return Object.assign(Object.assign({}, Page_1.StatusSuccess), { token: (tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.token) || "" });
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/getToken'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('profileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CalcTokenController.prototype, "getToken", null);
CalcTokenController = __decorate([
    (0, routing_controllers_1.Controller)('/calctoken')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [UserService_1.UserService])
], CalcTokenController);
exports.CalcTokenController = CalcTokenController;
//# sourceMappingURL=CalcTokenController.js.map