"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenceRepo = void 0;
const mongoose_1 = require("mongoose");
const typeormLoader_1 = require("../../loaders/typeormLoader");
const BaseModel_1 = require("./BaseModel");
const COLLECTION_NAME = 'licence';
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, BaseModel_1.BaseSchema), { userId: { type: String }, proActivationStamp: { type: Number }, proExpiryStamp: { type: Number }, smsCredits: { type: Number }, whastappMessageCredits: { type: Number }, paidWhastappMessageCredits: { type: Number }, billPrintCredit: { type: Number } }));
exports.LicenceRepo = typeormLoader_1.db.ezoDbR.model(COLLECTION_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=licence.js.map