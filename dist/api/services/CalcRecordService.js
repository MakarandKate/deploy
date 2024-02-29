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
exports.CalcRecordService = void 0;
const BaseService_1 = require("./BaseService");
const typedi_1 = require("typedi");
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const CalcRecordRepository_1 = require("../repositories/CalcRecordRepository");
let CalcRecordService = class CalcRecordService extends BaseService_1.BaseService {
    constructor(eventDispatcher) {
        super(CalcRecordRepository_1.CalcRecordRepository);
        this.eventDispatcher = eventDispatcher;
    }
    getDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CalcRecordRepository_1.CalcRecordRepository.findDeleted();
        });
    }
    expressionSolver(expressionStr) {
        var _a;
        let outputStr = "Error";
        let outputNumber = 0;
        let billItems = [];
        try {
            let arrOfExps = [];
            if (expressionStr.indexOf("%") != -1) {
                while (expressionStr.indexOf("%") != -1) {
                    let leftEsRaw = expressionStr.substring(0, expressionStr.indexOf("%"));
                    let lh = 0;
                    let l1 = leftEsRaw.lastIndexOf("-");
                    lh = l1;
                    let l2 = leftEsRaw.lastIndexOf("+");
                    if (l2 > -1 && lh < l2) {
                        lh = l2;
                    }
                    let l3 = leftEsRaw.lastIndexOf("*");
                    if (l3 > -1 && lh < l3) {
                        lh = l3;
                    }
                    let l4 = leftEsRaw.lastIndexOf("/");
                    if (l4 > -1 && lh < l4) {
                        lh = l4;
                    }
                    let leftEs = leftEsRaw.substring(0, lh);
                    let percentEs = leftEsRaw.substring(lh, leftEsRaw.length);
                    expressionStr = expressionStr.substring(expressionStr.indexOf("%") + 1, expressionStr.length);
                    arrOfExps.push(leftEs);
                    arrOfExps.push(percentEs + '%');
                }
            }
            arrOfExps.push(expressionStr);
            let finalArrOfExps = [""];
            for (let f = 0; f < arrOfExps.length; f++) {
                let exps = arrOfExps[f];
                if (exps == "") {
                    continue;
                }
                if (exps.indexOf("%") != -1) {
                    let dg = Number((Number(exps.replace(/\%/g, '').replace(/\*/, '').replace(/\//, '')) / 100).toFixed(3));
                    if (exps.indexOf("*") != -1) {
                        finalArrOfExps[finalArrOfExps.length - 1] += "*" + dg;
                    }
                    else if (exps.indexOf("/") != -1) {
                        finalArrOfExps[finalArrOfExps.length - 1] += "/" + dg;
                    }
                    else {
                        finalArrOfExps.push(exps);
                    }
                }
                else {
                    if (exps.indexOf("+") == 0) {
                        exps = exps.substring(1, exps.length);
                    }
                    finalArrOfExps.push(exps);
                }
            }
            if (finalArrOfExps[0] == "") {
                finalArrOfExps.shift();
            }
            for (let g = 0; g < finalArrOfExps.length; g++) {
                if (finalArrOfExps[g].indexOf("%") == -1) {
                    let arr = finalArrOfExps[g].split("+");
                    for (let i = 0; i < arr.length; i++) {
                        let txnExp = arr[i];
                        let subtractionLhs = "";
                        let subtractionRhs = "";
                        if (txnExp.indexOf("-") != -1) {
                            subtractionLhs = txnExp.substring(0, txnExp.indexOf("-"));
                            subtractionRhs = txnExp.substring(txnExp.indexOf("-"), txnExp.length);
                        }
                        else {
                            subtractionLhs = txnExp;
                        }
                        let billItem = {
                            name: '',
                            rate: 0,
                            quantity: 1,
                            tax: 0,
                            discount: 0
                        };
                        let rqv = this.solveMathExp(subtractionLhs);
                        let discount = this.solveMathExp(subtractionRhs);
                        outputNumber = outputNumber + rqv + discount;
                        let occurrenceOfMulti = (_a = subtractionLhs.match(/\*/g)) === null || _a === void 0 ? void 0 : _a.length;
                        if (occurrenceOfMulti == 1) {
                            let lbis = subtractionLhs.substring(0, subtractionLhs.indexOf('*'));
                            let lbisv = this.solveMathExp(lbis);
                            let rbis = subtractionLhs.substring(subtractionLhs.indexOf('*') + 1, subtractionLhs.length);
                            let rbisv = this.solveMathExp(rbis);
                            billItem.name = lbisv + '*' + rbisv;
                            billItem.rate = lbisv;
                            billItem.quantity = rbisv;
                            billItem.tax = 0;
                            billItem.discount = discount;
                        }
                        else if (occurrenceOfMulti == 2) {
                            let lbis = subtractionLhs.substring(0, subtractionLhs.indexOf('*'));
                            let lbisv = this.solveMathExp(lbis);
                            let mbis = subtractionLhs.substring(subtractionLhs.indexOf('*') + 1, subtractionLhs.lastIndexOf('*'));
                            let mbisv = this.solveMathExp(mbis);
                            let rbis = subtractionLhs.substring(subtractionLhs.lastIndexOf('*') + 1, subtractionLhs.length);
                            let rbisv = this.solveMathExp(rbis);
                            if (rbisv > 1 && rbisv < 2) {
                                billItem.name = lbisv + '*' + mbisv + '*' + rbisv;
                                billItem.rate = lbisv;
                                billItem.quantity = Number(mbis);
                                billItem.tax = (rbisv - 1) * 100;
                                billItem.discount = discount;
                            }
                            else {
                                billItem.name = subtractionLhs;
                                billItem.rate = rqv;
                                billItem.quantity = 1;
                                billItem.tax = 0;
                                billItem.discount = discount;
                            }
                        }
                        else {
                            billItem.name = subtractionLhs;
                            billItem.rate = rqv;
                            billItem.quantity = 1;
                            billItem.tax = 0;
                            billItem.discount = discount;
                        }
                        billItems.push(billItem);
                    }
                }
                else {
                    let dg = Number((Number(finalArrOfExps[g].replace(/\%/g, '').replace(/\-/, '').replace(/\+/, '')) / 100).toFixed(3));
                    let billItem = {
                        name: '',
                        rate: 0,
                        quantity: 1,
                        tax: 0,
                        discount: 0
                    };
                    if (finalArrOfExps[g].indexOf("-") != -1) {
                        billItem.name = `Disc. ${outputNumber}@${dg * 100}%`;
                        billItem.rate = -Number((Number(outputNumber * dg)).toFixed(3));
                        billItem.quantity = 1;
                        billItem.tax = 0;
                        billItem.discount = 0;
                        outputNumber += -Number((Number(outputNumber * dg)).toFixed(3));
                    }
                    else if (finalArrOfExps[g].indexOf("+") != -1) {
                        outputNumber += Number((Number(outputNumber * dg)).toFixed(3));
                    }
                }
            }
        }
        catch (err) {
            console.error(err);
            outputStr = 'Error';
        }
        if (isNaN(outputNumber)) {
            outputStr = 'Error';
        }
        else {
            outputStr = outputNumber + '';
        }
        return { outputStr, billItems };
    }
    solveMathExp(str) {
        if (str.length) {
            while (str.indexOf("/") != -1) {
                let leftstr = "";
                let leftdigit = null;
                let rightstr = "";
                let rightdigit = null;
                let leftraw = str.substring(0, str.indexOf("/"));
                let rightraw = str.substring(str.indexOf("/") + 1, str.length);
                let r1 = rightraw.indexOf("-");
                let rl = rightraw.length;
                if (r1 > -1) {
                    rl = r1;
                }
                let r2 = rightraw.indexOf("+");
                if (r2 > -1 && r2 < rl) {
                    rl = r2;
                }
                let r3 = rightraw.indexOf("/");
                if (r3 > -1 && r3 < rl) {
                    rl = r3;
                }
                let r4 = rightraw.indexOf("*");
                if (r4 > -1 && r4 < rl) {
                    rl = r4;
                }
                rightdigit = Number(rightraw.substring(0, rl));
                rightstr = rightraw.substring(rl, rightraw.length);
                let l1 = leftraw.lastIndexOf("-");
                let lh = l1;
                let l2 = leftraw.lastIndexOf("+");
                if (lh < l2) {
                    lh = l2;
                }
                let l3 = leftraw.lastIndexOf("/");
                if (lh < l3) {
                    lh = l3;
                }
                let l4 = leftraw.lastIndexOf("*");
                if (lh < l4) {
                    lh = l4;
                }
                leftdigit = Number(leftraw.substring(lh + 1, leftraw.length));
                leftstr = leftraw.substring(0, lh + 1);
                let compiled = Number((leftdigit / rightdigit).toFixed(3));
                str = leftstr + compiled + rightstr;
            }
            while (str.indexOf("*") != -1) {
                let leftstr = "";
                let leftdigit = null;
                let rightstr = "";
                let rightdigit = null;
                let leftraw = str.substring(0, str.indexOf("*"));
                let rightraw = str.substring(str.indexOf("*") + 1, str.length);
                let r1 = rightraw.indexOf("-");
                let rl = rightraw.length;
                if (r1 > -1) {
                    rl = r1;
                }
                let r2 = rightraw.indexOf("+");
                if (r2 > -1 && r2 < rl) {
                    rl = r2;
                }
                let r3 = rightraw.indexOf("/");
                if (r3 > -1 && r3 < rl) {
                    rl = r3;
                }
                let r4 = rightraw.indexOf("*");
                if (r4 > -1 && r4 < rl) {
                    rl = r4;
                }
                rightdigit = Number(rightraw.substring(0, rl));
                rightstr = rightraw.substring(rl, rightraw.length);
                let l1 = leftraw.lastIndexOf("-");
                let lh = l1;
                let l2 = leftraw.lastIndexOf("+");
                if (lh < l2) {
                    lh = l2;
                }
                let l3 = leftraw.lastIndexOf("/");
                if (lh < l3) {
                    lh = l3;
                }
                let l4 = leftraw.lastIndexOf("*");
                if (lh < l4) {
                    lh = l4;
                }
                leftdigit = Number(leftraw.substring(lh + 1, leftraw.length));
                leftstr = leftraw.substring(0, lh + 1);
                let compiled = Number((leftdigit * rightdigit).toFixed(3));
                str = leftstr + compiled + rightstr;
            }
            while (str.lastIndexOf("-") > 0) {
                let leftstr = "";
                let leftdigit = null;
                let rightstr = "";
                let rightdigit = null;
                let leftraw = str.substring(0, str.lastIndexOf("-"));
                let rightraw = str.substring(str.lastIndexOf("-") + 1, str.length);
                rightdigit = Number(rightraw);
                rightstr = "";
                leftdigit = Number(leftraw.substring(leftraw.lastIndexOf("-"), leftraw.length));
                leftstr = leftraw.substring(0, leftraw.lastIndexOf("-"));
                let compiled = Number((leftdigit - rightdigit).toFixed(3));
                str = leftstr + compiled + rightstr;
            }
            return Number(str);
        }
        else {
            return 0;
        }
    }
};
CalcRecordService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, EventDispatcher_1.EventDispatcher)()),
    __metadata("design:paramtypes", [EventDispatcher_1.EventDispatcherInterface])
], CalcRecordService);
exports.CalcRecordService = CalcRecordService;
//# sourceMappingURL=CalcRecordService.js.map