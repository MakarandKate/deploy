"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginTokenRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const LoginToken_1 = require("../models/LoginToken");
exports.LoginTokenRepository = DataSource_1.AppDataSource.getMongoRepository(LoginToken_1.LoginToken).extend({
    findDeleted() {
        return this.find({
            where: [
                {
                    deletedStamp: (0, typeorm_1.Not)((0, typeorm_1.IsNull)() && 0)
                }
            ]
        });
    }
});
//# sourceMappingURL=LoginTokenRepository.js.map