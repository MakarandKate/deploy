"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocLoader = void 0;
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
// import { useContainer as typeGraphQLUseContainer } from 'type-graphql';
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const iocLoader = (settings) => {
    (0, routing_controllers_1.useContainer)(typeorm_typedi_extensions_1.Container);
    (0, typeorm_1.useContainer)(typeorm_typedi_extensions_1.Container);
    (0, class_validator_1.useContainer)(typeorm_typedi_extensions_1.Container);
    //typeGraphQLUseContainer(Container);
};
exports.iocLoader = iocLoader;
//# sourceMappingURL=iocLoader.js.map