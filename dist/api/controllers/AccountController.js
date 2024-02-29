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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AccountController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ImageService_1 = require("../services/ImageService");
const ItemCategoryService_1 = require("../services/ItemCategoryService");
const ItemService_1 = require("../services/ItemService");
const ItemStockAdjustService_1 = require("../services/ItemStockAdjustService");
const ItemUnitService_1 = require("../services/ItemUnitService");
const KotService_1 = require("../services/KotService");
const MoneyInService_1 = require("../services/MoneyInService");
const MoneyOutService_1 = require("../services/MoneyOutService");
const PartyCategoryService_1 = require("../services/PartyCategoryService");
const PartyService_1 = require("../services/PartyService");
const ProfileService_1 = require("../services/ProfileService");
const PurchaseService_1 = require("../services/PurchaseService");
const SaleService_1 = require("../services/SaleService");
const Page_1 = require("../../lib/Page");
const UserService_1 = require("../services/UserService");
//@UseBefore(express.json({limit:'500mb'}))
let AccountController = class AccountController {
    constructor(imageService, itemCategoryService, itemService, itemStockAdjustService, itemUnitService, kotService, moneyInService, moneyOutService, partyCategoryService, partyService, profileService, purchaseService, saleService, userService) {
        this.imageService = imageService;
        this.itemCategoryService = itemCategoryService;
        this.itemService = itemService;
        this.itemStockAdjustService = itemStockAdjustService;
        this.itemUnitService = itemUnitService;
        this.kotService = kotService;
        this.moneyInService = moneyInService;
        this.moneyOutService = moneyOutService;
        this.partyCategoryService = partyCategoryService;
        this.partyService = partyService;
        this.profileService = profileService;
        this.purchaseService = purchaseService;
        this.saleService = saleService;
        this.userService = userService;
    }
    reset(req, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.imageService.permanentDeleteAll(phone);
            yield this.itemCategoryService.permanentDeleteAll(phone);
            yield this.itemService.permanentDeleteAll(phone);
            yield this.itemStockAdjustService.permanentDeleteAll(phone);
            yield this.itemUnitService.permanentDeleteAll(phone);
            yield this.kotService.permanentDeleteAll(phone);
            yield this.moneyInService.permanentDeleteAll(phone);
            yield this.moneyOutService.permanentDeleteAll(phone);
            yield this.partyCategoryService.permanentDeleteAll(phone);
            yield this.partyService.permanentDeleteAll(phone);
            yield this.profileService.permanentDeleteAll(phone);
            yield this.purchaseService.permanentDeleteAll(phone);
            yield this.saleService.permanentDeleteAll(phone);
            return Object.assign({}, Page_1.StatusSuccess);
        });
    }
    createAccount(req, phone, src) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.directAccount(phone);
            if (src != 'moveToFast') {
                let allProfiles = yield this.profileService.fetchAllv3(phone, 0, null);
                let isProfileAvailable = false;
                for (let i = 0; i < allProfiles.length; i++) {
                    if (!isProfileAvailable && !allProfiles[i].deletedStamp) {
                        isProfileAvailable = true;
                    }
                }
                if (!isProfileAvailable) {
                    let profile = yield this.profileService.generateNewProfile(phone);
                    if (profile === null || profile === void 0 ? void 0 : profile._localUUID) {
                        yield this.partyService.addCashSaleParty(phone, profile._localUUID);
                    }
                }
            }
            return Object.assign({}, Page_1.StatusSuccess);
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/reset'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "reset", null);
__decorate([
    (0, routing_controllers_1.Post)('/createAccount'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phone')),
    __param(2, (0, routing_controllers_1.QueryParam)('src')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccount", null);
AccountController = __decorate([
    (0, routing_controllers_1.Controller)('/account'),
    __metadata("design:paramtypes", [ImageService_1.ImageService,
        ItemCategoryService_1.ItemCategoryService,
        ItemService_1.ItemService,
        ItemStockAdjustService_1.ItemStockAdjustService,
        ItemUnitService_1.ItemUnitService,
        KotService_1.KotService,
        MoneyInService_1.MoneyInService,
        MoneyOutService_1.MoneyOutService,
        PartyCategoryService_1.PartyCategoryService,
        PartyService_1.PartyService,
        ProfileService_1.ProfileService,
        PurchaseService_1.PurchaseService,
        SaleService_1.SaleService,
        UserService_1.UserService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=AccountController.js.map