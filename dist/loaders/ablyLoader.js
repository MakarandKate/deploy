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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ablyLoader = exports.broadCastMessage = exports.ablyChannel = void 0;
exports.ablyChannel = null;
const broadCastMessage = (phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    //await ablyChannel.publish(phone, message);
});
exports.broadCastMessage = broadCastMessage;
const ablyLoader = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    // if (settings) {
    //     const ably = new Ably.Realtime.Promise(Config.ablyApiKey);
    //     await ably.connection.once('connected');
    //     ablyChannel = ably.channels.get('data-sync');        
    // }
});
exports.ablyLoader = ablyLoader;
//# sourceMappingURL=ablyLoader.js.map