"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportDetail = void 0;
class TransportDetail {
    constructor() {
        /**
         *
         * @param transportDetail : transportDetail of sale
         * @returns : remove unused key before storing to database
         */
        this.compress = (transportDetail) => {
            if (transportDetail) {
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.additionalAmount)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.additionalAmount;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.eWayBillNo)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.eWayBillNo;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.eWayBillDate)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.eWayBillDate;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.purOrderNo)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.purOrderNo;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.challanNo)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.challanNo;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.transporterName)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.transporterName;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.vehicleNumber)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.vehicleNumber;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.deliveryDate)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.deliveryDate;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.transDistance)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.transDistance;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.deliveryLocation)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.deliveryLocation;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.tnc)) {
                    transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.tnc;
                }
                ;
                transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.pic;
                transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.billNo;
                transportDetail === null || transportDetail === void 0 ? true : delete transportDetail.billDateStamp;
            }
            return transportDetail;
        };
        // --------------------------------------------------------
        /**
         *
         @param transportDetail : transportDetail of sale
         * @returns : provide original key name from abbr key before use to web and android
         */
        this.expand = (transportDetail) => {
            if (transportDetail) {
                this.addDefaults(transportDetail);
            }
            return transportDetail;
        };
        // --------------------------------------------------------
        /**
         *
         @param transportDetail : transportDetail of sale
         * @returns : set null value if key not store to database and key used at web and android
         */
        this.addDefaults = (transportDetail) => {
            if (transportDetail) {
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.additionalAmount)) {
                    transportDetail.additionalAmount = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.eWayBillNo)) {
                    transportDetail.eWayBillNo = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.eWayBillDate)) {
                    transportDetail.eWayBillDate = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.purOrderNo)) {
                    transportDetail.purOrderNo = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.challanNo)) {
                    transportDetail.challanNo = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.transporterName)) {
                    transportDetail.transporterName = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.vehicleNumber)) {
                    transportDetail.vehicleNumber = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.deliveryDate)) {
                    transportDetail.deliveryDate = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.transDistance)) {
                    transportDetail.transDistance = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.deliveryLocation)) {
                    transportDetail.deliveryLocation = null;
                }
                ;
                if (!(transportDetail === null || transportDetail === void 0 ? void 0 : transportDetail.tnc)) {
                    transportDetail.tnc = null;
                }
                ;
            }
            return transportDetail;
        };
        // --------------------------------------------------------
    }
}
exports.TransportDetail = TransportDetail;
//# sourceMappingURL=TransportDetail.js.map