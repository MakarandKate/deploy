"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyCategoryRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const PartyCategory_1 = require("../models/PartyCategory");
exports.PartyCategoryRepository = DataSource_1.AppDataSource.getMongoRepository(PartyCategory_1.PartyCategory).extend({
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
//# sourceMappingURL=PartyCategoryRepository.js.map