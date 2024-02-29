"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyOutRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const MoneyOut_1 = require("../models/MoneyOut");
exports.MoneyOutRepository = DataSource_1.AppDataSource.getMongoRepository(MoneyOut_1.MoneyOut).extend({
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
//# sourceMappingURL=MoneyOutRepository.js.map