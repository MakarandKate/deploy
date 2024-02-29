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
exports.RedisService = void 0;
const typedi_1 = require("typedi");
const RedisApp_1 = require("../../lib/RedisApp");
let RedisService = class RedisService {
    constructor() {
    }
    fetchAll(keyarr) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnObj = {};
            if (keyarr && keyarr.length) {
                for (let i = 0; i < keyarr.length; i++) {
                    let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${keyarr[i]}`);
                    let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                    returnObj[keyarr[i]] = userIdCollectionStamp;
                }
            }
            return returnObj;
        });
    }
    isUpdateAvailable(phone, lastSyncStamp, accessProfiles, collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userIdCollectionStamp = Number(yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`)) || 0;
                if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                    return true;
                }
                else {
                    let updateAvailable = false;
                    if (collectionName == 'Licence') {
                        for (let i = 0; i < accessProfiles.length; i++) {
                            let userId = accessProfiles[i].userId;
                            let profileLastSyncStamp = accessProfiles[i].lastSyncStamp;
                            let userIdCollectionStamp = Number(yield (0, RedisApp_1.GetFromRedis)(`${userId}_${collectionName}`)) || 0;
                            if (userIdCollectionStamp > profileLastSyncStamp || profileLastSyncStamp == 0) {
                                updateAvailable = true;
                                break;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < accessProfiles.length; i++) {
                            let profileId = accessProfiles[i].profileId;
                            let profileLastSyncStamp = accessProfiles[i].lastSyncStamp;
                            let profileIdCollectionStamp = Number(yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`)) || 0;
                            if (profileIdCollectionStamp > profileLastSyncStamp || profileLastSyncStamp == 0) {
                                updateAvailable = true;
                                break;
                            }
                        }
                    }
                    return updateAvailable;
                }
            }
            catch (error) {
                return true;
            }
        });
    }
};
RedisService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=RedisService.js.map