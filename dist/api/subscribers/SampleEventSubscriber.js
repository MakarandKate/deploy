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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleEventSubscriber = void 0;
const event_dispatch_1 = require("event-dispatch");
const events_1 = require("./events");
let SampleEventSubscriber = class SampleEventSubscriber {
    onPetCreate() {
        console.info("Event onCreated :: ");
    }
    onCreate( /*sample: Sample*/) {
        console.info("Event onDeleted :: ");
    }
};
__decorate([
    (0, event_dispatch_1.On)(events_1.events.sample.onCreated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SampleEventSubscriber.prototype, "onPetCreate", null);
__decorate([
    (0, event_dispatch_1.On)(events_1.events.sample.onDeleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SampleEventSubscriber.prototype, "onCreate", null);
SampleEventSubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], SampleEventSubscriber);
exports.SampleEventSubscriber = SampleEventSubscriber;
//# sourceMappingURL=SampleEventSubscriber.js.map