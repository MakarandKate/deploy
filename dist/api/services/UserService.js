"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UserService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const User_1 = require("../models/User");
const UserRepository_1 = require("../repositories/UserRepository");
const jwt = __importStar(require("jsonwebtoken"));
const Config_1 = require("../../Config");
const lib_1 = require("@makarandkate/ezo-connect-wa/lib");
const LicenceRepository_1 = require("../repositories/LicenceRepository");
const Licence_1 = require("../models/Licence");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const request_1 = __importDefault(require("request"));
const RedisApp_1 = require("../../lib/RedisApp");
const LoginToken_1 = require("../models/LoginToken");
const LoginTokenRepository_1 = require("../repositories/LoginTokenRepository");
const LicenceService_1 = require("./LicenceService");
const LoginTokenService_1 = require("./LoginTokenService");
const user_1 = require("../modelsv2/user");
let UserService = class UserService extends BaseService_1.BaseService {
    constructor(eventDispatcher, licenceService, loginTokenService) {
        super(UserRepository_1.UserRepository);
        this.eventDispatcher = eventDispatcher;
        this.licenceService = licenceService;
        this.loginTokenService = loginTokenService;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.UserRepository.findDeleted();
        });
    }
    generateOtp() {
        let result = ``;
        let characters = '0123456789';
        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        return result;
    }
    fetchOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                    phone
                });
                if (checkUser != null && (checkUser === null || checkUser === void 0 ? void 0 : checkUser.otp)) {
                    return checkUser.otp;
                }
                return null;
            }
            catch (error) {
                return null;
            }
        });
    }
    setFixedOtp(phone, fixedOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                    phone
                });
                if (checkUser != null) {
                    checkUser.fixedOtp = fixedOtp;
                }
                let updatedUser = yield this.update(checkUser);
                if ((updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.fixedOtp) == fixedOtp) {
                    return true;
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
    /**
     * @param phone - EZO Login Phone to Reset Fixed OTP
     * @param otp - OTP sent on Login Phone to verify user
     * @returns - Promise boolean If fixed OTP reset then TRUE and if failed then FALSE
     * @description - It resets Fixed OTP set by user to null to start sending new OTP's to user login phone.
     */
    resetFixedOtp(phone, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                    phone
                });
                if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.otp) == otp) {
                    checkUser.fixedOtp = null;
                    let updatedUser = yield this.update(checkUser);
                    return !(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.fixedOtp);
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
    sendPinResetOTP(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield UserRepository_1.UserRepository.findOneBy({ phone });
                if (user) {
                    let otp = this.generateOtp();
                    user.otp = otp;
                    user.otpSentStamp = +new Date();
                    yield this.update(user);
                    if (Config_1.Config.env == Config_1.Env.dev) {
                        console.info("phone:", phone, otp);
                    }
                    else {
                        lib_1.Sms.sendTemplateSms({
                            phone,
                            flowId: '609a400f88e81a043070dba5',
                            variables: [`<%23> ${otp}`]
                        });
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    verifyPinResetOTP(phone, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield UserRepository_1.UserRepository.findOneBy({ phone, otp });
                if (user) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    getVerificationCode(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                phone
            });
            if (!checkUser) {
                let newUser = new User_1.User();
                newUser.phone = phone;
                checkUser = yield this.create(newUser);
                this.createLicence(checkUser);
            }
            let otp = this.generateOtp();
            checkUser.otp = otp;
            checkUser.otpSentStamp = +new Date();
            yield this.update(checkUser);
            return checkUser.phone + checkUser.otp;
        });
    }
    sendOtp(phone, sendMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                phone
            });
            if (!checkUser) {
                let newUser = new User_1.User();
                newUser.phone = phone;
                checkUser = yield this.create(newUser);
                this.createLicence(checkUser);
            }
            let otp = this.generateOtp();
            if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.fixedOtp) != null) {
                otp = checkUser.fixedOtp;
            }
            let phone0List = [
                '9765051232',
                '9998887771', '9998887772', '9998887773', '9998887774', '9998887775',
                '9998887776', '9998887777', '9998887778', '9998887779', '9998887780',
                '9998887790',
                '9999988881', '9999988882'
            ];
            if (phone0List.indexOf(phone) != -1) {
                otp = '0000';
            }
            checkUser.otp = otp;
            checkUser.otpSentStamp = +new Date();
            yield this.update(checkUser);
            if (Config_1.Config.env == Config_1.Env.dev) {
                console.info("phone:", phone, otp);
            }
            else {
                if (otp != '0000' && sendMsg) {
                    lib_1.Sms.sendTemplateSms({
                        phone,
                        flowId: '609a400f88e81a043070dba5',
                        variables: [`<%23> ${otp}`]
                    });
                }
            }
            return true;
        });
    }
    createLicence(user, proStamp = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkLicence = yield LicenceRepository_1.LicenceRepository.findOne({
                where: {
                    userId: user.phone
                }
            });
            if (!(checkLicence === null || checkLicence === void 0 ? void 0 : checkLicence._localUUID)) {
                let licence = new Licence_1.Licence();
                licence.createdStamp = licence.updatedStamp = +new Date();
                licence.proActivationStamp = +new Date();
                licence.proExpiryStamp = proStamp || licence.proActivationStamp; //+(7*24*60*60*1000);
                licence.deletedStamp = 0;
                licence.syncStamp = +new Date();
                licence.smsCredits = 100;
                licence.whastappMessageCredits = 100;
                licence.billPrintCredit = 1000;
                licence._localUUID = Utils_1.default.getUUID();
                licence.userId = user.phone;
                licence._is = +new Date();
                let savedLicence = yield LicenceRepository_1.LicenceRepository.save(licence);
                try {
                    let collectionName = 'Licence';
                    let latestDocumentUpdateStamp = savedLicence.updatedStamp;
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${savedLicence.userId}_${collectionName}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                        yield (0, RedisApp_1.SetToRedis)(`${savedLicence.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                        yield (0, RedisApp_1.SetToRedis)(`_proe_${savedLicence.userId}`, `${savedLicence.proExpiryStamp}`);
                    }
                }
                catch (err) { }
            }
        });
    }
    moveToFastCreateLicence(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let options = {
                    'method': 'GET',
                    'url': `https://ezobanks.com:5001/api/v2/user/proUserStampByPhone?phone=${user === null || user === void 0 ? void 0 : user.phone}`
                };
                (0, request_1.default)(options, (error, response) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        console.error("-----------------------");
                        console.error("UserService:198");
                        console.error(error);
                        console.error("-----------------------");
                    }
                    ;
                    if (response === null || response === void 0 ? void 0 : response.body) {
                        try {
                            let obj = JSON.parse(response.body);
                            if ((obj === null || obj === void 0 ? void 0 : obj.isPro) > +new Date()) {
                                this.createLicence(user, obj === null || obj === void 0 ? void 0 : obj.isPro);
                            }
                            else {
                                this.createLicence(user);
                            }
                        }
                        catch (err) { }
                    }
                }));
            }
            catch (error) { }
        });
    }
    verifyOtp(phone, otp, tokenParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                phone,
                otp
            });
            if (checkUser) {
                try {
                    let licences = yield this.licenceService.fetchAllv3(phone, 0, []);
                    let licence = (licences === null || licences === void 0 ? void 0 : licences.filter(x => (x === null || x === void 0 ? void 0 : x.userId) == phone)[0]) || null;
                    if ((licence === null || licence === void 0 ? void 0 : licence.proExpiryStamp) < +new Date()) {
                        yield this.loginTokenService.initiateLogoutToAll(phone, true);
                    }
                }
                catch (error) { }
                let loginToken = new LoginToken_1.LoginToken();
                loginToken.createdStamp = loginToken.updatedStamp = loginToken._is = +new Date();
                loginToken._localUUID = Utils_1.default.getUUID();
                loginToken.device = tokenParams.device;
                loginToken.lat = tokenParams.lat;
                loginToken.long = tokenParams.long;
                loginToken.lastActiveStamp = +new Date();
                loginToken.userId = phone;
                let savedToken = yield LoginTokenRepository_1.LoginTokenRepository.save(loginToken);
                let tokenDetails = yield this.generateNewToken(savedToken);
                this.sendVerifiedToFire(phone);
                return tokenDetails;
            }
            return null;
        });
    }
    directAccount(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let checkUser = yield UserRepository_1.UserRepository.findOneBy({
                phone
            });
            if (!checkUser) {
                let newUser = new User_1.User();
                newUser.phone = phone;
                checkUser = yield this.create(newUser);
                this.moveToFastCreateLicence(checkUser);
            }
            let otp = this.generateOtp();
            checkUser.otp = otp;
            checkUser.otpSentStamp = +new Date();
            yield this.update(checkUser);
        });
    }
    generateNewToken(loginToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let ct = +new Date();
            let phone = loginToken.userId;
            let token = jwt.sign({
                phone,
                _uuid: loginToken._localUUID,
                isPro: 1,
                version: 2,
                createdStamp: +new Date(),
                iat: ct
            }, Config_1.Config.sessionSecret);
            // let user=await UserRepository.findOneBy({
            //     phone
            // });
            // if(!user){
            //     let nUser=new User();
            //     nUser.phone=phone;
            //     nUser.lastTokenTime=ct;
            //     user=await this.create(nUser);
            // }else{
            //     user.lastTokenTime=ct;
            //     user=await this.update(user);
            // }
            return {
                token
            };
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token) {
                try {
                    let decoded = jwt.verify(token, Config_1.Config.sessionSecret);
                    let user = yield UserRepository_1.UserRepository.findOneBy({
                        phone: decoded.phone
                    });
                    if (user) {
                        // if(user.lastTokenTime==decoded.iat){
                        //     return true;
                        // }
                        return true;
                    }
                    return false;
                }
                catch (err) {
                    return false;
                }
            }
            return false;
        });
    }
    sendVerifiedToFire(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                var request = require("request");
                var options = {
                    method: "POST",
                    url: "https://ezobanks.com:5001/api/v2/user/setVerified",
                    rejectUnauthorized: false,
                    requestCert: true,
                    agent: false,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phone: phone }),
                };
                request(options, function (error, response) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            console.error("-----------------------");
                            console.error("UserService:341");
                            console.error(error);
                            console.error("-----------------------");
                        }
                        ;
                        resolve(response);
                    });
                });
            });
        });
    }
    dashCurrentActiveUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.UserRepository.find({
                where: {
                    lastActiveStamp: {
                        $gt: (+new Date() - (10 * 60 * 1000))
                    }
                },
                order: {
                    lastActiveStamp: -1
                }
            });
        });
    }
    dashCurrentActiveUsersv2() {
        return __awaiter(this, void 0, void 0, function* () {
            let documents = [];
            let qr = yield user_1.UserRepo.find({
                lastActiveStamp: {
                    $gt: (+new Date() - (10 * 60 * 1000))
                }
            }).sort({
                lastActiveStamp: -1
            });
            if (qr && qr.length) {
                qr.map((el) => { documents.push(el.toObject()); });
            }
            return documents;
        });
    }
    dashRegistrationInTime(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.UserRepository.count({
                createdStamp: {
                    $gte: startStamp,
                    $lt: endStamp
                }
            });
        });
    }
    dashRegistrationInTimev2(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.UserRepo.countDocuments({
                createdStamp: {
                    $gte: startStamp,
                    $lt: endStamp
                }
            });
        });
    }
    sanitizePhone(dirtyPhone) {
        let sanitizedPhone = "";
        dirtyPhone = dirtyPhone.split(" ").join("");
        if (dirtyPhone.length >= 10) {
            sanitizedPhone = dirtyPhone.slice(dirtyPhone.length - 10);
        }
        return sanitizedPhone;
    }
    getLocationFromLatLong(lat, long) {
        return new Promise((resolve) => {
            //https://maps.googleapis.com/maps/api/geocode/json?latlng=13.606781666666667,75.96524&sensor=true&key=<API_KEY>
        });
    }
    getVerifiedStamp(phoneArr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield UserRepository_1.UserRepository.find({
                    where: {
                        phone: {
                            $in: phoneArr
                        },
                    }
                });
                if (users === null || users === void 0 ? void 0 : users.length) {
                    let obj = {};
                    users === null || users === void 0 ? void 0 : users.forEach(user => obj[user === null || user === void 0 ? void 0 : user.phone] = (user === null || user === void 0 ? void 0 : user.createdStamp) || 0);
                    return obj;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return null;
            }
        });
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface,
        LicenceService_1.LicenceService,
        LoginTokenService_1.LoginTokenService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map