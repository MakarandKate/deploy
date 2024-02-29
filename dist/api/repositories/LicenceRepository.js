"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenceRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Licence_1 = require("../models/Licence");
exports.LicenceRepository = DataSource_1.AppDataSource.getMongoRepository(Licence_1.Licence).extend({
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
//# sourceMappingURL=LicenceRepository.js.map