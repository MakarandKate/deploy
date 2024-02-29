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
exports.chatRouter = void 0;
const chatRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let phone = req.params.phone;
        return res.send('Coming Soon...');
        //return res.redirect(`https://ezobooks.in/nfc/order/${phone}`);
    }
    catch (err) {
    }
    return res.send(`Something went wrong try again.`);
});
exports.chatRouter = chatRouter;
//# sourceMappingURL=chat.js.map