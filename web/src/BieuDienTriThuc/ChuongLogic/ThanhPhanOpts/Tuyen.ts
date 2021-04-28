import { BieuThucMenhDe } from "../ThanhPhanC/BieuThucMenhDe";
import { ToanTu } from "./ToanTuLogic";

export class Tuyen extends ToanTu{
    constructor(){
        super('&or;');
        this.tenToanTu = ToanTu.TUYEN;
    }

    tinhToan(bieuThuc: BieuThucMenhDe): boolean {
        throw new Error("Method not implemented.");
    }
    
}