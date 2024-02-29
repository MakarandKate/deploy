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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Authorize = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const Config_1 = require("../../Config");
const RedisApp_1 = require("../../lib/RedisApp");
const user_1 = require("../modelsv2/user");
class Authorize {
    // interface implementation is optional
    use(request, response, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = ((_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization) || '';
                if (token && (token + '').length > 0) {
                    token = (token + '');
                }
                if (!token) {
                    return response.send({ err: "Unauthorized Access:Token Malfunction" });
                }
                let decoded = jwt.verify(token, Config_1.Config.sessionSecret);
                let phone = decoded.phone;
                let _uuid = decoded._uuid || "";
                if (_uuid) {
                    try {
                        (0, RedisApp_1.SetToRedis)(`LT_${_uuid}`, `${+new Date()}`);
                    }
                    catch (err) {
                    }
                }
                let user = yield user_1.UserRepo.findOne({
                    phone: decoded.phone
                });
                if (user) {
                    let lat = 0;
                    let long = 0;
                    if ((_b = request === null || request === void 0 ? void 0 : request.headers) === null || _b === void 0 ? void 0 : _b.lat) {
                        lat = Number((_c = request === null || request === void 0 ? void 0 : request.headers) === null || _c === void 0 ? void 0 : _c.lat) || 0;
                    }
                    if ((_d = request === null || request === void 0 ? void 0 : request.headers) === null || _d === void 0 ? void 0 : _d.long) {
                        long = Number((_e = request === null || request === void 0 ? void 0 : request.headers) === null || _e === void 0 ? void 0 : _e.long) || 0;
                    }
                    if (lat != 0) {
                        user.lat = lat;
                    }
                    if (long != 0) {
                        user.long = long;
                    }
                    if ((((user === null || user === void 0 ? void 0 : user.updatedStamp) || 0) < (+new Date() - 5 * 60 * 100)) || (((user === null || user === void 0 ? void 0 : user.lastActiveStamp) || 0) < (+new Date() - 5 * 60 * 100))) {
                        user.lastActiveStamp = +new Date();
                        user.updatedStamp = +new Date();
                        user._is = +new Date();
                        let updateResult = yield user_1.UserRepo.updateMany({
                            phone: user.phone
                        }, {
                            "$set": Object.assign({}, user)
                        });
                    }
                    // if(user.lastTokenTime==decoded.iat){
                    //     request.locals={phone};
                    //     next();
                    // }else{
                    //     return response.send({err:"Unauthorized Access:Token Expired"})
                    // }
                    request.locals = { phone, _uuid };
                    next();
                }
                else {
                    return response.send({ err: "Unauthorized Access:User Not Found" });
                }
            }
            catch (err) {
                return response.send({ err: "Unauthorized Access:Token Malfunction" });
            }
        });
    }
}
exports.Authorize = Authorize;
//# sourceMappingURL=Authorize.middleware.js.map