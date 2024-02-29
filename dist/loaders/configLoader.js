"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLoader = void 0;
//import inquirer from 'inquirer';
const Config_1 = require("../Config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configLoader = (settings) => {
    if (settings) {
        let configObj = {};
        let configPath = path_1.default.join(__dirname, '../../', './') + 'config.json';
        if (fs_1.default.existsSync(configPath)) {
            try {
                configObj = JSON.parse(fs_1.default.readFileSync(configPath, 'utf8'));
            }
            catch (err) {
            }
        }
        else {
            fs_1.default.writeFileSync(configPath, '{}');
        }
        let isEnvOk = true;
        let errArr = [];
        if (configObj.env) {
            Config_1.Config.env = configObj.env;
        }
        else {
            isEnvOk = false;
            configObj.env = Config_1.Env.prod;
            errArr.push("env");
        }
        if (configObj.port) {
            Config_1.Config.port = configObj.port;
        }
        else {
            isEnvOk = false;
            configObj.port = 3030;
            errArr.push("port");
        }
        if (configObj.sessionSecret) {
            Config_1.Config.sessionSecret = configObj.sessionSecret;
        }
        else {
            isEnvOk = false;
            configObj.sessionSecret = ''; // Util.generatePassword(20);
            errArr.push("sessionSecret");
        }
        if (configObj.redisUrl) {
            Config_1.Config.redisUrl = configObj.redisUrl;
        }
        else {
            isEnvOk = false;
            configObj.redisUrl = '';
            errArr.push("redisUrl");
        }
        if (configObj.domain) {
            Config_1.Config.domain = configObj.domain;
        }
        else {
            isEnvOk = false;
            errArr.push("domain");
        }
        if (configObj.excelUploadPath) {
            Config_1.Config.excelUploadPath = configObj.excelUploadPath;
        }
        else {
            isEnvOk = false;
            errArr.push("excelUploadPath");
        }
        if (configObj.imageUpload) {
            Config_1.Config.imageUpload = configObj.imageUpload;
        }
        else {
            isEnvOk = false;
            errArr.push("imageUpload");
        }
        if (configObj.serviceAccount) {
            Config_1.Config.serviceAccount = configObj.serviceAccount;
        }
        else {
            isEnvOk = false;
            errArr.push("serviceAccount");
        }
        if (configObj.superAdminPass) {
            Config_1.Config.superAdminPass = configObj.superAdminPass;
        }
        else {
            isEnvOk = false;
            configObj.superAdminPass = 'superAdminPass';
            errArr.push("superAdminPass");
        }
        if (configObj.adminPasswordPolicy) {
            Config_1.Config.adminPasswordPolicy = configObj.adminPasswordPolicy;
        }
        else {
            isEnvOk = false;
            errArr.push("adminPasswordPolicy");
            configObj.adminPasswordPolicy = {
                "oneCapital": false,
                "oneSmall": false,
                "oneDigit": false,
                "oneSpecialChar": false,
                "minLength": 6
            };
        }
        Config_1.Config.leadSquare = {
            accessKey: "",
            secretKey: ""
        };
        if (!configObj.leadSquare) {
            configObj.leadSquare = {};
        }
        if (configObj.leadSquare && configObj.leadSquare.accessKey) {
            Config_1.Config.leadSquare.accessKey = configObj.leadSquare.accessKey;
        }
        else {
            isEnvOk = false;
            errArr.push("leadSquare.accessKey");
        }
        if (configObj.leadSquare && configObj.leadSquare.secretKey) {
            Config_1.Config.leadSquare.secretKey = configObj.leadSquare.secretKey;
        }
        else {
            isEnvOk = false;
            errArr.push("leadSquare.secretKey");
        }
        if (configObj.interactApiKey) {
            Config_1.Config.interactApiKey = configObj.interactApiKey;
        }
        else {
            isEnvOk = false;
            Config_1.Config.interactApiKey = '';
            errArr.push("interactApiKey");
        }
        if (configObj.supportInteractApiKey) {
            Config_1.Config.supportInteractApiKey = configObj.supportInteractApiKey;
        }
        else {
            isEnvOk = false;
            Config_1.Config.supportInteractApiKey = '';
            errArr.push("supportInteractApiKey");
        }
        if (configObj.ablyApiKey) {
            Config_1.Config.ablyApiKey = configObj.ablyApiKey;
        }
        else {
            isEnvOk = false;
            Config_1.Config.ablyApiKey = '';
            errArr.push("ablyApiKey");
        }
        if (configObj.dbConnectionConfigs) {
            Config_1.Config.dbConnectionConfigs = configObj.dbConnectionConfigs;
        }
        else {
            isEnvOk = false;
            errArr.push("dbConnectionConfigs");
            configObj.dbConnectionConfigs = {
                "primary": {
                    "host": "localhost",
                    "user": "root",
                    "password": "",
                    "database": "primary_db",
                    "port": "3306",
                    "replicaSet": ""
                }
            };
        }
        if (errArr.length > 0) {
            console.error('Error in config.json missing:', errArr.join(","));
            let qrepo = {
                "domain": {
                    message: 'Enter domain name. Ex: https://example.com)'
                }
            };
            let questions = [];
            if (errArr.indexOf("dbConnectionConfigs") != -1) {
                questions.push({
                    type: 'input',
                    name: '_dbHost',
                    message: 'Enter database host (Ex: 127.0.0.1)'
                });
                questions.push({
                    type: 'input',
                    name: '_dbPort',
                    message: 'Enter database port (Ex: 3306)'
                });
                questions.push({
                    type: 'input',
                    name: '_dbUser',
                    message: 'Enter database user (Ex: db_user)'
                });
                questions.push({
                    type: 'password',
                    name: '_dbPassword',
                    message: 'Enter database password (Ex: someStrongPassword)'
                });
                questions.push({
                    type: 'input',
                    name: '_dbName',
                    message: 'Enter database name (Ex: sample_db)'
                });
            }
            errArr.forEach((val) => {
                if (qrepo[val]) {
                    if (!qrepo[val].type)
                        qrepo[val].type = 'input';
                    qrepo[val].name = val;
                    questions.push(qrepo[val]);
                }
            });
            // inquirer.prompt(questions).then(answers => {
            //     let isDbA=false;
            //     for(let k in answers){
            //         if(k.indexOf("_")!=0){
            //             configObj[k]=answers[k];
            //         }else{
            //             isDbA=true;
            //         }
            //     }
            //     if(isDbA){
            //         configObj.dbConnectionConfigs={
            //             "primary":{
            //                 "host":answers["_dbHost"],
            //                 "user":answers["_dbUser"],
            //                 "password":answers["_dbPassword"],
            //                 "database":answers["_dbName"],
            //                 "port":answers["_dbPort"]
            //             }
            //         }
            //     }
            //     fs.writeFileSync(configPath, JSON.stringify(configObj,null,4));
            //     console.info("Restart the application");
            // })
        }
        settings.setData('config', configObj);
    }
};
exports.configLoader = configLoader;
//# sourceMappingURL=configLoader.js.map