"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const BieuThucMenhDe_1 = require("../ThanhPhanC/BieuThucMenhDe");
const ToanTuFactory_1 = require("../ThanhPhanOpts/ToanTuFactory");
const ToanTuLogic_1 = require("../ThanhPhanOpts/ToanTuLogic");
const BieuThucBuilder_1 = require("../ThanhPhanC/BieuThucBuilder");
class Helper {
    static PHU_DINH_MENH_DE(P) {
        let rs;
        if (this.IS_BIEU_THUC_SO_CAP(P)) {
            return new BieuThucBuilder_1.BieuThucBuilder().addToanTu(ToanTuLogic_1.ToanTu.PHU_DINH)
                .addID(P.id)
                .build();
        }
        else {
            rs = new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(P)
                .addToanTu(ToanTuLogic_1.ToanTu.PHU_DINH)
                .build();
        }
        return rs;
    }
    static BIEU_THUC_SO_CAP(id, toanTu) {
        let rs = new BieuThucMenhDe_1.BieuThucMenhDe();
        rs.id = id;
        if (toanTu !== undefined)
            rs.toanTu = new ToanTuFactory_1.ToanTuFactory().create(toanTu);
        return rs;
    }
    static HANG_SAI() {
        return this.BIEU_THUC_SO_CAP(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI);
    }
    static HANG_DUNG() {
        return this.BIEU_THUC_SO_CAP(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG);
    }
    static BIEUTHUCSOCAP_TU_BIEUTHUC(id, P) {
        let rs = this.BIEU_THUC_SO_CAP(id);
        rs.cha = P.cha;
        return rs;
    }
    static IS_BIEU_THUC_SO_CAP(P) {
        return P.bieuThucCons.length == 0;
    }
    static IS_ROOT(P) {
        return P.cha == null;
    }
    static CHUYEN_CAP(P, cha) {
        P.cha = cha.cha;
        return P;
    }
    static SAO_CHEP(P) {
        if (this.IS_BIEU_THUC_SO_CAP(P))
            return P;
        let rs = new BieuThucMenhDe_1.BieuThucMenhDe();
        rs.bieuThucCons = P.bieuThucCons;
        rs.toanTu = P.toanTu;
        return rs;
    }
}
exports.Helper = Helper;
