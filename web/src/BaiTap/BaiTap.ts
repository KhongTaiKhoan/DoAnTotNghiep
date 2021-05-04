import { BieuThucMenhDe } from "../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe";
import { TapLuat } from '../BieuDienTriThuc/ChuongLogic/ThanhPhanRules/TapLuat';
import { LoiGiaiChuyenDoi } from "./BaiTap_Logic/LoiGiaiChuyenDoi";

export abstract class BaiTap{
    protected tapLuat:TapLuat;  
    constructor(){
        this.tapLuat = new TapLuat();
    }
    abstract giai(P?:BieuThucMenhDe):LoiGiaiChuyenDoi|void;
}