"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBMigrationService = void 0;
const ItemCategoryService_1 = require("./ItemCategoryService");
const PartyCategoryService_1 = require("./PartyCategoryService");
const ItemRepository_1 = require("./../repositories/ItemRepository");
const PartyRepository_1 = require("./../repositories/PartyRepository");
const PurchaseService_1 = require("./PurchaseService");
const SaleService_1 = require("./SaleService");
const MoneyOutService_1 = require("./MoneyOutService");
const MoneyInService_1 = require("./MoneyInService");
const PartyService_1 = require("./PartyService");
const typedi_1 = require("typedi");
const firebase = __importStar(require("firebase-admin"));
const FBMigrationRepository_1 = require("./../repositories/FBMigrationRepository");
const uuid_1 = require("uuid");
const Party_1 = require("../models/Party");
const ItemService_1 = require("./ItemService");
const Item_1 = require("../models/Item");
const MoneyIn_1 = require("../models/MoneyIn");
const MoneyOut_1 = require("../models/MoneyOut");
const Sale_1 = require("../models/Sale");
const BillItem_1 = require("../models/BillItem");
const Purchase_1 = require("../models/Purchase");
const PartyRepo_1 = require("../repos/PartyRepo");
const PartyCategory_1 = require("../models/PartyCategory");
const PartyCategoryRepo_1 = require("../repos/PartyCategoryRepo");
const ItemCategoryRepo_1 = require("../repos/ItemCategoryRepo");
const ItemCategory_1 = require("../models/ItemCategory");
const ItemRepo_1 = require("../repos/ItemRepo");
const Utils_1 = __importDefault(require("../../lib/Utils"));
const PartyCategoryRepository_1 = require("../repositories/PartyCategoryRepository");
const ItemCategoryRepository_1 = require("../repositories/ItemCategoryRepository");
const Profile_1 = require("../models/Profile");
const ProfileService_1 = require("./ProfileService");
let FBMigrationService = class FBMigrationService {
    constructor(partyService, partyRepo, itemRepo, partyCategoryRepo, itemService, itemCategoryRepo, moneyInService, moneyOutService, saleService, purchaseService, profileService, partyCategoryService, itemCategoryService) {
        this.partyService = partyService;
        this.partyRepo = partyRepo;
        this.itemRepo = itemRepo;
        this.partyCategoryRepo = partyCategoryRepo;
        this.itemService = itemService;
        this.itemCategoryRepo = itemCategoryRepo;
        this.moneyInService = moneyInService;
        this.moneyOutService = moneyOutService;
        this.saleService = saleService;
        this.purchaseService = purchaseService;
        this.profileService = profileService;
        this.partyCategoryService = partyCategoryService;
        this.itemCategoryService = itemCategoryService;
        this.migrationFlags = null;
    }
    getUsersByTimeRange(startTime, endTime) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let snapshot = yield firebase.firestore().collection(`/users`)
                    .where('isPro', '>=', startTime)
                    .where('isPro', '<', endTime)
                    .get();
                let users = [];
                if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                    snapshot.docs.forEach(doc => {
                        let data = doc.data();
                        users.push({
                            phone: data.phone,
                            isPro: new Date(data.isPro),
                            proAssignStamp: new Date(data.proAssignStamp),
                            registration: new Date(data.registrationStamp),
                            verified: new Date(data.verified),
                            mf_totalInvoiceCount: data.mf_totalInvoiceCount,
                        });
                    });
                }
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
    getUserByPhone(phone) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let snapshot = yield firebase.firestore().collection(`/users`)
                    .where('phone', '==', phone)
                    .get();
                if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                    return snapshot.docs[0].data();
                }
            }
            catch (error) {
                return null;
            }
        });
    }
    getAllProfiles(phone) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let profiles = [];
            try {
                let user = yield this.getUserByPhone(phone);
                if (user === null || user === void 0 ? void 0 : user.uid) {
                    let snapshot = yield firebase.firestore().collection(`/users/${user === null || user === void 0 ? void 0 : user.uid}/profiles`).get();
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const profile = (_b = snapshot.docs[i]) === null || _b === void 0 ? void 0 : _b.data();
                            if (((profile === null || profile === void 0 ? void 0 : profile.id) || (profile === null || profile === void 0 ? void 0 : profile.profileId)) && !(profile === null || profile === void 0 ? void 0 : profile.deletedStamp)) {
                                profiles.push(profile);
                            }
                        }
                    }
                }
                return profiles;
            }
            catch (error) {
                return profiles;
            }
        });
    }
    moveProfileToFast(phone) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function* () {
            let profiles = [];
            let fastProfiles = [];
            let existingFastProfiles = yield this.profileService.fetchAllv3(phone, 0, []);
            try {
                let user = yield this.getUserByPhone(phone);
                if (user === null || user === void 0 ? void 0 : user.uid) {
                    let snapshot = yield firebase.firestore().collection(`/users/${user === null || user === void 0 ? void 0 : user.uid}/profiles`).get();
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const profile = (_b = snapshot.docs[i]) === null || _b === void 0 ? void 0 : _b.data();
                            if (((profile === null || profile === void 0 ? void 0 : profile.id) || (profile === null || profile === void 0 ? void 0 : profile.profileId)) && !(profile === null || profile === void 0 ? void 0 : profile.deletedStamp)) {
                                profiles.push(profile);
                            }
                        }
                    }
                }
                if (profiles === null || profiles === void 0 ? void 0 : profiles.length) {
                    for (let i = 0; i < (profiles === null || profiles === void 0 ? void 0 : profiles.length); i++) {
                        let isSkipSave = false;
                        const profile = profiles[i];
                        let fastProfile = new Profile_1.Profile();
                        let firePID = (profile === null || profile === void 0 ? void 0 : profile.id) || (profile === null || profile === void 0 ? void 0 : profile.profileId);
                        let index = existingFastProfiles === null || existingFastProfiles === void 0 ? void 0 : existingFastProfiles.findIndex(x => (x === null || x === void 0 ? void 0 : x.oldFirebaseId) == firePID);
                        if (index != -1) {
                            fastProfile = existingFastProfiles[index];
                            isSkipSave = true;
                        }
                        if (!isSkipSave) {
                            fastProfile.profileName = ((_c = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _c === void 0 ? void 0 : _c.profileName) || 'Bill Book';
                            fastProfile.legalName = (_d = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _d === void 0 ? void 0 : _d.legalName;
                            fastProfile.contactPersonPhone = (_e = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _e === void 0 ? void 0 : _e.contactPersonPhone;
                            fastProfile.contactPersonName = (_f = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _f === void 0 ? void 0 : _f.contactPersonName;
                            // Added as per discussion with Gaurav and Makarand sir
                            fastProfile.gstin = (_g = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _g === void 0 ? void 0 : _g.gstNumber;
                            fastProfile.addressLine1 = (_h = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _h === void 0 ? void 0 : _h.addressLine1;
                            fastProfile.addressCity = (_j = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _j === void 0 ? void 0 : _j.addressCity;
                            fastProfile.addressProvience = (_k = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _k === void 0 ? void 0 : _k.addressState;
                            fastProfile.addressPostalCode = (_l = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _l === void 0 ? void 0 : _l.addressPincode;
                            fastProfile.bankUPI = (_m = profile === null || profile === void 0 ? void 0 : profile.profileData) === null || _m === void 0 ? void 0 : _m.upi;
                            // -------------------------------------------------------------------------
                            fastProfile.iSetItemSelectorStyleWeb = 'RestaurantImage';
                            fastProfile.pSetTermsAndConditions = 'Thank You! Visit Again!';
                            fastProfile.userId = phone;
                            fastProfile.createdBy = fastProfile.lastModifiedBy = 'system';
                            fastProfile.createdByName = fastProfile.lastModifiedByName = 'system';
                            let timeStamp = +new Date();
                            fastProfile.createdStamp = timeStamp;
                            fastProfile.updatedStamp = timeStamp;
                            fastProfile.deletedStamp = 0;
                            fastProfile.syncStamp = 0;
                            fastProfile._localUUID = Utils_1.default.getUUID() + '' + Utils_1.default.generateRandomPhone(4);
                            fastProfile.oldFirebaseId = (profile === null || profile === void 0 ? void 0 : profile.id) || (profile === null || profile === void 0 ? void 0 : profile.profileId);
                            fastProfile = yield this.profileService.save(fastProfile);
                        }
                        if (fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile._localUUID) {
                            fastProfiles.push(profile);
                        }
                    }
                }
                if ((profiles === null || profiles === void 0 ? void 0 : profiles.length) === (fastProfiles === null || fastProfiles === void 0 ? void 0 : fastProfiles.length)) {
                    return {
                        isSuccess: true,
                        profiles
                    };
                }
                return {
                    isSuccess: false,
                    profiles
                };
            }
            catch (error) {
                return {
                    isSuccess: false,
                    profiles
                };
            }
        });
    }
    movePartyItemCatToFast(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            let successCounter = 0;
            try {
                let user = yield this.getUserByPhone(phone);
                if (user === null || user === void 0 ? void 0 : user.uid) {
                    let userId = user === null || user === void 0 ? void 0 : user.uid;
                    let fastProfiles = [];
                    fastProfiles = yield this.profileService.fetchAllv3(phone, 0, []);
                    fastProfiles = fastProfiles === null || fastProfiles === void 0 ? void 0 : fastProfiles.filter(profile => (profile === null || profile === void 0 ? void 0 : profile.oldFirebaseId) && !(profile === null || profile === void 0 ? void 0 : profile.deletedStamp));
                    if (fastProfiles === null || fastProfiles === void 0 ? void 0 : fastProfiles.length) {
                        for (let i = 0; i < fastProfiles.length; i++) {
                            const fastProfile = fastProfiles[i];
                            let isPartyCatFetched = yield this.fetchPartyCategories(phone, userId, +(fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile.oldFirebaseId));
                            let isPartyFetched = yield this.fetchParties(phone, userId, +(fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile.oldFirebaseId));
                            let isItemCatFetched = yield this.fetchItemCategories(phone, userId, +(fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile.oldFirebaseId));
                            let isItemFetched = yield this.fetchItems(phone, userId, +(fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile.oldFirebaseId));
                            if (isPartyCatFetched
                                && isPartyFetched
                                && isItemCatFetched
                                && isItemFetched) {
                                let isPartyCatCreated = yield this.createPartyCategories(phone, fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile._localUUID);
                                let isPartyCreated = yield this.createParties(phone, fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile._localUUID);
                                let isItemCatCreated = yield this.createItemCategories(phone, fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile._localUUID);
                                let isItemCreated = yield this.createItems(phone, fastProfile === null || fastProfile === void 0 ? void 0 : fastProfile._localUUID);
                                if (isPartyCatCreated
                                    && isPartyCreated
                                    && isItemCatCreated
                                    && isItemCreated) {
                                    successCounter++;
                                }
                            }
                        }
                    }
                    if ((fastProfiles === null || fastProfiles === void 0 ? void 0 : fastProfiles.length) === successCounter) {
                        return {
                            isSuccess: true,
                        };
                    }
                }
                return {
                    isSuccess: false,
                };
            }
            catch (error) {
                return {
                    isSuccess: false,
                };
            }
        });
    }
    updateMigrationFlag(userId, migrationObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRef = yield firebase.firestore().doc(`/users/${userId}`);
                let user = (yield userRef.get()).data();
                user['migrationFlags'] = migrationObj;
                let result = yield userRef.set(user, { merge: true });
                return result;
            }
            catch (error) {
                return null;
            }
        });
    }
    initMigration(phone, ezoWebProfileId, userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((phone === null || phone === void 0 ? void 0 : phone.length) === 10) {
                const user = yield this.getUserByPhone(phone);
                if (user) {
                    this.migrationFlags = user['migrationFlags'];
                    if (userId && profileId) {
                        if (!this.migrationFlags) {
                            this.migrationFlags = {
                                initiated: +new Date(),
                                fetched: 0,
                                created: 0,
                                completed: 0,
                                countMached: false,
                                fetchedFlags: {
                                    partyCategory: 0,
                                    party: 0,
                                    itemCategory: 0,
                                    item: 0,
                                    moneyIn: 0,
                                    moneyOut: 0,
                                    sale: 0,
                                    purchase: 0,
                                },
                                createdFlags: {
                                    partyCategory: 0,
                                    party: 0,
                                    itemCategory: 0,
                                    item: 0,
                                    moneyIn: 0,
                                    moneyOut: 0,
                                    sale: 0,
                                    purchase: 0,
                                },
                            };
                            yield this.updateMigrationFlag(userId, this.migrationFlags);
                        }
                        if (!this.migrationFlags.fetched) {
                            yield this.fetchAllFBData(phone, userId, profileId);
                        }
                        if (this.migrationFlags.fetched
                            && !this.migrationFlags.created) {
                            yield this.createAllData(phone, ezoWebProfileId, userId);
                        }
                    }
                }
            }
            return this.migrationFlags;
        });
    }
    checkStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRef = yield firebase.firestore().doc(`/users/${userId}`);
                let user = (yield userRef.get()).data();
                return user['migrationFlags'] || null;
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchAllFBData(phone, userId, profileId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_b = (_a = this.migrationFlags) === null || _a === void 0 ? void 0 : _a.fetchedFlags) === null || _b === void 0 ? void 0 : _b.partyCategory)) {
                let result = yield this.fetchPartyCategories(phone, userId, profileId);
                if (result) {
                    this.migrationFlags.fetchedFlags.partyCategory = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            if (!((_d = (_c = this.migrationFlags) === null || _c === void 0 ? void 0 : _c.fetchedFlags) === null || _d === void 0 ? void 0 : _d.party)) {
                let result = yield this.fetchParties(phone, userId, profileId);
                if (result) {
                    this.migrationFlags.fetchedFlags.party = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            if (!((_f = (_e = this.migrationFlags) === null || _e === void 0 ? void 0 : _e.fetchedFlags) === null || _f === void 0 ? void 0 : _f.itemCategory)) {
                let result = yield this.fetchItemCategories(phone, userId, profileId);
                if (result) {
                    this.migrationFlags.fetchedFlags.itemCategory = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            if (!((_h = (_g = this.migrationFlags) === null || _g === void 0 ? void 0 : _g.fetchedFlags) === null || _h === void 0 ? void 0 : _h.item)) {
                let result = yield this.fetchItems(phone, userId, profileId);
                if (result) {
                    this.migrationFlags.fetchedFlags.item = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            // if(!this.migrationFlags?.fetchedFlags?.moneyIn) {
            //   let result = await this.fetchMoneyIns(phone,userId,profileId);
            //   if(result) {
            //     this.migrationFlags.fetchedFlags.moneyIn = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            // if(!this.migrationFlags?.fetchedFlags?.moneyOut) {
            //   let result = await this.fetchMoneyOuts(phone,userId,profileId);
            //   if(result) {
            //     this.migrationFlags.fetchedFlags.moneyOut = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            // if(!this.migrationFlags?.fetchedFlags?.sale) {
            //   let result = await this.fetchInvoices(phone,userId,profileId);
            //   if(result) {
            //     this.migrationFlags.fetchedFlags.sale = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            // if(!this.migrationFlags?.fetchedFlags?.purchase) {
            //   let result = await this.fetchPurchases(phone,userId,profileId);
            //   if(result) {
            //     this.migrationFlags.fetchedFlags.purchase = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            if (((_k = (_j = this.migrationFlags) === null || _j === void 0 ? void 0 : _j.fetchedFlags) === null || _k === void 0 ? void 0 : _k.partyCategory)
                && ((_m = (_l = this.migrationFlags) === null || _l === void 0 ? void 0 : _l.fetchedFlags) === null || _m === void 0 ? void 0 : _m.party)
                && ((_p = (_o = this.migrationFlags) === null || _o === void 0 ? void 0 : _o.fetchedFlags) === null || _p === void 0 ? void 0 : _p.itemCategory)
                && ((_r = (_q = this.migrationFlags) === null || _q === void 0 ? void 0 : _q.fetchedFlags) === null || _r === void 0 ? void 0 : _r.item)
            // && this.migrationFlags?.fetchedFlags?.moneyIn
            // && this.migrationFlags?.fetchedFlags?.moneyOut
            // && this.migrationFlags?.fetchedFlags?.sale
            // && this.migrationFlags?.fetchedFlags?.purchase
            ) {
                this.migrationFlags.fetched = +new Date();
                yield this.updateMigrationFlag(userId, this.migrationFlags);
                return true;
            }
            else {
                return false;
            }
        });
    }
    clearMongoData(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PartyCategoryRepository_1.PartyCategoryRepository.delete({ userId: phone });
            yield PartyRepository_1.PartyRepository.delete({ userId: phone });
            yield ItemCategoryRepository_1.ItemCategoryRepository.delete({ userId: phone });
            yield ItemRepository_1.ItemRepository.delete({ userId: phone });
            // await MoneyInRepository.delete({ userId: phone });
            // await MoneyOutRepository.delete({ userId: phone });
            // await SaleRepository.delete({ userId: phone });
            // await PurchaseRepository.delete({ userId: phone });
            return true;
        });
    }
    createAllData(phone, ezoWebProfileId, userId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_b = (_a = this.migrationFlags) === null || _a === void 0 ? void 0 : _a.createdFlags) === null || _b === void 0 ? void 0 : _b.partyCategory)) {
                let result = yield this.createPartyCategories(phone, ezoWebProfileId);
                if (result) {
                    this.migrationFlags.createdFlags.partyCategory = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            if (!((_d = (_c = this.migrationFlags) === null || _c === void 0 ? void 0 : _c.createdFlags) === null || _d === void 0 ? void 0 : _d.party)) {
                let result = yield this.createParties(phone, ezoWebProfileId);
                if (result) {
                    this.migrationFlags.createdFlags.party = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            if (!((_f = (_e = this.migrationFlags) === null || _e === void 0 ? void 0 : _e.createdFlags) === null || _f === void 0 ? void 0 : _f.itemCategory)) {
                let result = yield this.createItemCategories(phone, ezoWebProfileId);
                if (result) {
                    this.migrationFlags.createdFlags.itemCategory = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            if (!((_h = (_g = this.migrationFlags) === null || _g === void 0 ? void 0 : _g.createdFlags) === null || _h === void 0 ? void 0 : _h.item)) {
                let result = yield this.createItems(phone, ezoWebProfileId);
                if (result) {
                    this.migrationFlags.createdFlags.item = +new Date();
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
            }
            // if(!this.migrationFlags?.createdFlags?.moneyIn) {
            //   let result = await this.createMoneyIns(phone);
            //   if(result) {
            //     this.migrationFlags.createdFlags.moneyIn = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            // if(!this.migrationFlags?.createdFlags?.moneyOut) {
            //   let result = await this.createMoneyOuts(phone);
            //   if(result) {
            //     this.migrationFlags.createdFlags.moneyOut = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            // if(!this.migrationFlags?.createdFlags?.sale) {
            //   let result = await this.createSales(phone);
            //   if(result) {
            //     this.migrationFlags.createdFlags.sale = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            // if(!this.migrationFlags?.createdFlags?.purchase) {
            //   let result = await this.createPurchases(phone);
            //   if(result) {
            //     this.migrationFlags.createdFlags.purchase = +new Date();
            //     await this.updateMigrationFlag(userId,this.migrationFlags);
            //   }
            // }
            if (((_k = (_j = this.migrationFlags) === null || _j === void 0 ? void 0 : _j.createdFlags) === null || _k === void 0 ? void 0 : _k.partyCategory)
                && ((_m = (_l = this.migrationFlags) === null || _l === void 0 ? void 0 : _l.createdFlags) === null || _m === void 0 ? void 0 : _m.party)
                && ((_p = (_o = this.migrationFlags) === null || _o === void 0 ? void 0 : _o.createdFlags) === null || _p === void 0 ? void 0 : _p.itemCategory)
                && ((_r = (_q = this.migrationFlags) === null || _q === void 0 ? void 0 : _q.createdFlags) === null || _r === void 0 ? void 0 : _r.item)
            // && this.migrationFlags?.createdFlags?.moneyIn
            // && this.migrationFlags?.createdFlags?.moneyOut
            // && this.migrationFlags?.createdFlags?.sale
            // && this.migrationFlags?.createdFlags?.purchase
            ) {
                this.migrationFlags.created = +new Date();
                yield this.updateMigrationFlag(userId, this.migrationFlags);
                if ((yield FBMigrationRepository_1.FBPartyCategoryRepository.countBy({ phone })) === (yield PartyCategoryRepository_1.PartyCategoryRepository.countBy({ userId: phone }))
                    && (yield FBMigrationRepository_1.FBPartyRepository.countBy({ phone })) === (yield PartyRepository_1.PartyRepository.countBy({ userId: phone }))
                    && (yield FBMigrationRepository_1.FBItemCategoryRepository.countBy({ phone })) === (yield ItemCategoryRepository_1.ItemCategoryRepository.countBy({ userId: phone }))
                    && (yield FBMigrationRepository_1.FBItemRepository.countBy({ phone })) === (yield ItemRepository_1.ItemRepository.countBy({ userId: phone }))
                // && await FBMoneyInRepository.countBy({ phone }) === await MoneyInRepository.countBy({ userId: phone })
                // && await FBMoneyOutRepository.countBy({ phone }) === await MoneyOutRepository.countBy({ userId: phone })
                // && await FBInvoiceRepository.countBy({ phone }) === await SaleRepository.countBy({ userId: phone })
                // && await FBPurchaseRepository.countBy({ phone }) === await PurchaseRepository.countBy({ userId: phone })
                ) {
                    this.migrationFlags.completed = +new Date();
                    this.migrationFlags.countMached = true;
                    yield this.updateMigrationFlag(userId, this.migrationFlags);
                }
                return true;
            }
            else {
                return false;
            }
        });
    }
    fetchPartyCategories(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBPartyCategoryRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBPartyCategoryRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/miscellaneous/tags/parties`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/miscellaneous/tags/parties`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            ((data === null || data === void 0 ? void 0 : data.localId) && !(data === null || data === void 0 ? void 0 : data.deletedStamp) && (data === null || data === void 0 ? void 0 : data.name)) && (yield FBMigrationRepository_1.FBPartyCategoryRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchParties(phone, userId, profileId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBPartyRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBPartyRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/parties`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/parties`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            ((data === null || data === void 0 ? void 0 : data.localId) && !(data === null || data === void 0 ? void 0 : data.deletedStamp) && (((_b = data === null || data === void 0 ? void 0 : data.profileData) === null || _b === void 0 ? void 0 : _b.contactPersonName) || ((_c = data === null || data === void 0 ? void 0 : data.profileData) === null || _c === void 0 ? void 0 : _c.contactPersonPhone))) && (yield FBMigrationRepository_1.FBPartyRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchItemCategories(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBItemCategoryRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBItemCategoryRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/miscellaneous/tags/items`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/miscellaneous/tags/items`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            ((data === null || data === void 0 ? void 0 : data.localId) && !(data === null || data === void 0 ? void 0 : data.deletedStamp) && (data === null || data === void 0 ? void 0 : data.name)) && (yield FBMigrationRepository_1.FBItemCategoryRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchItems(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBItemRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBItemRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/items`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/items`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            ((data === null || data === void 0 ? void 0 : data.localId) && !(data === null || data === void 0 ? void 0 : data.deletedStamp) && (data === null || data === void 0 ? void 0 : data.itemName) && (data === null || data === void 0 ? void 0 : data.sellPrice)) && (yield FBMigrationRepository_1.FBItemRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchMoneyIns(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBMoneyInRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBMoneyInRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/moneyIns`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/moneyIns`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            (data === null || data === void 0 ? void 0 : data.localId) && (yield FBMigrationRepository_1.FBMoneyInRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchMoneyOuts(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBMoneyOutRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBMoneyOutRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/moneyOuts`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/moneyOuts`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            (data === null || data === void 0 ? void 0 : data.localId) && (yield FBMigrationRepository_1.FBMoneyOutRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchInvoices(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBInvoiceRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBInvoiceRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/sales`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/sales`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            (data === null || data === void 0 ? void 0 : data.localId) && (yield FBMigrationRepository_1.FBInvoiceRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    fetchPurchases(phone, userId, profileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docsCount = yield FBMigrationRepository_1.FBPurchaseRepository.countBy({ phone });
                docsCount && (yield FBMigrationRepository_1.FBPurchaseRepository.delete({ phone }));
                let getSnapshots = true;
                let lastFetchedDoc = null;
                do {
                    let snapshot = null;
                    if (lastFetchedDoc) {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/purchases`)
                            .limit(5000)
                            .startAfter(lastFetchedDoc)
                            .get();
                    }
                    else {
                        snapshot = yield firebase.firestore().collection(`/users/${userId}/profiles/${profileId}/purchases`)
                            .limit(5000)
                            .get();
                    }
                    if ((_a = snapshot === null || snapshot === void 0 ? void 0 : snapshot.docs) === null || _a === void 0 ? void 0 : _a.length) {
                        for (let i = 0; i < snapshot.docs.length; i++) {
                            const doc = snapshot.docs[i];
                            let data = doc === null || doc === void 0 ? void 0 : doc.data();
                            (data === null || data === void 0 ? void 0 : data.localId) && (yield FBMigrationRepository_1.FBPurchaseRepository.save({ localId: data === null || data === void 0 ? void 0 : data.localId, phone, data }));
                        }
                        lastFetchedDoc = snapshot.docs[snapshot.docs.length - 1];
                    }
                    else {
                        getSnapshots = false;
                    }
                } while (getSnapshots);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    createPartyCategories(phone, ezoWebProfileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partyCategories = yield FBMigrationRepository_1.FBPartyCategoryRepository.findBy({ phone });
                if (partyCategories === null || partyCategories === void 0 ? void 0 : partyCategories.length) {
                    for (let i = 0; i < partyCategories.length; i++) {
                        try {
                            const fbPartyCategory = (_a = partyCategories[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbPartyCategory === null || fbPartyCategory === void 0 ? void 0 : fbPartyCategory.localId) {
                                const newPartyCategory = new PartyCategory_1.PartyCategory();
                                newPartyCategory._localUUID = Utils_1.default.getUUID();
                                newPartyCategory.name = (fbPartyCategory === null || fbPartyCategory === void 0 ? void 0 : fbPartyCategory.name) || null;
                                newPartyCategory.oldFirebaseId = fbPartyCategory.localId;
                                newPartyCategory.profileId = ezoWebProfileId;
                                newPartyCategory.userId = phone;
                                newPartyCategory.createdBy = newPartyCategory.lastModifiedBy = 'system';
                                newPartyCategory.createdByName = newPartyCategory.lastModifiedByName = 'system';
                                let timeStamp = +new Date();
                                newPartyCategory.createdStamp = timeStamp;
                                newPartyCategory.updatedStamp = timeStamp;
                                newPartyCategory.deletedStamp = 0;
                                newPartyCategory.syncStamp = 0;
                                yield this.partyCategoryService.save(newPartyCategory);
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createParties(phone, ezoWebProfileId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parties = yield FBMigrationRepository_1.FBPartyRepository.findBy({ phone });
                if (parties === null || parties === void 0 ? void 0 : parties.length) {
                    for (let i = 0; i < parties.length; i++) {
                        try {
                            const fbParty = (_a = parties[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbParty === null || fbParty === void 0 ? void 0 : fbParty.localId) {
                                const newParty = new Party_1.Party();
                                newParty._localUUID = Utils_1.default.getUUID();
                                newParty.category = (fbParty === null || fbParty === void 0 ? void 0 : fbParty.tag) || null;
                                newParty.name = ((_b = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _b === void 0 ? void 0 : _b.contactPersonName) || ((_c = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _c === void 0 ? void 0 : _c.contactPersonPhone) || null;
                                newParty.phone = ((_d = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _d === void 0 ? void 0 : _d.contactPersonPhone) || null;
                                newParty.type = (fbParty === null || fbParty === void 0 ? void 0 : fbParty.partyType) == 'supplier' ? 'supplier' : 'customer';
                                newParty.gstin = ((_e = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _e === void 0 ? void 0 : _e.gstNumber) || null;
                                newParty.billingType = fbParty.billingType || null;
                                newParty.dateOfBirth = (fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) && (fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData['dob']) ? fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData['dob'] : null;
                                newParty.businessName = ((_f = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _f === void 0 ? void 0 : _f.legalName) || null;
                                newParty.email = ((_g = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _g === void 0 ? void 0 : _g.contactPersonEmail) || null;
                                newParty.billingAddress = ((_h = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _h === void 0 ? void 0 : _h.addressLine1) || null;
                                newParty.billingProvience = ((_j = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _j === void 0 ? void 0 : _j.addressState) || null;
                                newParty.billingPostalCode = ((_k = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _k === void 0 ? void 0 : _k.addressPincode) || null;
                                newParty.deliveryAddress = ((_l = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _l === void 0 ? void 0 : _l.addressOneLine1) || null;
                                newParty.deliveryProvience = ((_m = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _m === void 0 ? void 0 : _m.addressOneState) || null;
                                newParty.deliveryPostalCode = ((_o = fbParty === null || fbParty === void 0 ? void 0 : fbParty.profileData) === null || _o === void 0 ? void 0 : _o.addressOnePincode) || null;
                                newParty.paymentTerm = (fbParty === null || fbParty === void 0 ? void 0 : fbParty.paymentTerm) || null;
                                newParty.sendAlerts = Boolean(fbParty === null || fbParty === void 0 ? void 0 : fbParty.smsAlerts) || true;
                                newParty.oldFirebaseId = fbParty.localId;
                                newParty.profileId = ezoWebProfileId;
                                newParty.userId = phone;
                                newParty.createdBy = newParty.lastModifiedBy = 'system';
                                newParty.createdByName = newParty.lastModifiedByName = 'system';
                                let timeStamp = +new Date();
                                newParty.createdStamp = timeStamp;
                                newParty.updatedStamp = timeStamp;
                                newParty.deletedStamp = 0;
                                newParty.syncStamp = 0;
                                newParty.credit = 0.0;
                                if ((fbParty === null || fbParty === void 0 ? void 0 : fbParty.ledgerCredit) && Utils_1.default.isNumber(fbParty === null || fbParty === void 0 ? void 0 : fbParty.ledgerCredit)) {
                                    newParty.credit = +(fbParty === null || fbParty === void 0 ? void 0 : fbParty.ledgerCredit);
                                }
                                if (!newParty.credit) {
                                    if ((fbParty === null || fbParty === void 0 ? void 0 : fbParty.credit) && Utils_1.default.isNumber(fbParty === null || fbParty === void 0 ? void 0 : fbParty.credit)) {
                                        newParty.credit = +(fbParty === null || fbParty === void 0 ? void 0 : fbParty.credit);
                                    }
                                }
                                if (((_p = newParty === null || newParty === void 0 ? void 0 : newParty.name) === null || _p === void 0 ? void 0 : _p.toLowerCase()) == 'cash sale') {
                                    newParty.isCashSaleParty = true;
                                }
                                let savedParty = yield this.partyService.save(newParty);
                                if (savedParty === null || savedParty === void 0 ? void 0 : savedParty.credit) {
                                    if ((savedParty === null || savedParty === void 0 ? void 0 : savedParty.credit) < 0) {
                                        let moneyIn = new MoneyIn_1.MoneyIn();
                                        moneyIn.billNo = 'REC_001';
                                        moneyIn.billDateStamp = new Date().setHours(0, 0, 0, 0);
                                        moneyIn.party = savedParty;
                                        moneyIn.totalAmount = Math.abs(savedParty.credit);
                                        moneyIn.paymentMode = 'cash';
                                        moneyIn.paymentId = null;
                                        moneyIn.linkedSaleUUID = null;
                                        moneyIn.userId = phone;
                                        moneyIn.profileId = ezoWebProfileId;
                                        moneyIn.createdBy = moneyIn.lastModifiedBy = 'system';
                                        moneyIn.createdByName = moneyIn.lastModifiedByName = 'system';
                                        let timeStamp = +new Date();
                                        moneyIn.createdStamp = timeStamp;
                                        moneyIn.updatedStamp = timeStamp;
                                        moneyIn.deletedStamp = 0;
                                        moneyIn.syncStamp = 0;
                                        moneyIn._localUUID = Utils_1.default.getUUID();
                                        yield this.moneyInService.save(moneyIn);
                                    }
                                    else if ((savedParty === null || savedParty === void 0 ? void 0 : savedParty.credit) > 0) {
                                        let moneyOut = new MoneyOut_1.MoneyOut();
                                        moneyOut.billNo = 'REC_001';
                                        moneyOut.billDateStamp = new Date().setHours(0, 0, 0, 0);
                                        moneyOut.party = savedParty;
                                        moneyOut.totalAmount = savedParty.credit;
                                        moneyOut.paymentMode = 'cash';
                                        moneyOut.paymentId = null;
                                        moneyOut.linkedExpenseUUID = null;
                                        moneyOut.linkedPurchaseUUID = null;
                                        moneyOut.userId = phone;
                                        moneyOut.profileId = ezoWebProfileId;
                                        moneyOut.createdBy = moneyOut.lastModifiedBy = 'system';
                                        moneyOut.createdByName = moneyOut.lastModifiedByName = 'system';
                                        let timeStamp = +new Date();
                                        moneyOut.createdStamp = timeStamp;
                                        moneyOut.updatedStamp = timeStamp;
                                        moneyOut.deletedStamp = 0;
                                        moneyOut.syncStamp = 0;
                                        moneyOut._localUUID = Utils_1.default.getUUID();
                                        yield this.moneyOutService.save(moneyOut);
                                    }
                                }
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createItemCategories(phone, ezoWebProfileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemCategories = yield FBMigrationRepository_1.FBItemCategoryRepository.findBy({ phone });
                if (itemCategories === null || itemCategories === void 0 ? void 0 : itemCategories.length) {
                    for (let i = 0; i < itemCategories.length; i++) {
                        try {
                            const fbItemCategory = (_a = itemCategories[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbItemCategory === null || fbItemCategory === void 0 ? void 0 : fbItemCategory.localId) {
                                const newItemCategory = new ItemCategory_1.ItemCategory();
                                newItemCategory._localUUID = Utils_1.default.getUUID();
                                newItemCategory.name = (fbItemCategory === null || fbItemCategory === void 0 ? void 0 : fbItemCategory.name) || null;
                                newItemCategory.oldFirebaseId = fbItemCategory.localId;
                                newItemCategory.profileId = ezoWebProfileId;
                                newItemCategory.userId = phone;
                                newItemCategory.createdBy = newItemCategory.lastModifiedBy = 'system';
                                newItemCategory.createdByName = newItemCategory.lastModifiedByName = 'system';
                                let timeStamp = +new Date();
                                newItemCategory.createdStamp = timeStamp;
                                newItemCategory.updatedStamp = timeStamp;
                                newItemCategory.deletedStamp = 0;
                                newItemCategory.syncStamp = 0;
                                yield this.itemCategoryService.save(newItemCategory);
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createItems(phone, ezoWebProfileId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield FBMigrationRepository_1.FBItemRepository.findBy({ phone });
                if (items === null || items === void 0 ? void 0 : items.length) {
                    for (let i = 0; i < items.length; i++) {
                        try {
                            const fbItem = (_a = items[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbItem === null || fbItem === void 0 ? void 0 : fbItem.localId) {
                                const newItem = new Item_1.Item();
                                newItem._localUUID = Utils_1.default.getUUID();
                                newItem.itemName = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.itemName) || null;
                                newItem.sellPrice = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.sellPrice) || null;
                                newItem.purchasePrice = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.purchasePrice) || null;
                                newItem.category = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.tag) || null;
                                newItem.stock = 0.0;
                                newItem.type = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.itemType) == 'service' ? 'service' : 'product';
                                newItem.onlineDeliverySellPrice = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.onlineDeliverySellPrice) || null;
                                newItem.onlineSellPrice = fbItem && fbItem['onlineSellPrice'] ? fbItem['onlineSellPrice'] : null;
                                newItem.acSellPrice = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.acSellPrice) || null;
                                newItem.nonAcSellPrice = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.nonAcSellPrice) || null;
                                newItem.mrp = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.mrp) || null;
                                newItem.expiryDate = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.expiryDate) || null;
                                newItem.brandName = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.brandName) || null;
                                newItem.wholesalePrice = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.wholesalePrice) || null;
                                newItem.wholesaleMinCutOffQty = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.wholesaleMinCutoffQty) || null;
                                newItem.itemCode = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.itemCode) || null;
                                newItem.barcode = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.barCode) || null;
                                newItem.description = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.itemDes) || null;
                                newItem.minStock = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.minStock) || null;
                                newItem.storageLocation = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.storage) || null;
                                newItem.onlineDukanItem = Boolean(fbItem === null || fbItem === void 0 ? void 0 : fbItem.onlineDukanItem) || true;
                                newItem.isTaxExempted = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.isTaxExempted) || 0;
                                newItem.isTaxZero = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.isTaxZero) || 0;
                                newItem.taxPercentage = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.taxPercentage) || null;
                                newItem.cessPercentage = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.cessPercentage) || null;
                                newItem.spIncTax = Boolean(fbItem === null || fbItem === void 0 ? void 0 : fbItem.spIncTax) || true;
                                newItem.primaryUnit = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.primaryUnit) || null;
                                newItem.secondaryUnit = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.secondaryUnit) || null;
                                newItem.hsn = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.hsn) || null;
                                if (fbItem === null || fbItem === void 0 ? void 0 : fbItem.convertRatio) {
                                    newItem.convertRatio = fbItem === null || fbItem === void 0 ? void 0 : fbItem.convertRatio;
                                    newItem.convertRatioR = Utils_1.default.capFractionsToSix(1 / newItem.convertRatio);
                                }
                                if (!(fbItem === null || fbItem === void 0 ? void 0 : fbItem.convertRatio) && (fbItem === null || fbItem === void 0 ? void 0 : fbItem.convertRatioR)) {
                                    newItem.convertRatioR = fbItem === null || fbItem === void 0 ? void 0 : fbItem.convertRatioR;
                                    newItem.convertRatioR = Utils_1.default.capFractionsToSix(1 / newItem.convertRatioR);
                                }
                                newItem.discountFlat = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.discountFlat) || 0;
                                newItem.discountPercent = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.discountPercent) || 0;
                                newItem.note = (fbItem === null || fbItem === void 0 ? void 0 : fbItem.note) || null;
                                newItem.ppIncTax = Boolean(fbItem === null || fbItem === void 0 ? void 0 : fbItem.ppIncTax) || true;
                                ;
                                newItem.oldFirebaseId = fbItem.localId;
                                newItem.profileId = ezoWebProfileId;
                                newItem.userId = phone;
                                newItem.createdBy = newItem.lastModifiedBy = 'system';
                                newItem.createdByName = newItem.lastModifiedByName = 'system';
                                let timeStamp = +new Date();
                                newItem.createdStamp = timeStamp;
                                newItem.updatedStamp = timeStamp;
                                newItem.deletedStamp = 0;
                                newItem.syncStamp = 0;
                                yield this.itemService.save(newItem);
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createMoneyIns(phone) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moneyIns = yield FBMigrationRepository_1.FBMoneyInRepository.findBy({ phone });
                if (moneyIns === null || moneyIns === void 0 ? void 0 : moneyIns.length) {
                    for (let i = 0; i < moneyIns.length; i++) {
                        try {
                            const fbMoneyIn = (_a = moneyIns[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbMoneyIn === null || fbMoneyIn === void 0 ? void 0 : fbMoneyIn.localId) {
                                const newMoneyIn = new MoneyIn_1.MoneyIn();
                                newMoneyIn.billNo = fbMoneyIn.receiptNo;
                                newMoneyIn.billDateStamp = fbMoneyIn.dateStamp;
                                let party = yield this.partyService.getByOldFirebaseId(fbMoneyIn.partyIdLocal);
                                if (party != null) {
                                    newMoneyIn.party = party;
                                }
                                newMoneyIn.totalAmount = fbMoneyIn.amount;
                                newMoneyIn.paymentMode = fbMoneyIn.txnMode;
                                newMoneyIn.oldFirebaseId = fbMoneyIn.localId;
                                newMoneyIn.createdStamp = newMoneyIn.updatedStamp = +new Date();
                                newMoneyIn.deletedStamp = (fbMoneyIn === null || fbMoneyIn === void 0 ? void 0 : fbMoneyIn.deletedStamp) || 0;
                                newMoneyIn.syncStamp = 0;
                                newMoneyIn.profileId = null;
                                newMoneyIn._localUUID = (0, uuid_1.v4)();
                                newMoneyIn.userId = phone;
                                yield this.moneyInService.save(newMoneyIn);
                                if (!newMoneyIn.deletedStamp) {
                                    party.credit -= newMoneyIn.totalAmount;
                                    yield this.partyService.update(party);
                                }
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createMoneyOuts(phone) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moneyOuts = yield FBMigrationRepository_1.FBMoneyOutRepository.findBy({ phone });
                if (moneyOuts === null || moneyOuts === void 0 ? void 0 : moneyOuts.length) {
                    for (let i = 0; i < moneyOuts.length; i++) {
                        try {
                            const fbMoneyOut = (_a = moneyOuts[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbMoneyOut === null || fbMoneyOut === void 0 ? void 0 : fbMoneyOut.localId) {
                                const newMoneyOut = new MoneyOut_1.MoneyOut();
                                newMoneyOut.billNo = fbMoneyOut.receiptNo;
                                newMoneyOut.billDateStamp = fbMoneyOut.dateStamp;
                                let party = yield this.partyService.getByOldFirebaseId(fbMoneyOut.partyIdLocal);
                                if (party != null) {
                                    newMoneyOut.party = party;
                                }
                                newMoneyOut.totalAmount = fbMoneyOut.amount;
                                newMoneyOut.paymentMode = fbMoneyOut.txnMode;
                                newMoneyOut.oldFirebaseId = fbMoneyOut.localId;
                                newMoneyOut.createdStamp = newMoneyOut.updatedStamp = +new Date();
                                newMoneyOut.deletedStamp = (fbMoneyOut === null || fbMoneyOut === void 0 ? void 0 : fbMoneyOut.deletedStamp) || 0;
                                newMoneyOut.syncStamp = 0;
                                newMoneyOut.profileId = null;
                                newMoneyOut._localUUID = (0, uuid_1.v4)();
                                newMoneyOut.userId = phone;
                                yield this.moneyOutService.save(newMoneyOut);
                                if (!newMoneyOut.deletedStamp) {
                                    party.credit += newMoneyOut.totalAmount;
                                    yield this.partyService.update(party);
                                }
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createSales(phone) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield FBMigrationRepository_1.FBInvoiceRepository.findBy({ phone });
                if (sales === null || sales === void 0 ? void 0 : sales.length) {
                    for (let i = 0; i < sales.length; i++) {
                        try {
                            const fbInvoice = (_a = sales[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbInvoice === null || fbInvoice === void 0 ? void 0 : fbInvoice.localId) {
                                const newSale = new Sale_1.Sale();
                                newSale.billNo = fbInvoice.invoiceNo;
                                newSale.billDateStamp = fbInvoice.invoiceDateStamp;
                                let party = yield this.partyService.getByOldFirebaseId((_b = fbInvoice.partyData) === null || _b === void 0 ? void 0 : _b.localId);
                                if (party != null) {
                                    newSale.party = party;
                                }
                                let newBillItems = [];
                                if ((_c = fbInvoice.invoiceItems) === null || _c === void 0 ? void 0 : _c.length) {
                                    for (let i = 0; i < fbInvoice.invoiceItems.length; i++) {
                                        const oldInvoiceItem = fbInvoice.invoiceItems[i];
                                        let newBillItem = new BillItem_1.BillItem();
                                        let item = yield this.itemService.getByOldFirebaseId(oldInvoiceItem.item.localId);
                                        if (item != null) {
                                            newBillItem.item = item;
                                        }
                                        //TODO : Calc model change
                                        newBillItem.quantity = oldInvoiceItem === null || oldInvoiceItem === void 0 ? void 0 : oldInvoiceItem.quantity;
                                        // newBillItem.discountPercent = oldInvoiceItem?.discountPercent;
                                        // newBillItem.discountFlat = oldInvoiceItem?.discountFlat;
                                        newBillItem.unit = oldInvoiceItem === null || oldInvoiceItem === void 0 ? void 0 : oldInvoiceItem.unit;
                                        newBillItem.taxPercentage = oldInvoiceItem === null || oldInvoiceItem === void 0 ? void 0 : oldInvoiceItem.taxPercentage;
                                        // newBillItem.convertRatio = oldInvoiceItem?.convertRatio;
                                        // newBillItem.onlineDeliverySellPrice = oldInvoiceItem?.onlineDeliverySellPrice;
                                        // newBillItem.sellPrice = oldInvoiceItem?.sellPrice;
                                        // newBillItem.purchasePrice = oldInvoiceItem?.purchasePrice;
                                        // newBillItem.acSellPrice = oldInvoiceItem?.acSellPrice;
                                        // newBillItem.nonAcSellPrice = oldInvoiceItem?.nonAcSellPrice;
                                        // newBillItem.spIncTax = oldInvoiceItem?.spIncTax;
                                        // newBillItem.cess = oldInvoiceItem?.cess;
                                        // newBillItem.totalAmount = oldInvoiceItem?.totalAmount;
                                        // newBillItem.totalTax = oldInvoiceItem?.totalTax;
                                        // newBillItem.totalCess = oldInvoiceItem?.totalCess;
                                        // newBillItem.totalDiscount = oldInvoiceItem?.totalDiscount;
                                        // newBillItem.mrp = oldInvoiceItem?.mrp;
                                        // newBillItem.primaryUnit = oldInvoiceItem?.primaryUnit;
                                        newBillItems.push(newBillItem);
                                    }
                                }
                                newSale.billItems = newBillItems;
                                newSale.totalAmount = fbInvoice.totalAmount;
                                newSale.oldFirebaseId = fbInvoice.localId;
                                newSale.createdStamp = newSale.updatedStamp = +new Date();
                                newSale.deletedStamp = fbInvoice.deletedStamp || 0;
                                newSale.syncStamp = 0;
                                newSale.profileId = null;
                                newSale._localUUID = (0, uuid_1.v4)();
                                newSale.userId = phone;
                                if (fbInvoice.moneyinIdLocal) {
                                    let fetchedMoneyIn = yield this.moneyInService.getByOldFirebaseId(fbInvoice.moneyinIdLocal);
                                    if (fetchedMoneyIn) {
                                        fetchedMoneyIn.linkedSaleUUID = newSale._localUUID;
                                        // newSale.moneyIn = await this.moneyInService.update(fetchedMoneyIn);
                                    }
                                }
                                yield this.saleService.save(newSale);
                                if (!newSale.deletedStamp) {
                                    party.credit += newSale.totalAmount;
                                    yield this.partyService.update(party);
                                    for (let i = 0; i < ((_d = newSale.billItems) === null || _d === void 0 ? void 0 : _d.length); i++) {
                                        let item = Object.assign({}, (_e = newSale === null || newSale === void 0 ? void 0 : newSale.billItems[i]) === null || _e === void 0 ? void 0 : _e.item);
                                        item.stock -= (_f = newSale === null || newSale === void 0 ? void 0 : newSale.billItems[i]) === null || _f === void 0 ? void 0 : _f.quantity;
                                        yield this.itemService.update(item);
                                    }
                                }
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    createPurchases(phone) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield FBMigrationRepository_1.FBPurchaseRepository.findBy({ phone });
                if (purchases === null || purchases === void 0 ? void 0 : purchases.length) {
                    for (let i = 0; i < purchases.length; i++) {
                        try {
                            const fbPurchase = (_a = purchases[i]) === null || _a === void 0 ? void 0 : _a.data;
                            if (fbPurchase === null || fbPurchase === void 0 ? void 0 : fbPurchase.localId) {
                                const newPurchase = new Purchase_1.Purchase();
                                newPurchase.billNo = fbPurchase.invoiceNo;
                                newPurchase.billDateStamp = fbPurchase.invoiceDateStamp;
                                let party = yield this.partyService.getByOldFirebaseId((_b = fbPurchase.partyData) === null || _b === void 0 ? void 0 : _b.localId);
                                if (party != null) {
                                    newPurchase.party = party;
                                }
                                let newPurchaseItems = [];
                                if ((_c = fbPurchase.purchaseItems) === null || _c === void 0 ? void 0 : _c.length) {
                                    for (let i = 0; i < fbPurchase.purchaseItems.length; i++) {
                                        const oldPurchaseItem = fbPurchase.purchaseItems[i];
                                        let newPurchaseItem = new BillItem_1.BillItem();
                                        let item = yield this.itemService.getByOldFirebaseId(oldPurchaseItem.item.localId);
                                        if (item != null) {
                                            newPurchaseItem.item = item;
                                        }
                                        //TODO : Calc model change
                                        newPurchaseItem.quantity = oldPurchaseItem === null || oldPurchaseItem === void 0 ? void 0 : oldPurchaseItem.quantity;
                                        // newPurchaseItem.discountPercent = oldPurchaseItem?.discountPercent;
                                        // newPurchaseItem.discountFlat = oldPurchaseItem?.discountFlat;
                                        newPurchaseItem.unit = oldPurchaseItem === null || oldPurchaseItem === void 0 ? void 0 : oldPurchaseItem.unit;
                                        newPurchaseItem.taxPercentage = oldPurchaseItem === null || oldPurchaseItem === void 0 ? void 0 : oldPurchaseItem.taxPercentage;
                                        // newPurchaseItem.convertRatio = oldPurchaseItem?.convertRatio;
                                        // newPurchaseItem.onlineDeliverySellPrice = oldPurchaseItem?.onlineDeliverySellPrice;
                                        // newPurchaseItem.sellPrice = oldPurchaseItem?.sellPrice;
                                        // newPurchaseItem.purchasePrice = oldPurchaseItem?.purchasePrice;
                                        // newPurchaseItem.acSellPrice = oldPurchaseItem?.acSellPrice;
                                        // newPurchaseItem.nonAcSellPrice = oldPurchaseItem?.nonAcSellPrice;
                                        // newPurchaseItem.spIncTax = oldPurchaseItem?.spIncTax;
                                        // newPurchaseItem.cess = oldPurchaseItem?.cess;
                                        // newPurchaseItem.totalAmount = oldPurchaseItem?.totalAmount;
                                        // newPurchaseItem.totalTax = oldPurchaseItem?.totalTax;
                                        // newPurchaseItem.totalCess = oldPurchaseItem?.totalCess;
                                        // newPurchaseItem.totalDiscount = oldPurchaseItem?.totalDiscount;
                                        // newPurchaseItem.mrp = oldPurchaseItem?.mrp;
                                        // newPurchaseItem.primaryUnit = oldPurchaseItem?.primaryUnit;
                                        newPurchaseItems.push(newPurchaseItem);
                                    }
                                }
                                newPurchase.billItems = newPurchaseItems;
                                newPurchase.totalAmount = fbPurchase.totalAmount;
                                newPurchase.oldFirebaseId = fbPurchase.localId;
                                newPurchase.createdStamp = newPurchase.updatedStamp = +new Date();
                                newPurchase.deletedStamp = fbPurchase.deletedStamp || 0;
                                newPurchase.syncStamp = 0;
                                newPurchase.profileId = null;
                                newPurchase._localUUID = (0, uuid_1.v4)();
                                newPurchase.userId = phone;
                                if (fbPurchase.moneyOutIdLocal) {
                                    let fetchedMoneyOut = yield this.moneyOutService.getByOldFirebaseId(fbPurchase.moneyinIdLocal);
                                    if (fetchedMoneyOut) {
                                        fetchedMoneyOut.linkedPurchaseUUID = newPurchase._localUUID;
                                        newPurchase.moneyOut = yield this.moneyOutService.update(fetchedMoneyOut);
                                    }
                                }
                                yield this.purchaseService.save(newPurchase);
                                if (!newPurchase.deletedStamp) {
                                    party.credit -= newPurchase.totalAmount;
                                    yield this.partyService.update(party);
                                    for (let i = 0; i < ((_d = newPurchase.billItems) === null || _d === void 0 ? void 0 : _d.length); i++) {
                                        let item = Object.assign({}, (_e = newPurchase === null || newPurchase === void 0 ? void 0 : newPurchase.billItems[i]) === null || _e === void 0 ? void 0 : _e.item);
                                        item.stock += (_f = newPurchase === null || newPurchase === void 0 ? void 0 : newPurchase.billItems[i]) === null || _f === void 0 ? void 0 : _f.quantity;
                                        yield this.itemService.update(item);
                                    }
                                }
                            }
                        }
                        catch (error) { }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
};
FBMigrationService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [PartyService_1.PartyService,
        PartyRepo_1.PartyRepo,
        ItemRepo_1.ItemRepo,
        PartyCategoryRepo_1.PartyCategoryRepo,
        ItemService_1.ItemService,
        ItemCategoryRepo_1.ItemCategoryRepo,
        MoneyInService_1.MoneyInService,
        MoneyOutService_1.MoneyOutService,
        SaleService_1.SaleService,
        PurchaseService_1.PurchaseService,
        ProfileService_1.ProfileService,
        PartyCategoryService_1.PartyCategoryService,
        ItemCategoryService_1.ItemCategoryService])
], FBMigrationService);
exports.FBMigrationService = FBMigrationService;
//# sourceMappingURL=FBMigrationService.js.map