"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const microframework_w3tec_1 = require("microframework-w3tec");
const winstonLoader_1 = require("./loaders/winstonLoader");
const configLoader_1 = require("./loaders/configLoader");
const iocLoader_1 = require("./loaders/iocLoader");
const eventDispatchLoader_1 = require("./loaders/eventDispatchLoader");
const typeormLoader_1 = require("./loaders/typeormLoader");
const expressLoader_1 = require("./loaders/expressLoader");
const Config_1 = require("./Config");
const monitorLoader_1 = require("./loaders/monitorLoader");
const swaggerLoader_1 = require("./loaders/swaggerLoader");
const firebaseAdminLoader_1 = require("./loaders/firebaseAdminLoader");
const ablyLoader_1 = require("./loaders/ablyLoader");
require('source-map-support').install();
(0, microframework_w3tec_1.bootstrapMicroframework)({
    loaders: [
        winstonLoader_1.winstonLoader,
        configLoader_1.configLoader,
        iocLoader_1.iocLoader,
        ablyLoader_1.ablyLoader,
        eventDispatchLoader_1.eventDispatchLoader,
        typeormLoader_1.typeormLoader,
        firebaseAdminLoader_1.firebaseAdminLoader,
        expressLoader_1.expressLoader,
        monitorLoader_1.monitorLoader,
        swaggerLoader_1.swaggerLoader,
    ]
}).then(() => {
    console.info(``);
    console.info(`Aloha, your app is ready on ${Config_1.Config.domain}`);
    console.info(`To shut it down, press <CTRL> + C at any time.`);
    console.info(``);
    console.info('-------------------------------------------------------');
    console.info(`Environment  : ${Config_1.Config.env}`);
    console.info(`Port  : ${Config_1.Config.port}`);
    console.info(`Version      : `);
    console.info(``);
    console.info(`API Info     : ${Config_1.Config.domain}/api`);
    console.info(`GraphQL      : `);
    console.info(`Swagger      : ${Config_1.Config.domain}/swagger`);
    console.info(`Monitor      : ${Config_1.Config.domain}/monitor`);
    console.info('-------------------------------------------------------');
    console.info('');
    //https://pm2.keymetrics.io/docs/usage/cluster-mode/#cluster-mode
    //pm2 start dist/app.js --name="ezo-of-server" --wait-ready --listen-timeout 10000 -i 2
    if (Config_1.Config.env == Config_1.Env.prod) {
        process.on('uncaughtException', err => {
            console.info(`Uncaught Exception: ${err.message}`);
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.info('Unhandled rejection at ', promise, `reason: `, reason);
            //process.exit(1)
        });
        process.send('ready');
        process.on('SIGINT', function () {
            console.info('SIGINT');
            setTimeout(() => {
                console.info('closing after 10s');
                process.exit(0);
            }, 10000);
        });
    }
})
    .catch(error => { console.error(error); });
//# sourceMappingURL=app.js.map