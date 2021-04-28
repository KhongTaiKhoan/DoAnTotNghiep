import {BieuThucMenhDe} from "../ThanhPhanC/BieuThucMenhDe";
export interface ILuat{
    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null;
    ketQua(P:BieuThucMenhDe, con?:BieuThucMenhDe):BieuThucMenhDe;
}