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
exports.IndexRouter = void 0;
const typedi_1 = require("typedi");
const Page_1 = require("../../lib/Page");
let IndexRouter = class IndexRouter {
    constructor() {
        this.indexRouter = (req, res) => __awaiter(this, void 0, void 0, function* () {
            (0, Page_1.setPage)(req, res, {
                title: "Ezo OF",
                description: '',
                view: "index",
                data: {
                    pageName: "Ezo OF"
                }
            });
        });
        this.manifestRouter = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(`
       {
          "name": "EZO OF",
          "short_name": "EZO",
          "scope":"/kappa/",
          "icons": [{
              "src": "/kappa/img/logo/128x128-min.png",
              "sizes": "128x128",
              "type": "image/png"
            }, {
              "src": "/kappa/img/logo/256x256-min.png",
              "sizes": "256x256",
              "type": "image/png"
            }, {
              "src": "/kappa/img/logo/512x512-min.png",
              "sizes": "512x512",
              "type": "image/png"
            }],
          "start_url": "/kappa",
          "display": "standalone",
          "background_color": "#e67e22" ,
          "theme_color": "#2980b9"
        }
      `);
        });
    }
};
IndexRouter = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], IndexRouter);
exports.IndexRouter = IndexRouter;
//# sourceMappingURL=index.js.map