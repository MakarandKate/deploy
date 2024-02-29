"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusSuccess = exports.StatusFailed = exports.setPage = void 0;
const Config_1 = require("../Config");
function setPage(req, res, pageOptions) {
    res.render(pageOptions.view, {
        isDev: Config_1.Config.env == Config_1.Env.dev,
        title: pageOptions.title,
        description: pageOptions.description,
        HOST: Config_1.Config.domain,
        data: pageOptions.data,
        user: {
        //id:req.session.adminId,
        //name:req.session.adminName,
        }
    });
}
exports.setPage = setPage;
const StatusFailed = {
    status: "failed"
};
exports.StatusFailed = StatusFailed;
const StatusSuccess = {
    status: "success"
};
exports.StatusSuccess = StatusSuccess;
//# sourceMappingURL=Page.js.map