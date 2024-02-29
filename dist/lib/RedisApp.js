"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncPublish = exports.GetFromRedis = exports.SetToRedis = exports.RemoveFromRedis = exports.GetFromRedisFirst = exports.RedisApp = exports.redisPublisher = exports.redisSubscriber = exports.redisClient = void 0;
const redis_1 = require("redis");
const Config_1 = require("../Config");
const SyncPub = 'SyncPub';
class RedisApp {
}
exports.RedisApp = RedisApp;
_a = RedisApp;
RedisApp.socketArr = [];
RedisApp.init = () => __awaiter(void 0, void 0, void 0, function* () {
    if (true) {
        exports.redisClient = (0, redis_1.createClient)({
            url: Config_1.Config.redisUrl
        });
        exports.redisClient.on('error', (err) => { console.error('Redis Client Error', err); });
        exports.redisClient.on('connect', () => {
            console.info("redis connected");
        });
        yield exports.redisClient.connect();
        exports.redisSubscriber = exports.redisClient.duplicate();
        exports.redisPublisher = exports.redisClient.duplicate();
        yield exports.redisSubscriber.connect();
        yield exports.redisPublisher.connect();
        exports.redisSubscriber.subscribe(SyncPub, (receivedProfileId) => {
            if (RedisApp.socketArr.length) {
                RedisApp.socketArr.forEach((soc) => {
                    var _b;
                    if (soc.profileId == receivedProfileId) {
                        soc.res.write(`data: ${(_b = RedisApp.socketArr) === null || _b === void 0 ? void 0 : _b.length} | ${soc.profileId} Server Time ${new Date()}\n\n`);
                    }
                });
            }
        });
    }
});
const GetFromRedisFirst = (path, dataFn) => __awaiter(void 0, void 0, void 0, function* () {
    if (Config_1.Config.env == Config_1.Env.prod) {
        try {
            let dataStr = yield exports.redisClient.get(path);
            if (!dataStr) {
                dataStr = yield dataFn();
                exports.redisClient.set(path, dataStr);
            }
            return dataStr;
        }
        catch (err) {
            console.error("redis err:", err);
            let dataStr = yield dataFn();
            return dataStr;
        }
    }
    else {
        let dataStr = yield dataFn();
        return dataStr;
    }
});
exports.GetFromRedisFirst = GetFromRedisFirst;
const RemoveFromRedis = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        if (Config_1.Config.env == Config_1.Env.prod) {
            yield exports.redisClient.del(path);
        }
        resolve(true);
    }));
});
exports.RemoveFromRedis = RemoveFromRedis;
const SetToRedis = (path, dataStr) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.redisClient.set(path, dataStr);
});
exports.SetToRedis = SetToRedis;
const GetFromRedis = (path) => __awaiter(void 0, void 0, void 0, function* () {
    let dataStr = yield exports.redisClient.get(path);
    return dataStr;
});
exports.GetFromRedis = GetFromRedis;
const SyncPublish = (profileId) => __awaiter(void 0, void 0, void 0, function* () {
    exports.redisPublisher.publish(SyncPub, profileId).catch(err => {
        console.error(err);
    });
});
exports.SyncPublish = SyncPublish;
//# sourceMappingURL=RedisApp.js.map