"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_1 = require("./delete");
const itemCategoryDelete_1 = require("./itemCategoryDelete");
const imagesList_1 = require("./imagesList");
const uploadImage_1 = require("./uploadImage");
const router = (0, express_1.Router)();
router.get('/list', delete_1.listViewRouter);
router.get('/party/list', delete_1.partyListViewRouter);
router.get('/images', imagesList_1.imagesListViewRouter);
router.post('/uploadImage', uploadImage_1.uploadImageRouter);
router.post('/delete', delete_1.deleteRouter);
router.post('/party/delete', delete_1.partyDeleteRouter);
router.get('/listItemCategories', itemCategoryDelete_1.itemCategoryListViewRouter);
router.post('/deleteItemCategories', itemCategoryDelete_1.itemCategoryDeleteRouter);
exports.default = router;
//# sourceMappingURL=_router.js.map