import { BieuThucMenhDe } from "../ThanhPhanC/BieuThucMenhDe";
import { ToanTu } from "./ToanTuLogic";

export class TuongDuong extends ToanTu{

    constructor(){
        super('&harr;');
        this.tenToanTu = ToanTu.TUONG_DUONG;
    }
    tinhToan(bieuThuc: BieuThucMenhDe): boolean {
        throw new Error("Method not implemented.");
    }
    
}