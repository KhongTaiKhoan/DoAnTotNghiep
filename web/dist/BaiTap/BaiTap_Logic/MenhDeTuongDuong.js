"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenhDeTuongDuong = void 0;
const BaiTap_1 = require("../BaiTap");
const BieuThucBuilder_1 = require("../../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucBuilder");
const ToanTuLogic_1 = require("../../BieuDienTriThuc/ChuongLogic/ThanhPhanOpts/ToanTuLogic");
const Helper_1 = require("../../BieuDienTriThuc/ChuongLogic/ThanhPhanFuncs/Helper");
class MenhDeTuongDuong extends BaiTap_1.BaiTap {
    constructor(root) {
        super();
        this.root = root;
    }
    tao_VT_VP() {
        this.root.includes("");
    }
    //////
    giai(P) {
        let l = new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP('a'))
            .addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP('b'))
            .addToanTu(ToanTuLogic_1.ToanTu.TUYEN)
            .build();
        let r = new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP('a'))
            .addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP('b'))
            .addToanTu(ToanTuLogic_1.ToanTu.TUYEN)
            .build())
            .addBieuThucCon(new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP('c'))
            .addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP('d'))
            .addToanTu(ToanTuLogic_1.ToanTu.TUYEN)
            .build())
            .addToanTu(ToanTuLogic_1.ToanTu.HOI)
            .build();
        let bt = new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(l)
            .addBieuThucCon(r)
            .addToanTu(ToanTuLogic_1.ToanTu.TUYEN)
            .build();
        this.tapLuat.duyetTapLuat(bt);
    }
}
exports.MenhDeTuongDuong = MenhDeTuongDuong;
