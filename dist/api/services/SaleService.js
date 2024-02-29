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
exports.SaleService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Sale_1 = require("../models/Sale");
const SaleRepository_1 = require("../repositories/SaleRepository");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const lib_1 = require("@makarandkate/ezo-connect-wa/lib");
const ProfileRepository_1 = require("../repositories/ProfileRepository");
const RedisApp_1 = require("../../lib/RedisApp");
const whatsapp_1 = require("@makarandkate/ezo-connect-wa/lib/whatsapp");
const request_1 = __importDefault(require("request"));
const IngredientService_1 = require("./IngredientService");
const IngredientStockAdjustService_1 = require("./IngredientStockAdjustService");
const sale_1 = require("../modelsv2/sale");
const ns = new Sale_1.Sale();
let SaleService = class SaleService extends BaseService_1.BaseService {
    constructor(eventDispatcher, ingredientService, ingredientsStockAdjustService) {
        super(SaleRepository_1.SaleRepository);
        this.eventDispatcher = eventDispatcher;
        this.ingredientService = ingredientService;
        this.ingredientsStockAdjustService = ingredientsStockAdjustService;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SaleRepository_1.SaleRepository.findDeleted();
        });
    }
    getAllDeleted(profileId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let deletedSales = yield SaleRepository_1.SaleRepository.findBy({
                deletedStamp: { $gt: 0 },
                profileId,
                userId
            });
            deletedSales === null || deletedSales === void 0 ? void 0 : deletedSales.forEach(sale => {
                sale = ns === null || ns === void 0 ? void 0 : ns.expand(sale);
            });
            return deletedSales;
        });
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SaleRepository_1.SaleRepository.findBy({ userId });
        });
    }
    getByUUID(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return SaleRepository_1.SaleRepository.findOneBy({
                _localUUID: uuid,
            });
        });
    }
    getByOldFirebaseId(oldFirebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return SaleRepository_1.SaleRepository.findOneBy({ oldFirebaseId });
        });
    }
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            document.syncStamp = +new Date();
            if (document.deviceSyncStartStamp) {
                document.syncStamp = document.deviceSyncStartStamp;
            }
            let localId = document._localId;
            delete document._localId;
            let profile = document.profile;
            if (document.profile) {
                delete document.profile;
            }
            let checkDocument = yield SaleRepository_1.SaleRepository.findOne({
                where: {
                    _localUUID: document._localUUID,
                    profileId: document.profileId
                },
                order: {
                    updatedStamp: -1
                }
            });
            checkDocument = ns.expand(checkDocument);
            let returnDocument = checkDocument;
            if (checkDocument != null) {
                if (checkDocument.updatedStamp < document.updatedStamp) {
                    document._is = +new Date();
                    document = ns.compress(document);
                    let updateResult = yield SaleRepository_1.SaleRepository.updateMany({
                        _localUUID: checkDocument._localUUID
                    }, {
                        "$set": Object.assign({}, document)
                    });
                    let savedDocument = yield SaleRepository_1.SaleRepository.findOne({
                        where: {
                            _localUUID: document._localUUID,
                            profileId: document.profileId
                        },
                        order: {
                            updatedStamp: -1
                        }
                    });
                    savedDocument = ns.expand(savedDocument);
                    savedDocument._serverIdRef = savedDocument._id.toString();
                    savedDocument._localId = localId;
                    returnDocument = savedDocument;
                    if (!checkDocument.billCompleteStamp && savedDocument.billCompleteStamp > 0) {
                        this.sendMessageToParty(profile, savedDocument);
                    }
                    if (!(checkDocument === null || checkDocument === void 0 ? void 0 : checkDocument.billCompleteStamp)
                        && (savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.billCompleteStamp)) {
                        this.updateIngredientStockForSaleCreate(savedDocument, profile);
                    }
                    else if ((checkDocument === null || checkDocument === void 0 ? void 0 : checkDocument.billCompleteStamp)
                        && (savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.billCompleteStamp)
                        && !(savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.deletedStamp)) {
                        this.updateIngredientStockForSaleUpdate(checkDocument, savedDocument, profile);
                    }
                    else if ((checkDocument === null || checkDocument === void 0 ? void 0 : checkDocument.billCompleteStamp)
                        && (savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.billCompleteStamp)
                        && (savedDocument === null || savedDocument === void 0 ? void 0 : savedDocument.deletedStamp)) {
                        this.updateIngredientStockForSaleDelete(savedDocument, profile);
                    }
                }
                else {
                    returnDocument._serverIdRef = returnDocument._id.toString();
                }
            }
            else {
                document._is = +new Date();
                document = ns.compress(document);
                let savedDocument = yield SaleRepository_1.SaleRepository.save(document);
                savedDocument = ns.expand(savedDocument);
                savedDocument._serverIdRef = savedDocument._id.toString();
                savedDocument._localId = localId;
                delete savedDocument._id;
                returnDocument = savedDocument;
                if (savedDocument.billCompleteStamp > 0) {
                    this.sendMessageToParty(profile, savedDocument);
                    this.updateLeadSquareInvoiceCount(profile);
                    this.updateIngredientStockForSaleCreate(savedDocument, profile);
                }
            }
            try {
                let collectionName = 'Sale';
                let latestDocumentUpdateStamp = document.updatedStamp;
                let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.userId}_${collectionName}`);
                let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
                if (userIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.userId}_${collectionName}`, latestDocumentUpdateStamp + '');
                }
                let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${document.profileId}_${collectionName}`);
                let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                if (profileIdCollectionStamp < latestDocumentUpdateStamp) {
                    yield (0, RedisApp_1.SetToRedis)(`${document.profileId}_${collectionName}`, latestDocumentUpdateStamp + '');
                }
            }
            catch (err) {
            }
            if (document.deviceSyncStartStamp) {
                returnDocument.deviceSyncStartStamp = document.deviceSyncStartStamp;
                if (returnDocument.syncStamp < document.deviceSyncStartStamp) {
                    returnDocument.syncStamp = document.deviceSyncStartStamp;
                }
            }
            return returnDocument;
        });
    }
    updateIngredientStockForSaleCreate(newSale, profile) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (profile === null || profile === void 0 ? void 0 : profile.itSetEnableIngredient) {
                (_a = newSale === null || newSale === void 0 ? void 0 : newSale.billItems) === null || _a === void 0 ? void 0 : _a.forEach((billItem) => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    (_c = (_b = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _b === void 0 ? void 0 : _b.itemIngredients) === null || _c === void 0 ? void 0 : _c.forEach((itemIngredient) => __awaiter(this, void 0, void 0, function* () {
                        var _d, _e, _f;
                        if (((_d = itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.ingredient) === null || _d === void 0 ? void 0 : _d._localUUID) && (itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.quantity)) {
                            yield this.ingredientsStockAdjustService.addSaleTransaction(newSale, (_e = itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.ingredient) === null || _e === void 0 ? void 0 : _e._localUUID, -1 * ((billItem === null || billItem === void 0 ? void 0 : billItem.quantity) || 0) * (itemIngredient.quantity || 0), (_f = itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.ingredient) === null || _f === void 0 ? void 0 : _f.unit, '');
                        }
                    }));
                }));
            }
            return true;
        });
    }
    updateIngredientStockForSaleUpdate(oldSale, newSale, profile) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (profile === null || profile === void 0 ? void 0 : profile.itSetEnableIngredient) {
                yield this.updateIngredientStockForSaleDelete(oldSale, profile);
                (_a = newSale === null || newSale === void 0 ? void 0 : newSale.billItems) === null || _a === void 0 ? void 0 : _a.forEach((billItem) => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    (_c = (_b = billItem === null || billItem === void 0 ? void 0 : billItem.item) === null || _b === void 0 ? void 0 : _b.itemIngredients) === null || _c === void 0 ? void 0 : _c.forEach((itemIngredient) => __awaiter(this, void 0, void 0, function* () {
                        var _d, _e, _f;
                        if (((_d = itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.ingredient) === null || _d === void 0 ? void 0 : _d._localUUID) && (itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.quantity)) {
                            yield this.ingredientsStockAdjustService.addSaleTransaction(newSale, (_e = itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.ingredient) === null || _e === void 0 ? void 0 : _e._localUUID, -1 * ((billItem === null || billItem === void 0 ? void 0 : billItem.quantity) || 0) * (itemIngredient.quantity || 0), (_f = itemIngredient === null || itemIngredient === void 0 ? void 0 : itemIngredient.ingredient) === null || _f === void 0 ? void 0 : _f.unit, '', true);
                        }
                    }));
                }));
            }
            return true;
        });
    }
    updateIngredientStockForSaleDelete(newSale, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (profile === null || profile === void 0 ? void 0 : profile.itSetEnableIngredient) {
                return yield this.ingredientsStockAdjustService.deleteSaleTransaction(newSale === null || newSale === void 0 ? void 0 : newSale._localUUID);
            }
            return true;
        });
    }
    updateLeadSquareInvoiceCount(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (profile === null || profile === void 0 ? void 0 : profile.userId) {
                    (0, request_1.default)(`https://ops.ezobooks.in/kappa/api/LeadSquareWebhook/updateFastInvoiceCount?phone=${profile === null || profile === void 0 ? void 0 : profile.userId}`, (err, response) => {
                        if (err) {
                            console.error("-----------------------");
                            console.error("SaleService:174");
                            console.error(err);
                            console.error("-----------------------");
                        }
                    });
                }
            }
            catch (error) {
            }
        });
    }
    sendMessageToParty(profile, sale) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let billLink = `https://db.ezobooks.in/kappa/billView/sale/${sale.userId}/${sale._localUUID}`;
                // let shortLink=await Util.getShortLink(billLink);
                // if(shortLink.indexOf("error")!=-1){
                //     shortLink='';
                // }
                if (!profile) {
                    profile = yield ProfileRepository_1.ProfileRepository.findOne({
                        where: {
                            _localUUID: sale === null || sale === void 0 ? void 0 : sale.profileId
                        }
                    });
                }
                if (profile) {
                    let balance = (Number(sale === null || sale === void 0 ? void 0 : sale.totalAmount) || 0) - (Number(sale === null || sale === void 0 ? void 0 : sale.amountReceived) || 0);
                    if (balance < 0) {
                        balance = 0;
                    }
                    if (!(profile.mcSendMessageToParty == false)) {
                        let logoUrl = ``;
                        if (profile === null || profile === void 0 ? void 0 : profile.logoLink) {
                            logoUrl = `https://db.ezobooks.in/kappa/image/get/${profile === null || profile === void 0 ? void 0 : profile.userId}/${profile === null || profile === void 0 ? void 0 : profile._localUUID}/${profile === null || profile === void 0 ? void 0 : profile.logoLink}`;
                        }
                        if ((((_a = sale === null || sale === void 0 ? void 0 : sale.party) === null || _a === void 0 ? void 0 : _a.phone) || '').length > 0) {
                            // Sms.sendTemplateSms({
                            //     phone:sale?.party?.phone,
                            //     flowId:'62945a2915d49530df78277d',
                            //     variables:[
                            //         sale?.totalAmount,
                            //         sale?.amountReceived,
                            //         balance,
                            //         (profile?.legalName+'').substring(0,15),
                            //         shortLink
                            //     ]
                            // })
                            if (logoUrl) {
                                lib_1.WhatsApp.sendTransactionalMessage({
                                    accountType: whatsapp_1.WhatsappAccountType.support,
                                    phone: (_b = sale === null || sale === void 0 ? void 0 : sale.party) === null || _b === void 0 ? void 0 : _b.phone,
                                    templateId: 'experience_feedback_message',
                                    headerValues: [logoUrl],
                                    bodyValues: [
                                        (profile === null || profile === void 0 ? void 0 : profile.legalName) || '',
                                        (sale === null || sale === void 0 ? void 0 : sale.totalAmount) + '',
                                        billLink
                                    ],
                                    buttonValues: {}
                                });
                            }
                            else {
                                lib_1.WhatsApp.sendTransactionalMessage({
                                    accountType: whatsapp_1.WhatsappAccountType.support,
                                    phone: (_c = sale === null || sale === void 0 ? void 0 : sale.party) === null || _c === void 0 ? void 0 : _c.phone,
                                    templateId: 'experience_feedback_no_image_msg',
                                    headerValues: [],
                                    bodyValues: [
                                        '.',
                                        (profile === null || profile === void 0 ? void 0 : profile.legalName) || '',
                                        (sale === null || sale === void 0 ? void 0 : sale.totalAmount) + '',
                                        billLink
                                    ],
                                    buttonValues: {}
                                });
                            }
                        }
                        if ((((_d = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _d === void 0 ? void 0 : _d.phone) || '').length > 0 && ((_e = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _e === void 0 ? void 0 : _e.phone) !== (profile === null || profile === void 0 ? void 0 : profile.contactPersonPhone)) {
                            // Sms.sendTemplateSms({
                            //     phone:sale?.partySecondary?.phone,
                            //     flowId:'62945a2915d49530df78277d',
                            //     variables:[
                            //         sale?.totalAmount,
                            //         sale?.amountReceived,
                            //         balance,
                            //         (profile?.legalName+'').substring(0,15),
                            //         shortLink
                            //     ]
                            // })
                            if (logoUrl) {
                                lib_1.WhatsApp.sendTransactionalMessage({
                                    accountType: whatsapp_1.WhatsappAccountType.support,
                                    phone: (_f = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _f === void 0 ? void 0 : _f.phone,
                                    templateId: 'experience_feedback_message',
                                    headerValues: [logoUrl],
                                    bodyValues: [
                                        (profile === null || profile === void 0 ? void 0 : profile.legalName) || '',
                                        (sale === null || sale === void 0 ? void 0 : sale.totalAmount) + '',
                                        billLink
                                    ],
                                    buttonValues: {}
                                });
                            }
                            else {
                                lib_1.WhatsApp.sendTransactionalMessage({
                                    accountType: whatsapp_1.WhatsappAccountType.support,
                                    phone: (_g = sale === null || sale === void 0 ? void 0 : sale.partySecondary) === null || _g === void 0 ? void 0 : _g.phone,
                                    templateId: 'experience_feedback_no_image_msg',
                                    headerValues: [],
                                    bodyValues: [
                                        '.',
                                        (profile === null || profile === void 0 ? void 0 : profile.legalName) || '',
                                        (sale === null || sale === void 0 ? void 0 : sale.totalAmount) + '',
                                        billLink
                                    ],
                                    buttonValues: {}
                                });
                            }
                        }
                    }
                    if ((profile.mcSendMessageToOwner == true)) {
                        let shortLink = yield Utils_1.default.getShortLink(billLink);
                        if (shortLink.indexOf("error") != -1) {
                            shortLink = '';
                        }
                        lib_1.Sms.sendTemplateSms({
                            phone: profile === null || profile === void 0 ? void 0 : profile.userId,
                            flowId: '62945a2915d49530df78277d',
                            variables: [
                                sale === null || sale === void 0 ? void 0 : sale.totalAmount,
                                sale === null || sale === void 0 ? void 0 : sale.amountReceived,
                                balance,
                                ((profile === null || profile === void 0 ? void 0 : profile.legalName) + '').substring(0, 15),
                                shortLink
                            ]
                        });
                    }
                }
            }
            catch (err) {
            }
        });
    }
    saveAll(sales, phone, version, a) {
        return __awaiter(this, void 0, void 0, function* () {
            let processStartTime = +new Date();
            let savedSales = [];
            for (let i = 0; i < (sales === null || sales === void 0 ? void 0 : sales.length); i++) {
                let sale = sales[i];
                if (sale.updatedStamp == 0) {
                    sale.updatedStamp = sale.createdStamp;
                }
                if (!sale.userId) {
                    sale.userId = phone;
                }
                let savedSale = yield this.save(sale);
                savedSales.push(savedSale);
            }
            let processEndTime = +new Date();
            // console.info(`SaleService:329: phone: ${phone} | savedSales:${savedSales.length} | time:${processEndTime-processStartTime}`);
            return savedSales;
        });
    }
    fetchAll(phone, lastSyncStamp, accessProfiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Sale';
            let sales = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                sales = yield SaleRepository_1.SaleRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted)
                });
            }
            if (sales == null) {
                sales = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileSales = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileSales = yield SaleRepository_1.SaleRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted)
                        });
                    }
                    if (profileSales && profileSales.length) {
                        sales.push(...profileSales);
                    }
                }
            }
            let rawDocuments = sales;
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fetchAllv3(phone, lastSyncStamp, accessProfiles, version, compressResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Sale';
            let sales = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                sales = yield SaleRepository_1.SaleRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (sales == null) {
                sales = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileSales = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileSales = yield SaleRepository_1.SaleRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profileSales && profileSales.length) {
                        sales.push(...profileSales);
                    }
                }
            }
            let rawDocuments = sales;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            let generatedRes = rawDocuments.map((x) => {
                x = ns.expand(x);
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
            if (compressResponse) {
                generatedRes = Utils_1.default.compressResponse(generatedRes);
            }
            return generatedRes;
        });
    }
    fetchAllv4(phone, lastSyncStamp, accessProfiles, version, compressResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Sale';
            let documents = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                let qr = yield sale_1.SaleRepo.find(Object.assign({ userId: phone, updatedStamp: {
                        $gt: lastSyncStamp || 0
                    } }, includeDeleted)).sort({
                    updatedStamp: 1
                }).limit(500);
                if (qr && qr.length) {
                    qr.map((el) => { documents.push(el.toObject()); });
                }
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileDocuments = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        let qr = yield sale_1.SaleRepo.find(Object.assign({ profileId, updatedStamp: {
                                $gt: lastSyncStamp || 0
                            } }, includeDeleted)).sort({
                            updatedStamp: 1
                        }).limit(500);
                        if (qr && qr.length) {
                            qr.map((el) => { profileDocuments.push(el.toObject()); });
                        }
                    }
                    if (profileDocuments && profileDocuments.length) {
                        documents.push(...profileDocuments);
                    }
                }
            }
            let rawDocuments = documents;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            let generatedRes = rawDocuments.map((x) => {
                x = ns.expand(x);
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
            if (compressResponse) {
                generatedRes = Utils_1.default.compressResponse(generatedRes);
            }
            return generatedRes;
        });
    }
    permanentDeleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SaleRepository_1.SaleRepository.delete({
                userId
            });
        });
    }
    dashTotalBetweenTime(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SaleRepository_1.SaleRepository.count({
                createdStamp: {
                    $gte: startStamp,
                    $lt: endStamp
                }
            });
        });
    }
    dashTotalBetweenTimev2(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sale_1.SaleRepo.countDocuments({
                createdStamp: {
                    $gte: startStamp,
                    $lt: endStamp
                }
            });
        });
    }
    dashMostUsedBetweenTime(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SaleRepository_1.SaleRepository.aggregate([
                {
                    $match: {
                        createdStamp: {
                            $gte: startStamp,
                            $lt: endStamp
                        }
                    },
                },
                {
                    $group: {
                        _id: {
                            userId: '$userId',
                        },
                        count: {
                            $sum: 1,
                        }
                    },
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                }
            ]).toArray();
        });
    }
    dashMostUsedBetweenTimev2(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield sale_1.SaleRepo.aggregate([
                {
                    $match: {
                        createdStamp: {
                            $gte: startStamp,
                            $lt: endStamp
                        }
                    },
                },
                {
                    $group: {
                        _id: {
                            userId: '$userId',
                        },
                        count: {
                            $sum: 1,
                        }
                    },
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                }
            ]);
        });
    }
    dashMostUsedBetweenTimeCount(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = yield SaleRepository_1.SaleRepository.aggregate([
                {
                    $match: {
                        createdStamp: {
                            $gte: startStamp,
                            $lt: endStamp
                        }
                    },
                },
                {
                    $group: {
                        _id: {
                            userId: '$userId',
                        },
                        count: {
                            $sum: 1,
                        }
                    },
                },
                {
                    $sort: {
                        count: -1
                    }
                }
            ]).toArray();
            return (arr === null || arr === void 0 ? void 0 : arr.length) || 0;
        });
    }
    dashMostUsedBetweenTimeCountv2(startStamp, endStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = yield sale_1.SaleRepo.aggregate([
                {
                    $match: {
                        createdStamp: {
                            $gte: startStamp,
                            $lt: endStamp
                        }
                    },
                },
                {
                    $group: {
                        _id: {
                            userId: '$userId',
                        },
                        count: {
                            $sum: 1,
                        }
                    },
                },
                {
                    $sort: {
                        count: -1
                    }
                }
            ]);
            return (arr === null || arr === void 0 ? void 0 : arr.length) || 0;
        });
    }
    getSaleReport(phone, lastSyncStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawDocuments = yield SaleRepository_1.SaleRepository.find({
                where: {
                    userId: phone,
                    updatedStamp: {
                        $gt: lastSyncStamp || 0
                    }
                }
            });
            if (rawDocuments == null) {
                rawDocuments = [];
            }
            return rawDocuments.map((x) => {
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
        });
    }
    fixAllBillNumbers(userId, profileId, initiateFromStart = false) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                isSucceed: false,
                count: 0,
                error: '',
            };
            try {
                if (userId && profileId) {
                    let sales = yield SaleRepository_1.SaleRepository.find({
                        where: {
                            userId,
                            profileId,
                            deletedStamp: 0,
                        }
                    });
                    sales.sort((a, b) => {
                        if ((a === null || a === void 0 ? void 0 : a.billDateStamp) == (b === null || b === void 0 ? void 0 : b.billDateStamp)) {
                            return (a === null || a === void 0 ? void 0 : a.createdStamp) - (b === null || b === void 0 ? void 0 : b.createdStamp);
                        }
                        return (a === null || a === void 0 ? void 0 : a.billDateStamp) - (b === null || b === void 0 ? void 0 : b.billDateStamp);
                    });
                    const salesToUpdate = [];
                    let billNo = ((_a = sales[0]) === null || _a === void 0 ? void 0 : _a.billNo) || 'INV_001';
                    let arr = billNo.split('');
                    arr.forEach((ele, i) => {
                        if (isNaN(Number(ele)) == false) {
                            arr[i] = '0';
                        }
                    });
                    arr[arr.length - 1] = '1';
                    let nextBillNo = arr.join('');
                    if (initiateFromStart) {
                        nextBillNo = 'INV_001';
                        sales[0].billNo = '';
                    }
                    for (let i = 0; i < (sales === null || sales === void 0 ? void 0 : sales.length); i++) {
                        yield Utils_1.default.wait(30);
                        if (((_b = sales[i]) === null || _b === void 0 ? void 0 : _b.billNo) != nextBillNo || initiateFromStart) {
                            sales[i].billNo = nextBillNo;
                            sales[i].updatedStamp = +new Date();
                            salesToUpdate.push(sales[i]);
                        }
                        nextBillNo = Utils_1.default.nextNo(nextBillNo);
                    }
                    yield Utils_1.default.wait(3000);
                    const updatedSales = yield this.saveAll(salesToUpdate, userId, "old", "a");
                    response.count = updatedSales === null || updatedSales === void 0 ? void 0 : updatedSales.length;
                    if ((salesToUpdate === null || salesToUpdate === void 0 ? void 0 : salesToUpdate.length) === (updatedSales === null || updatedSales === void 0 ? void 0 : updatedSales.length)) {
                        response.isSucceed = true;
                    }
                }
            }
            catch (error) {
                response.error = error;
            }
            return response;
        });
    }
    getNewSaleNo(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                let sales = yield SaleRepository_1.SaleRepository.find({
                    where: {
                        userId,
                        profileId,
                        deletedStamp: 0,
                    }
                });
                sales === null || sales === void 0 ? void 0 : sales.sort((a, b) => {
                    if (b.billDateStamp == a.billDateStamp) {
                        return b.createdStamp - a.createdStamp;
                    }
                    return b.billDateStamp - a.billDateStamp;
                });
                let nextSaleNo = 'INV_001';
                if ((_a = sales[0]) === null || _a === void 0 ? void 0 : _a.billNo) {
                    nextSaleNo = Utils_1.default.nextNo(sales[0].billNo);
                }
                return resolve(nextSaleNo);
            }));
        });
    }
    fetchAllv3Clone(phone, lastSyncStamp, accessProfiles, version, compressResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let includeDeleted = {};
            // if(lastSyncStamp==0){
            //     includeDeleted={
            //         deletedStamp:0
            //     }
            // }
            let collectionName = 'Sale';
            let sales = [];
            let userIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${phone}_${collectionName}`);
            let userIdCollectionStamp = Number(userIdCollectionStampStr) || 0;
            if (userIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                sales = yield SaleRepository_1.SaleRepository.find({
                    where: Object.assign({ userId: phone, updatedStamp: {
                            $gt: lastSyncStamp || 0
                        } }, includeDeleted),
                    order: {
                        updatedStamp: 1
                    },
                    take: 500
                });
            }
            if (sales == null) {
                sales = [];
            }
            if ((accessProfiles === null || accessProfiles === void 0 ? void 0 : accessProfiles.length) > 0) {
                for (let i = 0; i < accessProfiles.length; i++) {
                    let profileId = accessProfiles[i].profileId;
                    let lastSyncStamp = accessProfiles[i].lastSyncStamp;
                    let includeDeleted = {};
                    if (accessProfiles[i].lastSyncStamp == 0) {
                        includeDeleted = {
                            deletedStamp: 0
                        };
                    }
                    let profileSales = [];
                    let profileIdCollectionStampStr = yield (0, RedisApp_1.GetFromRedis)(`${profileId}_${collectionName}`);
                    let profileIdCollectionStamp = Number(profileIdCollectionStampStr) || 0;
                    if (profileIdCollectionStamp > lastSyncStamp || lastSyncStamp == 0) {
                        profileSales = yield SaleRepository_1.SaleRepository.find({
                            where: Object.assign({ profileId, updatedStamp: {
                                    $gt: lastSyncStamp || 0
                                } }, includeDeleted),
                            order: {
                                updatedStamp: 1
                            },
                            take: 500
                        });
                    }
                    if (profileSales && profileSales.length) {
                        sales.push(...profileSales);
                    }
                }
            }
            let rawDocuments = sales;
            rawDocuments.sort((a, b) => {
                return a.updatedStamp - b.updatedStamp;
            });
            if (rawDocuments.length > 500) {
                rawDocuments = rawDocuments.slice(0, 500);
            }
            let generatedRes = rawDocuments.map((x) => {
                // x=ns.expand(x);
                x._serverIdRef = x._id.toString();
                delete x._id;
                Utils_1.default.removeNullKeysRecursively(x);
                return x;
            });
            if (compressResponse) {
                generatedRes = Utils_1.default.compressResponse(generatedRes);
            }
            return generatedRes;
        });
    }
};
SaleService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface,
        IngredientService_1.IngredientService,
        IngredientStockAdjustService_1.IngredientsStockAdjustService])
], SaleService);
exports.SaleService = SaleService;
//# sourceMappingURL=SaleService.js.map