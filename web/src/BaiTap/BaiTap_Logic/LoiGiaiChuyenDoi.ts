import { BieuThucMenhDe } from "../../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe";

export class LoiGiaiChuyenDoi{
    public loiGiai:{
        idLuat:number,
        bieuThucApDung:BieuThucMenhDe,
        bieuThucKetQua:BieuThucMenhDe,
        bieuThucGoc:BieuThucMenhDe
    }[]=[];
    public ketQua:BieuThucMenhDe|null = null;

}