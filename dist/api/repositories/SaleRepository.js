"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Sale_1 = require("../models/Sale");
exports.SaleRepository = DataSource_1.AppDataSource.getMongoRepository(Sale_1.Sale).extend({
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
//# sourceMappingURL=SaleRepository.js.map