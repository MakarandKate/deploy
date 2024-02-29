"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBItemCategoryRepository = exports.FBPartyCategoryRepository = exports.FBItemRepository = exports.FBPartyRepository = exports.FBMoneyOutRepository = exports.FBMoneyInRepository = exports.FBPurchaseRepository = exports.FBInvoiceRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const FBMigration_1 = require("../models/FBMigration");
exports.FBInvoiceRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBInvoice).extend({
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
exports.FBPurchaseRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBPurchase).extend({
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
exports.FBMoneyInRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBMoneyIn).extend({
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
exports.FBMoneyOutRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBMoneyOut).extend({
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
exports.FBPartyRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBParty).extend({
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
exports.FBItemRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBItem).extend({
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
exports.FBPartyCategoryRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBPartyCategory).extend({
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
exports.FBItemCategoryRepository = DataSource_1.AppDataSource.getMongoRepository(FBMigration_1.FBItemCategory).extend({
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
//# sourceMappingURL=FBMigrationRepository.js.map