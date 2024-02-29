"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcRecordRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const CalcRecord_1 = require("../models/CalcRecord");
exports.CalcRecordRepository = DataSource_1.AppDataSource.getMongoRepository(CalcRecord_1.CalcRecord).extend({
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
//# sourceMappingURL=CalcRecordRepository.js.map