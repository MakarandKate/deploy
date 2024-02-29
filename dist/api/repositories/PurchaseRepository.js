"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Purchase_1 = require("../models/Purchase");
exports.PurchaseRepository = DataSource_1.AppDataSource.getMongoRepository(Purchase_1.Purchase).extend({
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
//# sourceMappingURL=PurchaseRepository.js.map