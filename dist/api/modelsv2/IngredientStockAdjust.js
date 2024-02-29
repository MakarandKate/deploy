"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientStockAdjustRepo = exports.ActionType = void 0;
const mongoose_1 = require("mongoose");
const typeormLoader_1 = require("../../loaders/typeormLoader");
const BaseModel_1 = require("./BaseModel");
var ActionType;
(function (ActionType) {
    ActionType["Sale"] = "Sale";
    ActionType["Purchase"] = "Purchase";
    ActionType["Scrap"] = "Scrap";
    ActionType["Transfer"] = "Transfer";
    ActionType["Return"] = "Return";
    ActionType["EOD"] = "EOD"; // ignore
})(ActionType = exports.ActionType || (exports.ActionType = {}));
const COLLECTION_NAME = 'ingredientstockadjust';
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, BaseModel_1.BaseSchema), { createdBy: { type: String }, lastModifiedBy: { type: String }, createdByName: { type: String }, lastModifiedByName: { type: String }, userId: { type: String }, profileId: { type: String }, linkedIngredientUUID: { type: String }, linkedSaleUUID: { type: String }, quantity: { type: Number }, note: { type: String }, unit: { type: String }, actionType: { type: String, enum: ActionType, default: null }, price: { type: Number }, isSaleUpdate: { type: Boolean } }));
exports.IngredientStockAdjustRepo = typeormLoader_1.db.ezoDbR.model(COLLECTION_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=IngredientStockAdjust.js.map