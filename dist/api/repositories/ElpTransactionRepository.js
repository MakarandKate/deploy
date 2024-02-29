"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElpTransactionRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const ElpTransaction_1 = require("../models/ElpTransaction");
exports.ElpTransactionRepository = DataSource_1.AppDataSource.getMongoRepository(ElpTransaction_1.ElpTransaction).extend({
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
//# sourceMappingURL=ElpTransactionRepository.js.map