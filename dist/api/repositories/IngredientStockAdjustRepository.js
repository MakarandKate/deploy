"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientStockAdjustRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const IngredientStockAdjust_1 = require("../models/IngredientStockAdjust");
exports.IngredientStockAdjustRepository = DataSource_1.AppDataSource.getMongoRepository(IngredientStockAdjust_1.IngredientStockAdjust).extend({
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
//# sourceMappingURL=IngredientStockAdjustRepository.js.map