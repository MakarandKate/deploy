"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyInRepo = void 0;
const mongoose_1 = require("mongoose");
const typeormLoader_1 = require("../../loaders/typeormLoader");
const BaseModel_1 = require("./BaseModel");
const COLLECTION_NAME = 'moneyin';
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, BaseModel_1.BaseSchema), { createdBy: { type: String }, lastModifiedBy: { type: String }, createdByName: { type: String }, lastModifiedByName: { type: String }, userId: { type: String }, profileId: { type: String } }));
exports.MoneyInRepo = typeormLoader_1.db.ezoDbR.model(COLLECTION_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=moneyin.js.map