"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStockAdjustRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const ItemStockAdjust_1 = require("../models/ItemStockAdjust");
exports.ItemStockAdjustRepository = DataSource_1.AppDataSource.getMongoRepository(ItemStockAdjust_1.ItemStockAdjust).extend({
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
//# sourceMappingURL=ItemStockAdjustRepository.js.map