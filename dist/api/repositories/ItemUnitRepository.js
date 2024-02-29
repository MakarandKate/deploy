"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemUnitRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const ItemUnit_1 = require("../models/ItemUnit");
exports.ItemUnitRepository = DataSource_1.AppDataSource.getMongoRepository(ItemUnit_1.ItemUnit).extend({
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
//# sourceMappingURL=ItemUnitRepository.js.map