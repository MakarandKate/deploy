"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const ezo_connect_wa_1 = require("@makarandkate/ezo-connect-wa");
const whatsapp_1 = require("@makarandkate/ezo-connect-wa/lib/whatsapp");
const uuid_1 = require("uuid");
const request_1 = __importDefault(require("request"));
class Util {
    /**
     * Generates random string
     * @param length
     * @returns random string
     */
    static generateRandomString(length) {
        let result = ``;
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        return result;
    }
    /**
     * Generates otp
     * @returns otp
     */
    static generateOtp() {
        let result = ``;
        let characters = '0123456789';
        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        return result;
    }
    static generatePassword(passwordLength) {
        var numberChars = "0123456789";
        var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lowerChars = "abcdefghijklmnopqrstuvwxyz";
        var specialChars = "#?!@$%^&*-";
        var allChars = numberChars + upperChars + lowerChars + specialChars;
        var randPasswordArray = Array(passwordLength);
        randPasswordArray[0] = numberChars;
        randPasswordArray[1] = upperChars;
        randPasswordArray[2] = lowerChars;
        randPasswordArray[3] = specialChars;
        randPasswordArray = randPasswordArray.fill(allChars, 4);
        return this.shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)]; })).join('');
    }
    static shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    static getTodaysStampBound() {
        let todaysDt = +new Date().setHours(0, 0, 0, 0);
        return {
            startStamp: todaysDt,
            endStamp: todaysDt + 86400000 - 1,
        };
    }
    static wait(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    }
    static stampToSimpleDate(stamp) {
        let dt = new Date(stamp);
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
    }
    static stampToSimpleDateTime(stamp) {
        let dt = new Date(stamp);
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
    }
    static stampToDDMMYYYY(stamp) {
        let dt = new Date(stamp);
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
    }
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static stampToMMDDYYYY(stamp) {
        let dt = new Date(stamp);
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
        return mm + '/' + dd + '/' + yy;
    }
    static stampTohhMMssA(stamp) {
        let dt = new Date(stamp);
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
        return hh + ':' + MM + ':' + SS + ' ' + ap;
    }
    static roundToTwoDecimals(num) {
        return Math.round(num * 100) / 100;
    }
    static nextNo(billNo) {
        if (!billNo || typeof billNo != 'string') {
            return;
        }
        const regex = new RegExp(/\d+/g);
        const m = billNo.match(regex);
        const lastNumber = m ? m.pop() : 0;
        let prefix = '';
        let prefLastChar = '';
        const parsedNumber = Math.floor(+lastNumber);
        const parsedNumberStr = parsedNumber + '';
        const x = parsedNumber + 1;
        prefix = billNo.substring(0, billNo.lastIndexOf(parsedNumberStr));
        const prevNoLength = (x - 1 + '').length;
        const currentNoLength = (x + '').length;
        if (currentNoLength > prevNoLength) {
            if (prefix.length > 0) {
                prefLastChar = prefix.substring(prefix.length - 1);
                if (prefLastChar === '0') {
                    prefix = prefix.substring(0, prefix.length - 1);
                }
            }
        }
        return prefix + x;
    }
    static stampToYYYYMMDD(stamp) {
        let dt = new Date(stamp);
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
        return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM;
    }
    static capFractionsToSix(fractionNumber) {
        if (Number(fractionNumber) > 1) {
            return Math.round((this.capFractionsToFour(fractionNumber)) * 1000000) / 1000000;
        }
        return Math.round((Number(fractionNumber) || 0) * 1000000) / 1000000;
    }
    static capFractionsToFour(fractionNumber) {
        return Math.round((Number(fractionNumber) || 0) * 10000) / 10000;
    }
    static representAsWhole(val) {
        var _a, _b;
        return (_b = (_a = (Number(val) || 0)) === null || _a === void 0 ? void 0 : _a.toFixed(2)) === null || _b === void 0 ? void 0 : _b.replace(/\.00$/, '');
    }
    static sendBookingConfimationMsg(docId, sendTo, name, address, phone, totalAmount, amountReceived, codAmount, machineSold, softwareValidity, dispatchDate) {
        let templateArr = [
            "1_booking_confirmation_2t", "2_booking_confirmation_gr",
            "3_booking_confirmation_mu", "2_booking_confirmation_gr",
            "1_booking_confirmation_2t"
        ];
        let selectedTemplate = templateArr[docId % templateArr.length];
        ezo_connect_wa_1.WhatsApp.sendTransactionalMessage({
            accountType: whatsapp_1.WhatsappAccountType.sales,
            templateId: selectedTemplate,
            phone: sendTo,
            headerValues: [],
            bodyValues: [
                machineSold || '-',
                totalAmount + '' || '-',
                amountReceived + '' || '-',
                codAmount + '' || '-',
                machineSold || '-',
                totalAmount + '' || '-',
                amountReceived + '' || '-',
                codAmount + '' || '-',
            ],
            buttonValues: {}
        });
    }
    static sendAgentNumberToLead(leadPhone, agentPhone) {
        // let templateArr=[
        //     "1_ezo_customer_call","2_ezo_customer_call",
        //     "3_ezo_customer_call","4_ezo_customer_call",
        //     "5_ezo_customer_call","ezo_cx_call_msg"
        // ];
        // let templateToUse=templateArr[5];
        // try{
        //     let num=Number(leadPhone);
        //     templateToUse=templateArr[num%templateArr.length];
        // }catch(err){
        // }
        ezo_connect_wa_1.WhatsApp.sendRotTxnMsg({
            accountType: whatsapp_1.WhatsappAccountType.sales,
            phone: leadPhone,
            eventId: "ezo_customer_call",
            headerValues: [],
            bodyValues: [agentPhone],
            buttonValues: {}
        });
    }
    static capitalFirstLetter(data) {
        if (!data)
            return "";
        data = data.trim();
        return data[0].toUpperCase() + data.substr(1);
    }
    static getUUID() {
        return (0, uuid_1.v4)();
    }
    static generateRandomPhone(length = 9) {
        let result = '';
        const characters = '0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return this.generateRandomPhoneFirstDigit() + result;
    }
    static generateRandomPhoneFirstDigit(length = 1) {
        let result = '';
        const characters = '123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    static dateToDDMMYYY(date, seperator) {
        if (!seperator)
            seperator = '/';
        const d = new Date(date), dd = d.getDate() > 9 ? d.getDate() : '0' + d.getDate(), mm = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1), yyyy = d.getFullYear();
        return dd + seperator + mm + seperator + yyyy;
    }
    static getShortLink(longLink) {
        var options = {
            'method': 'GET',
            'url': `http://ezbnk.in/make/${encodeURIComponent(longLink)}`
        };
        return new Promise((resolve, reject) => {
            (0, request_1.default)(options, function (error, response) {
                if (error) {
                    console.error("-----------------------");
                    console.error("Utils:416");
                    console.error(error);
                    console.error("-----------------------");
                    resolve("error 1");
                }
                ;
                if (response && response.body) {
                    try {
                        let obj = JSON.parse(response.body);
                        resolve(obj.surl || "error 4");
                    }
                    catch (err) {
                        resolve("error 2");
                    }
                }
                else {
                    resolve("error 3");
                }
            });
        });
    }
    static removeNullKeysRecursively(obj) {
        if (typeof (obj) == "object") {
            if (obj.length) {
                for (let i = 0; i < obj.length; i++) {
                    if (typeof (obj[i]) == "object") {
                        this.removeNullKeysRecursively(obj[i]);
                    }
                }
            }
            else {
                for (let k in obj) {
                    if (k == "userMetaData" || k == "systemMetaData") {
                        delete obj[k];
                    }
                    if (obj[k] == null) {
                        delete obj[k];
                    }
                    if (typeof (obj[k]) == "object") {
                        this.removeNullKeysRecursively(obj[k]);
                    }
                }
            }
        }
        return obj;
    }
    static numberToAlphabeticRepresentation(num) {
        if (num <= 0) {
            return '';
        }
        let result = '';
        while (num > 0) {
            const remainder = (num - 1) % 26; // 0-based index for alphabets (a=0, b=1, ..., z=25)
            result = String.fromCharCode(remainder + 97) + result; // 'a' is ASCII code 97
            num = Math.floor((num - 1) / 26);
        }
        return result;
    }
    static compressResponse(obj, tokenNumber) {
        if (!tokenNumber) {
            tokenNumber = 1;
        }
        ;
        if (typeof (obj) == "object") {
            if (obj.length) {
                for (let i = 0; i < obj.length; i++) {
                    tokenNumber++;
                    if (typeof (obj[i]) == "object") {
                        this.compressResponse(obj[i], tokenNumber);
                    }
                }
            }
            else {
                for (let k in obj) {
                    tokenNumber++;
                    let token = Util.numberToAlphabeticRepresentation(tokenNumber);
                    obj[token] = obj[k];
                    delete obj[k];
                    if (typeof (obj[token]) == "object") {
                        this.compressResponse(obj[k], tokenNumber);
                    }
                }
            }
        }
        return obj;
    }
    static todayStartStamp() {
        let dt = new Date();
        dt.setHours(0);
        dt.setMinutes(0);
        dt.setSeconds(0);
        dt.setMilliseconds(0);
        return +dt;
    }
    static isNumber(value) {
        if (isNaN(Number(value)) === false) {
            return true;
        }
        return false;
    }
    static responseDate() {
        let d = new Date();
        return {
            y: d.getFullYear(),
            mm: d.getMonth(),
            d: d.getDate(),
            h: d.getHours(),
            m: d.getMinutes(),
            s: d.getSeconds()
        };
    }
}
exports.default = Util;
exports.Util = Util;
Util.unitAbvrMapReverse = {
    "Pieces": "PCS",
    "Box": "BOX",
    "Kilograms": "KGS",
    "Litre": "LTR",
    "Units": "UNT",
    "Bags": "BAG",
    "BALE": "BAL",
    "Biliion of unit": "BOU",
    "Bottles": "BTL",
    "Buckles": "BKL",
    "Bunches": "BUN",
    "Bundels": "BDL",
    "Cans": "CAN",
    "Cartons": "CTN",
    "Centimeters": "CMS",
    "Cubic Centimeters": "CCM",
    "Cubic Meters": "CBM",
    "Days": "DAY",
    "Dozens": "DOZ",
    "Drums": "DRM",
    "Grammes": "GMS",
    "Great Gross": "GGK",
    "Gross Yards": "GYD",
    "Kilolitre": "KLR",
    "Kilometer": "KME",
    "Meters": "MTR",
    "Metric Ton": "MTS",
    "MilliGram": "MGS",
    "Millilitre": "MLT",
    "Numbers": "NOS",
    "Others": "OTH",
    "Packs": "PAC",
    "Pairs": "PRS",
    "Quintal": "QTL",
    "Rolls": "ROL",
    "Sets": "SET",
    "Sq. Feet": "SQF",
    "Sq. Yards": "SQY",
    "Sq. Meters": "SQM",
    "tablets": "TBS",
    "Ten gross": "TGM",
    "Thousand": "THD",
    "Tonnes": "TON",
    "Tubes": "TUB",
    "US Gallons": "UGS",
    "Yards": "YDS"
};
//# sourceMappingURL=Utils.js.map