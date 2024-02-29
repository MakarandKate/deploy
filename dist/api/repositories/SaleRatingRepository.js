"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRatingRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const SaleRating_1 = require("../models/SaleRating");
exports.SaleRatingRepository = DataSource_1.AppDataSource.getMongoRepository(SaleRating_1.SaleRating).extend({
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
//# sourceMappingURL=SaleRatingRepository.js.map