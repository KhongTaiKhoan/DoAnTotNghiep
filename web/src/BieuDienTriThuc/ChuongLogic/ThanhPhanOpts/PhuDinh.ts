import { BieuThucMenhDe } from "../ThanhPhanC/BieuThucMenhDe";
import {ToanTu} from "./ToanTuLogic"; 
export class PhuDinh extends ToanTu{

    constructor(){
        super('&not;');
        this.tenToanTu = ToanTu.PHU_DINH;
    }
    tinhToan(bieuThuc:BieuThucMenhDe): boolean {
       return !bieuThuc.chanTri;
    }
}