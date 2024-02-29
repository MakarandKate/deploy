"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const fs_1 = __importDefault(require("fs"));
class Helpers {
}
exports.Helpers = Helpers;
Helpers.fns = {
    stampToSimpleDate: (stamp) => {
        if (stamp == 0) {
            return "-";
        }
        let dt = new Date(+stamp);
        let dd = ("0" + (dt.getDate())).slice(-2);
        let mm = ("0" + (dt.getMonth() + 1)).slice(-2);
        let yy = dt.getFullYear();
        let nHH = dt.getHours();
        let ap = 'AM';
        if (nHH > 12) {
            ap = 'PM';
            nHH -= 12;
        }
        else if (nHH == 12) {
            ap = 'PM';
        }
        let hh = ("0" + (nHH)).slice(-2);
        let MM = ("0" + (dt.getMinutes())).slice(-2);
        let SS = ("0" + (dt.getSeconds())).slice(-2);
        return dd + '/' + mm + '/' + yy;
    },
    stampToSimpleTime: (stamp) => {
        let dt = new Date(+stamp);
        let dd = ("0" + (dt.getDate())).slice(-2);
        let mm = ("0" + (dt.getMonth() + 1)).slice(-2);
        let yy = dt.getFullYear();
        let nHH = dt.getHours();
        let ap = 'AM';
        if (nHH > 12) {
            ap = 'PM';
            nHH -= 12;
        }
        else if (nHH == 12) {
            ap = 'PM';
        }
        let hh = ("0" + (nHH)).slice(-2);
        let MM = ("0" + (dt.getMinutes())).slice(-2);
        let SS = ("0" + (dt.getSeconds())).slice(-2);
        return hh + ':' + MM + ' ' + ap;
    },
    stampToDate: (stamp) => {
        let dt = new Date(+stamp);
        let dd = ("0" + (dt.getDate())).slice(-2);
        let mm = ("0" + (dt.getMonth() + 1)).slice(-2);
        let yy = dt.getFullYear();
        let nHH = dt.getHours();
        let ap = 'AM';
        if (nHH > 12) {
            ap = 'PM';
            nHH -= 12;
        }
        else if (nHH == 12) {
            ap = 'PM';
        }
        let hh = ("0" + (nHH)).slice(-2);
        let MM = ("0" + (dt.getMinutes())).slice(-2);
        let SS = ("0" + (dt.getSeconds())).slice(-2);
        return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + MM + ':' + SS + ' ' + ap;
    },
    inc: (value, options) => {
        return parseInt(value) + 1;
    },
    fileMTime: (path) => {
        var mtime = Math.floor(Math.random() * 1000);
        ;
        try {
            let finalPath = __dirname.replace(/\/lib/g, '/public') + path;
            var stats = fs_1.default.statSync(finalPath);
            mtime = (new Date(stats.mtime)).getTime();
        }
        catch (e) {
        }
        return mtime;
    },
    countDays: (stamp) => {
        let curDate = +new Date().setHours(23, 59, 59, 1);
        let delta = curDate - stamp;
        let days = Math.floor(delta / 86400000);
        let str = "";
        if (days < 1) {
            str = "Added Today";
        }
        else if (days == 1) {
            str = `Added Yesterday`;
        }
        else {
            str = `Added ${days} days ago`;
        }
        return str;
    },
    dateToDDMMYYY: (date, seperator) => {
        if (!seperator)
            seperator = '/';
        const d = new Date(date), dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(), mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1), yyyy = d.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    },
    MATHABS: Math.abs,
    add: (a, b) => a + b,
    isPurchaseMoneyIn: (txnType) => {
        return (txnType === 'Purchase' || txnType === 'Money In');
    },
    isSaleMoneyOut: (txnType) => {
        return (txnType === 'Sale' || txnType === 'Money Out');
    },
    isSuccessDanger: (value) => value < 0 ? 'danger' : 'success',
    profileDisplayId: (profileId) => {
        return (profileId + '').slice(-4);
    },
    representAsWhole: (val) => {
        var _a, _b;
        return (_b = (_a = (Number(val) || 0)) === null || _a === void 0 ? void 0 : _a.toFixed(2)) === null || _b === void 0 ? void 0 : _b.replace(/\.00$/, '');
    }
};
//# sourceMappingURL=Helpers.js.map