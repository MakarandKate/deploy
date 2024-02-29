"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyController = void 0;
const routing_controllers_1 = require("routing-controllers");
const DummyService_1 = require("../services/DummyService");
const Dummy_1 = require("../models/Dummy");
const DummyRepository_1 = require("../repositories/DummyRepository");
const DataSource_1 = require("../../lib/DataSource");
const Authorize_middleware_1 = require("../middleware/Authorize.middleware");
let DummyController = class DummyController {
    constructor(dummyService) {
        this.dummyService = dummyService;
    }
    add(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let dummy = new Dummy_1.Dummy();
            dummy.amount = 20;
            dummy.invoiceLocalId = ((+new Date()) + '');
            let savedDummy = yield this.dummyService.create(dummy);
            return {
                savedDummy,
                id: savedDummy._id.toString(),
                locals: req.locals
            };
        });
    }
    get(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // let oid:ObjectID=new ObjectID("63c5b78384ed754687e66d0a");
            // DummyRepository.findOneBy({
            //     _id:""
            // })
            let dummy = yield DummyRepository_1.DummyRepository.findOne({
                where: {
                    _id: new DataSource_1.ObjectID(req.params.id)
                }
            });
            return {
                status: "success",
                dummy
            };
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            let dummy = yield this.dummyService.getById(2);
            dummy.amount = 40;
            dummy.invoiceLocalId = "Updated";
            return yield this.dummyService.update(dummy);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            let dummy = yield this.dummyService.getById(3);
            return yield this.dummyService.delete(dummy);
        });
    }
    alldelete() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dummyService.getDeleted();
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/add'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "add", null);
__decorate([
    (0, routing_controllers_1.Get)('/get/:id'),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Get)('/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Get)('/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "delete", null);
__decorate([
    (0, routing_controllers_1.Get)('/alldelete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "alldelete", null);
DummyController = __decorate([
    (0, routing_controllers_1.Controller)('/dummy')
    //@UseBefore(express.json({limit:'500mb'}))
    ,
    (0, routing_controllers_1.UseBefore)(Authorize_middleware_1.Authorize),
    __metadata("design:paramtypes", [DummyService_1.DummyService])
], DummyController);
exports.DummyController = DummyController;
//# sourceMappingURL=DummyController.js.map