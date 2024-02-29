"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyItemPriceMapRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const PartyItemPriceMap_1 = require("../models/PartyItemPriceMap");
exports.PartyItemPriceMapRepository = DataSource_1.AppDataSource.getMongoRepository(PartyItemPriceMap_1.PartyItemPriceMap).extend({
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
//# sourceMappingURL=PartyItemPriceMapRepository.js.map