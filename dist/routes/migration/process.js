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
exports.processRouter = void 0;
const Page_1 = require("../../lib/Page");
const processRouter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, Page_1.setPage)(req, res, {
        title: 'Firebase to Fast Migration',
        description: '',
        view: 'migration/process',
        data: {}
    });
});
exports.processRouter = processRouter;
//# sourceMappingURL=process.js.map