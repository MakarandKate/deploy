"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const mongoose_1 = require("mongoose");
const typeormLoader_1 = require("../../loaders/typeormLoader");
const BaseModel_1 = require("./BaseModel");
const COLLECTION_NAME = 'user';
const schema = new mongoose_1.Schema(Object.assign(Object.assign({}, BaseModel_1.BaseSchema), { phone: { type: String }, otp: { type: String }, fixedOtp: { type: String }, otpSentStamp: { type: Number }, verifiedStamp: { type: Number }, lastTokenTime: { type: Number }, lat: { type: Number }, long: { type: Number }, lastActiveStamp: { type: Number } }));
exports.UserRepo = typeormLoader_1.db.ezoDbR.model(COLLECTION_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=user.js.map