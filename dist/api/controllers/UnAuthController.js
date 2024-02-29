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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ProfileService_1 = require("../services/ProfileService");
const PurchaseService_1 = require("../services/PurchaseService");
const LicenceService_1 = require("../services/LicenceService");
const MoneyOutService_1 = require("../services/MoneyOutService");
const ItemService_1 = require("../services/ItemService");
const SaleService_1 = require("../services/SaleService");
const Utils_1 = __importDefault(require("../../lib/Utils"));
let UnAuthController = class UnAuthController {
    constructor(profileService, purchaseService, moneyOutService, itemService, saleService, licenceService) {
        this.profileService = profileService;
        this.purchaseService = purchaseService;
        this.moneyOutService = moneyOutService;
        this.itemService = itemService;
        this.saleService = saleService;
        this.licenceService = licenceService;
    }
    getAllProfiles(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let phone = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.phone;
            let rawRecords = yield this.profileService.fetchAllv3(phone, 0, null);
            let records = [];
            for (let i = 0; i < rawRecords.length; i++) {
                if (!rawRecords[i].deletedStamp)
                    records.push(rawRecords[i]);
            }
            let st = Utils_1.default.responseDate();
            return { records, st, meta: { collection: "Profile" } };
        });
    }
    getAllPurchasesWithMoneyOut(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let allPurchases = yield this.purchaseService.getAll2();
            let filteredPurchase = allPurchases.filter(purchase => { var _a; return (_a = purchase === null || purchase === void 0 ? void 0 : purchase.moneyOut) === null || _a === void 0 ? void 0 : _a._localUUID; });
            let cnt = 0;
            for (let i = 0; i < filteredPurchase.length; i++) {
                const purchase = filteredPurchase[i];
                if ((purchase === null || purchase === void 0 ? void 0 : purchase._localUUID) && (purchase === null || purchase === void 0 ? void 0 : purchase.totalAmount) && ((_a = purchase === null || purchase === void 0 ? void 0 : purchase.party) === null || _a === void 0 ? void 0 : _a._localUUID)) {
                    purchase.moneyOuts = [purchase.moneyOut];
                    purchase.updatedStamp = +new Date();
                    yield this.purchaseService.save(purchase);
                    cnt++;
                }
            }
            return { length: filteredPurchase === null || filteredPurchase === void 0 ? void 0 : filteredPurchase.length, cnt };
        });
    }
    fixSpIncTax0(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let status = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.status;
            let allItems = yield this.itemService.getAllIncTax0();
            let cnt = 0;
            if (status) {
                for (let i = 0; i < allItems.length; i++) {
                    const item = allItems[i];
                    item.spIncTax = false;
                    item.updatedStamp = +new Date();
                    yield this.itemService.update(item);
                    cnt++;
                }
            }
            return { length: allItems === null || allItems === void 0 ? void 0 : allItems.length, cnt };
        });
    }
    fixSpIncTax1(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let status = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.status;
            let allItems = yield this.itemService.getAllIncTax1();
            let cnt = 0;
            if (status) {
                for (let i = 0; i < allItems.length; i++) {
                    const item = allItems[i];
                    item.spIncTax = true;
                    item.updatedStamp = +new Date();
                    yield this.itemService.update(item);
                    cnt++;
                }
            }
            return { length: allItems === null || allItems === void 0 ? void 0 : allItems.length, cnt };
        });
    }
    fixSpIncTax1BillItem(req) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
            let status = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.status;
            let allSales = yield this.saleService.getAllByUserId(userId);
            let cnt = 0;
            if (status) {
                for (let i = 0; i < allSales.length; i++) {
                    const sale = allSales[i];
                    let isChange = false;
                    for (let j = 0; j < ((_c = sale === null || sale === void 0 ? void 0 : sale.billItems) === null || _c === void 0 ? void 0 : _c.length); j++) {
                        //@ts-ignore
                        if (((_d = sale === null || sale === void 0 ? void 0 : sale.billItems[j]) === null || _d === void 0 ? void 0 : _d.incTax) === 0) {
                            sale.billItems[j].incTax = false;
                            isChange = true;
                        }
                        //@ts-ignore
                        if (((_e = sale === null || sale === void 0 ? void 0 : sale.billItems[j]) === null || _e === void 0 ? void 0 : _e.incTax) === 1) {
                            sale.billItems[j].incTax = true;
                            isChange = true;
                        }
                        //@ts-ignore
                        if (((_g = (_f = sale === null || sale === void 0 ? void 0 : sale.billItems[j]) === null || _f === void 0 ? void 0 : _f.item) === null || _g === void 0 ? void 0 : _g.spIncTax) === 0) {
                            sale.billItems[j].item.spIncTax = false;
                            isChange = true;
                        }
                        //@ts-ignore
                        if (((_h = sale === null || sale === void 0 ? void 0 : sale.billItems[j]) === null || _h === void 0 ? void 0 : _h.item.spIncTax) === 1) {
                            sale.billItems[j].item.spIncTax = true;
                            isChange = true;
                        }
                    }
                    if (isChange) {
                        sale.updatedStamp = +new Date();
                        yield this.saleService.update(sale);
                        cnt++;
                    }
                }
            }
            return { length: allSales === null || allSales === void 0 ? void 0 : allSales.length, cnt };
        });
    }
    fixAllBillNumbers(req, userId, profileId, collection, initiateFromStart) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = null;
            if (collection == 'sale') {
                response = yield this.saleService.fixAllBillNumbers(userId, profileId, initiateFromStart);
            }
            return response;
        });
    }
    getAllSales(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.saleService.getAllByUserId(userId);
            return { response };
        });
    }
    getProfileDetailsByPhone(req, phoneArr) {
        return __awaiter(this, void 0, void 0, function* () {
            let proData = yield this.licenceService.getProfileDetailsByPhone(phoneArr);
            return { proData };
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/getAllProfiles'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "getAllProfiles", null);
__decorate([
    (0, routing_controllers_1.Get)('/getAllPurchasesWithMoneyOut'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "getAllPurchasesWithMoneyOut", null);
__decorate([
    (0, routing_controllers_1.Get)('/fixSpIncTax0'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "fixSpIncTax0", null);
__decorate([
    (0, routing_controllers_1.Get)('/fixSpIncTax1'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "fixSpIncTax1", null);
__decorate([
    (0, routing_controllers_1.Get)('/fixSpIncTaxBillItem'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "fixSpIncTax1BillItem", null);
__decorate([
    (0, routing_controllers_1.Post)('/fixAllBillNumbers'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __param(2, (0, routing_controllers_1.BodyParam)('profileId')),
    __param(3, (0, routing_controllers_1.BodyParam)('collection')),
    __param(4, (0, routing_controllers_1.BodyParam)('initiateFromStart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "fixAllBillNumbers", null);
__decorate([
    (0, routing_controllers_1.Post)('/getAllSales'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "getAllSales", null);
__decorate([
    (0, routing_controllers_1.Post)('/getProfileDetailsByPhone'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.BodyParam)('phoneArr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UnAuthController.prototype, "getProfileDetailsByPhone", null);
UnAuthController = __decorate([
    (0, routing_controllers_1.Controller)('/unAuth')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    __metadata("design:paramtypes", [ProfileService_1.ProfileService,
        PurchaseService_1.PurchaseService,
        MoneyOutService_1.MoneyOutService,
        ItemService_1.ItemService,
        SaleService_1.SaleService,
        LicenceService_1.LicenceService])
], UnAuthController);
exports.UnAuthController = UnAuthController;
//# sourceMappingURL=UnAuthController.js.map