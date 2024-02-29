"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Party_1 = require("../models/Party");
exports.PartyRepository = DataSource_1.AppDataSource.getMongoRepository(Party_1.Party).extend({
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
//# sourceMappingURL=PartyRepository.js.map