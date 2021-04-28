import {BieuThucMenhDe} from "../ThanhPhanC/BieuThucMenhDe";
abstract class ToanTu {
    protected kyHieu :string;
    private _tenToanTu: number = -1;
    
    static NONE:number = -1;
    static PHU_DINH:number = 0;
    static HOI:number = 1;
    static TUYEN:number = 2;
    static KEO_THEO:number = 3;
    static TUONG_DUONG:number = 4;



    constructor(kyHieu:string){
        this.kyHieu = kyHieu;
    }
    abstract tinhToan(bieuThuc:BieuThucMenhDe):boolean;

    public get tenToanTu(): number {
        return this._tenToanTu;
    }
    public set tenToanTu(value: number) {
        this._tenToanTu = value;
    }
    toString(){
        return this._tenToanTu+"";
    }
}

export{ToanTu};