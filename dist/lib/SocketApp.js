"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketApp = exports.socketConnected = exports.socket = void 0;
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const Utils_1 = __importDefault(require("./Utils"));
exports.socketConnected = false;
class SocketApp {
}
exports.SocketApp = SocketApp;
SocketApp.init = () => {
    exports.socket = (0, socket_io_client_1.default)("https://exp.ezobooks.in", { transports: ['websocket'] });
    exports.socket.on("connect", () => {
        console.info("socket connected:", exports.socket.id);
        exports.socketConnected = true;
    });
    exports.socket.on("connect_error", (e) => {
        console.info("socket error", e);
    });
};
SocketApp.test = () => {
    const URL = "https://exp.ezobooks.in";
    const MAX_CLIENTS = 500;
    const POLLING_PERCENTAGE = 0.05;
    const CLIENT_CREATION_INTERVAL_IN_MS = 2;
    const EMIT_INTERVAL_IN_MS = 1000;
    let clientCount = 0;
    let lastReport = new Date().getTime();
    let packetsSinceLastReport = 0;
    let totalSent = 0;
    let msgArr = [];
    const createClient = () => {
        // for demonstration purposes, some clients stay stuck in HTTP long-polling
        const transports = Math.random() < POLLING_PERCENTAGE ? ["polling"] : ["polling", "websocket"];
        const socket = (0, socket_io_client_1.default)(URL, {
            transports: ['websocket'],
        });
        setInterval(() => {
            let msgId = totalSent + '/' + (new Date()).toLocaleTimeString() + '|' + Utils_1.default.generateRandomString(32);
            msgArr.push(msgId);
            totalSent++;
            socket.emit("LoadTest", msgId);
        }, EMIT_INTERVAL_IN_MS);
        socket.on("LoadTestR", (obj) => {
            const index = msgArr.indexOf(obj);
            if (index > -1) { // only splice array when item is found
                msgArr.splice(index, 1); // 2nd parameter means remove one item only
            }
            packetsSinceLastReport++;
        });
        socket.on("disconnect", (reason) => {
            console.info(`disconnect due to ${reason}`);
        });
        if (++clientCount < MAX_CLIENTS) {
            setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
        }
    };
    createClient();
    const printReport = () => {
        const now = new Date().getTime();
        const durationSinceLastReport = (now - lastReport) / 1000;
        const packetsPerSeconds = (packetsSinceLastReport / durationSinceLastReport).toFixed(2);
        console.info(`client count: ${clientCount} ; packets received per second: ${packetsPerSeconds} ; msgArr : ${msgArr.length}/${totalSent} (${(msgArr.length / totalSent) * 100}) : ${msgArr[0]}`);
        packetsSinceLastReport = 0;
        lastReport = now;
    };
    setInterval(printReport, 5000);
};
//# sourceMappingURL=SocketApp.js.map