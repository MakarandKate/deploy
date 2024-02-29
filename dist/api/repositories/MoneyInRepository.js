"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyInRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const MoneyIn_1 = require("../models/MoneyIn");
exports.MoneyInRepository = DataSource_1.AppDataSource.getMongoRepository(MoneyIn_1.MoneyIn).extend({
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
//# sourceMappingURL=MoneyInRepository.js.map