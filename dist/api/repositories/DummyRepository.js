"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Dummy_1 = require("../models/Dummy");
exports.DummyRepository = DataSource_1.AppDataSource.getMongoRepository(Dummy_1.Dummy).extend({
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
//# sourceMappingURL=DummyRepository.js.map