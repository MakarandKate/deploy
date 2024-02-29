"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreProfile = exports.getDeletedProfiles = void 0;
const ProfileRepository_1 = require("../../api/repositories/ProfileRepository");
const Page_1 = require("../../lib/Page");
const typedi_1 = __importDefault(require("typedi"));
const ProfileService_1 = require("../../api/services/ProfileService");
const profileService = typedi_1.default.get(ProfileService_1.ProfileService);
const getDeletedProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let userId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId;
    if (userId) {
        let deletedProfiles = yield ProfileRepository_1.ProfileRepository.find({
            where: {
                userId,
                deletedStamp: {
                    $gt: 0
                }
            }
        });
        deletedProfiles.sort((a, b) => {
            return a.profileName > b.profileName ? 1 : -1;
        });
        (0, Page_1.setPage)(req, res, {
            title: 'Restore Profile',
            description: '',
            view: 'profile/restore',
            data: {
                userId,
                deletedProfiles
            }
        });
    }
    else {
        return res.status(400).send("Invalid userId");
    }
});
exports.getDeletedProfiles = getDeletedProfiles;
const restoreProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let userId = ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.userId) || '';
    let selectedProfiles = ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.selectedProfiles) || [];
    if (userId && (selectedProfiles === null || selectedProfiles === void 0 ? void 0 : selectedProfiles.length)) {
        for (let i = 0; i < selectedProfiles.length; i++) {
            yield profileService.restoreProfile(userId, selectedProfiles[i]);
        }
    }
    res.send(Object.assign({}, Page_1.StatusSuccess));
});
exports.restoreProfile = restoreProfile;
//# sourceMappingURL=restore.js.map