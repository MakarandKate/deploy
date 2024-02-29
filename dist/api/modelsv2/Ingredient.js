"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientRepo = void 0;
const mongoose_1 = require("mongoose");
const typeormLoader_1 = require("../../loaders/typeormLoader");
const BaseModel_1 = require("./BaseModel");
const COLLECTION_NAME = 'ingredient_v0';
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, BaseModel_1.BaseSchema), { createdBy: { type: String }, lastModifiedBy: { type: String }, createdByName: { type: String }, lastModifiedByName: { type: String }, userId: { type: String }, profileId: { type: String }, name: { type: String }, category: { type: String }, stock: { type: Number }, description: { type: String }, minStock: { type: Number }, unit: { type: String }, images: [{ type: String }] }));
exports.IngredientRepo = typeormLoader_1.db.ezoDbR.model(COLLECTION_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Ingredient.js.map