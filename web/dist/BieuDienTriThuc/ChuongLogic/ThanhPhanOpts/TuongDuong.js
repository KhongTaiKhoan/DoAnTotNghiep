"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuongDuong = void 0;
const ToanTuLogic_1 = require("./ToanTuLogic");
class TuongDuong extends ToanTuLogic_1.ToanTu {
    constructor() {
        super('&harr;');
        this.tenToanTu = ToanTuLogic_1.ToanTu.TUONG_DUONG;
    }
    tinhToan(bieuThuc) {
        throw new Error("Method not implemented.");
    }
}
exports.TuongDuong = TuongDuong;
