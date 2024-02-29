"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Expense_1 = require("../models/Expense");
exports.ExpenseRepository = DataSource_1.AppDataSource.getMongoRepository(Expense_1.Expense).extend({
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
//# sourceMappingURL=ExpenseRepository.js.map