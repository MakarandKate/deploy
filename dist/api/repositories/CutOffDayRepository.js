"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CutOffDayRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const CutOffDay_1 = require("../models/CutOffDay");
exports.CutOffDayRepository = DataSource_1.AppDataSource.getMongoRepository(CutOffDay_1.CutOffDay).extend({
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
//# sourceMappingURL=CutOffDayRepository.js.map