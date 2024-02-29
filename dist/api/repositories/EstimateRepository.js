"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Estimate_1 = require("../models/Estimate");
exports.EstimateRepository = DataSource_1.AppDataSource.getMongoRepository(Estimate_1.Estimate).extend({
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
//# sourceMappingURL=EstimateRepository.js.map