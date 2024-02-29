"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const ItemCategory_1 = require("../models/ItemCategory");
exports.ItemCategoryRepository = DataSource_1.AppDataSource.getMongoRepository(ItemCategory_1.ItemCategory).extend({
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
//# sourceMappingURL=ItemCategoryRepository.js.map