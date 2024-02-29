"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerLoader = void 0;
``;
const swaggerLoader = (settings) => {
    // if (settings) {
    //     const expressApp = settings.getData('express_app');
    //     const { validationMetadatas } = getFromContainer(
    //         MetadataStorage
    //     ) as any;
    //     const schemas = validationMetadatasToSchemas(validationMetadatas,{
    //         classTransformerMetadataStorage,
    //         refPointerPrefix:'#/components/schemas/'
    //     })
    //     const swaggerFile = routingControllersToSpec(
    //         getMetadataArgsStorage(),
    //         {},
    //         {
    //             components: {
    //                 schemas,
    //                 securitySchemes: {
    //                     basicAuth: {
    //                         type: 'http',
    //                         scheme: 'basic',
    //                     },
    //                 },
    //             },
    //         }
    //     );
    //     swaggerFile.info = {
    //         title: "Title",
    //         description: "Description",
    //         version: "Version",
    //     };
    //     expressApp.use(
    //         '/swagger',
    //         basicAuth({
    //             users: {
    //                 [`admin`]: `1234`,
    //             },
    //             challenge: true,
    //         }),
    //         swaggerUi.serve,
    //         swaggerUi.setup(swaggerFile)
    //     );
    // }
};
exports.swaggerLoader = swaggerLoader;
//# sourceMappingURL=swaggerLoader.js.map