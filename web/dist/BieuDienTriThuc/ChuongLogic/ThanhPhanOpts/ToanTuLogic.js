"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToanTu = void 0;
class ToanTu {
    constructor(kyHieu) {
        this._tenToanTu = -1;
        this.kyHieu = kyHieu;
    }
    get tenToanTu() {
        return this._tenToanTu;
    }
    set tenToanTu(value) {
        this._tenToanTu = value;
    }
    toString() {
        return this._tenToanTu + "";
    }
}
exports.ToanTu = ToanTu;
ToanTu.NONE = -1;
ToanTu.PHU_DINH = 0;
ToanTu.HOI = 1;
ToanTu.TUYEN = 2;
ToanTu.KEO_THEO = 3;
ToanTu.TUONG_DUONG = 4;
