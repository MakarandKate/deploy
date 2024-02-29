"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepository = void 0;
const typeorm_1 = require("typeorm");
const DataSource_1 = require("../../lib/DataSource");
const Image_1 = require("../models/Image");
exports.ImageRepository = DataSource_1.AppDataSource.getMongoRepository(Image_1.Image).extend({
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
//# sourceMappingURL=ImageRepository.js.map