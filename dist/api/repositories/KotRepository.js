"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KotRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Kot_1 = require("../models/Kot");
exports.KotRepository = DataSource_1.AppDataSource.getMongoRepository(Kot_1.Kot).extend({
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
//# sourceMappingURL=KotRepository.js.map