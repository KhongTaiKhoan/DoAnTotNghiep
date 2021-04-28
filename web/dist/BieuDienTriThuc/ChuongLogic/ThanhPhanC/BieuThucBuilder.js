"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BieuThucBuilder = void 0;
const ToanTuFactory_1 = require("../ThanhPhanOpts/ToanTuFactory");
const BieuThucMenhDe_1 = require("./BieuThucMenhDe");
const Helper_1 = require("../ThanhPhanFuncs/Helper");
class BieuThucBuilder {
    constructor() {
        this.bieuThuc = new BieuThucMenhDe_1.BieuThucMenhDe();
    }
    addBieuThucCon(bieuThuc) {
        this.bieuThuc.bieuThucCons.push(bieuThuc);
        bieuThuc.cha = this.bieuThuc;
        return this;
    }
    //// HAM KHONG TIEN HANH SET CHA
    addBieuThucCon2(bieuThuc) {
        this.bieuThuc.bieuThucCons.push(bieuThuc);
        return this;
    }
    addID(id) {
        this.bieuThuc.id = id;
        return this;
    }
    addToanTu(toanTu) {
        this.bieuThuc.toanTu = new ToanTuFactory_1.ToanTuFactory().create(toanTu);
        return this;
    }
    addCha(bt) {
        this.bieuThuc.cha = bt;
        return this;
    }
    addBieuThucSoCap(id) {
        this.bieuThuc.bieuThucCons.push(Helper_1.Helper.BIEU_THUC_SO_CAP(id));
        return this;
    }
    build() {
        return this.bieuThuc;
    }
}
exports.BieuThucBuilder = BieuThucBuilder;
