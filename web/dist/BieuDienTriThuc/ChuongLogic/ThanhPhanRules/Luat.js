"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Luat = void 0;
class Luat {
    constructor(id, _tenLuat, _Iluat) {
        this.id = 0;
        this._tenLuat = _tenLuat;
        this._Iluat = _Iluat;
        this.id = id;
    }
    run(P) {
        let con = null;
        con = this.Iluat.boKiemTra(P);
        if (con !== null) {
            console.log(this.tenLuat);
            console.log(con.id);
            if (con !== null)
                return this.Iluat.ketQua(P, con);
            else
                return this.Iluat.ketQua(P, con);
        }
        return null;
    }
    /// GETTER AND SETTER
    get tenLuat() {
        return this._tenLuat;
    }
    set tenLuat(value) {
        this._tenLuat = value;
    }
    get Iluat() {
        return this._Iluat;
    }
    set Iluat(value) {
        this._Iluat = value;
    }
}
exports.Luat = Luat;
