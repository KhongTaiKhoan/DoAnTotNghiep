"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaiTap = void 0;
const TapLuat_1 = require("../BieuDienTriThuc/ChuongLogic/ThanhPhanRules/TapLuat");
class BaiTap {
    constructor() {
        this.tapLuat = new TapLuat_1.TapLuat();
    }
}
exports.BaiTap = BaiTap;
