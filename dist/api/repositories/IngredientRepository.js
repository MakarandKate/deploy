"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Ingredient_1 = require("../models/Ingredient");
exports.IngredientRepository = DataSource_1.AppDataSource.getMongoRepository(Ingredient_1.Ingredient).extend({
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
//# sourceMappingURL=IngredientRepository.js.map