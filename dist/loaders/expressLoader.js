"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const routing_controllers_1 = require("routing-controllers");
const path = __importStar(require("path"));
const expressHbs = __importStar(require("express-handlebars"));
const _router_1 = __importDefault(require("../routes/_router"));
// import favicon from 'serve-favicon';
// import helmet from 'helmet';
// import multer from 'multer';
const cors_1 = __importDefault(require("cors"));
const Config_1 = require("../Config");
// import * as expressSession from "express-session";
// import expressMySqlSession from "express-mysql-session";
const Helpers_1 = require("../lib/Helpers");
const livereload = __importStar(require("livereload"));
const connect_livereload_1 = __importDefault(require("connect-livereload"));
// import { SocketApp } from '../lib/SocketApp';
const expressLoader = (settings) => {
    if (settings) {
        const expressApp = (0, express_1.default)();
        // expressApp.use(helmet({
        //     referrerPolicy: { policy: "no-referrer" },
        //     noSniff:true,
        // }));
        expressApp.use((0, cors_1.default)());
        if (Config_1.Config.env === Config_1.Env.dev) {
            const liveReloadServer = livereload.createServer();
            liveReloadServer.watch([
                path.join(__dirname, '../', 'public'),
                path.join(__dirname, '../', 'views')
            ]);
            expressApp.use((0, connect_livereload_1.default)());
            liveReloadServer.server.once("connection", () => {
                setTimeout(() => {
                    liveReloadServer.refresh("/");
                }, 100);
            });
        }
        //expressApp.use(fileUpload());
        expressApp.use(express_1.default.urlencoded({ extended: true, limit: '500mb', parameterLimit: 1000000 }));
        expressApp.use(express_1.default.json({ limit: '500mb' }));
        //const MySQLStore   = expressMySqlSession(expressSession);
        // const mysqlstoreOptions:any=Config?.dbConnectionConfigs?.primary;
        // if(mysqlstoreOptions){
        //     mysqlstoreOptions.schema={
        //         tableName: '_sessions_'
        //     };
        //     const sessionStore = new MySQLStore(mysqlstoreOptions);
        //     expressApp.use(session({
        //         secret: Config.sessionSecret,
        //         saveUninitialized:false,
        //         resave:false,
        //         rolling: false,
        //         cookie:{
        //             maxAge:(12*30*24*60*60*1000),
        //         },
        //         store:sessionStore,
        //     }));
        // }
        // const forms=multer();
        // expressApp.use(forms.array(""));
        expressApp.use((0, compression_1.default)({ filter: shouldCompress }));
        (0, routing_controllers_1.useExpressServer)(expressApp, {
            cors: true,
            classTransformer: true,
            routePrefix: '/kappa/api',
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: [path.join(__dirname, '..', 'api/controllers/**/*Controller.js')],
            middlewares: [path.join(__dirname, '..', 'api/middlewares/**/*Middleware.js')],
            interceptors: [],
            /**
             * Authorization features
             */
            //authorizationChecker: authorizationChecker(connection),
            //currentUserChecker: currentUserChecker(connection),
        });
        const hbs = expressHbs.create({
            helpers: Helpers_1.Helpers.fns,
            defaultLayout: 'layout',
            partialsDir: [path.join(__dirname, '..', 'views/partials')],
            layoutsDir: path.join(__dirname, '..', 'views/layouts'),
            extname: '.hbs',
        });
        expressApp.set('views', path.join(__dirname, '..', 'views'));
        expressApp.engine('.hbs', hbs.engine);
        expressApp.set('view engine', '.hbs');
        expressApp.use('/kappa', _router_1.default);
        expressApp
            // Serve static files like images from the public folder
            .use('/kappa', express_1.default.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }));
        // A favicon is a visual cue that client software, like browsers, use to identify a site
        // .use('/kappa',favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
        const server = expressApp.listen(Config_1.Config.port || 3000);
        // const io = new Server(server);
        // io.on('connection', (socket) => {
        //     //console.info('a user connected');
        //     socket.on('client to server event',()=>{
        //         setTimeout(()=>{
        //             socket.emit('server to client event','1');
        //         },10)
        //     })
        //     socket.on('disconnect', () => {
        //         //console.info('user disconnected');
        //     });
        // });
        //SocketApp.test();
        settings.setData('express_server', server);
        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
exports.expressLoader = expressLoader;
function shouldCompress(req, res) {
    if (req.headers['x-compression']) {
        return compression_1.default.filter(req, res);
    }
    return false;
}
//# sourceMappingURL=expressLoader.js.map