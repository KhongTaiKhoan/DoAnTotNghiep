import { BieuThucMenhDe } from "../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe";
import { TapLuat } from '../BieuDienTriThuc/ChuongLogic/ThanhPhanRules/TapLuat';

export abstract class BaiTap{
    protected tapLuat:TapLuat;  
    constructor(){
        this.tapLuat = new TapLuat();
    }
    abstract giai(P:BieuThucMenhDe):void;
}