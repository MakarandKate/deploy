"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepo = void 0;
const mongoose_1 = require("mongoose");
const typeormLoader_1 = require("../../loaders/typeormLoader");
const BaseModel_1 = require("./BaseModel");
const COLLECTION_NAME = 'item';
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, BaseModel_1.BaseSchema), { createdBy: { type: String }, lastModifiedBy: { type: String }, createdByName: { type: String }, lastModifiedByName: { type: String }, userId: { type: String }, profileId: { type: String }, itemName: { type: String }, sellPrice: { type: Number }, purchasePrice: { type: Number }, category: { type: String }, stock: { type: Number }, type: { type: String }, onlineDeliverySellPrice: { type: Number }, onlineSellPrice: { type: Number }, acSellPrice: { type: Number }, nonAcSellPrice: { type: Number }, mrp: { type: Number }, expiryDate: { type: Number }, brandName: { type: String }, wholesalePrice: { type: Number }, wholesaleMinCutOffQty: { type: Number }, itemCode: { type: String }, barcode: { type: String }, barcode2: { type: String }, barcode3: { type: String }, barcode4: { type: String }, barcode5: { type: String }, description: { type: String }, minStock: { type: Number }, storageLocation: { type: String }, onlineDukanItem: { type: Boolean }, isTaxExempted: { type: Number }, isTaxZero: { type: Number }, taxPercentage: { type: Number }, cessPercentage: { type: Number }, spIncTax: { type: Boolean }, primaryUnit: { type: String }, secondaryUnit: { type: String }, images: [{ type: String }], hsn: { type: String }, convertRatio: { type: Number }, convertRatioR: { type: Number }, discountFlat: { type: Number }, discountPercent: { type: Number }, note: { type: String }, ppIncTax: { type: Boolean }, itemIngredients: [{ type: Object, ref: 'IItemIngredient' }], isFavourite: { type: Boolean }, oldFirebaseId: { type: String } }));
exports.ItemRepo = typeormLoader_1.db.ezoDbR.model(COLLECTION_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Item.js.map