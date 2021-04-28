import { BieuThucMenhDe } from '../ThanhPhanC/BieuThucMenhDe';
import { ILuat } from './ILuat';
export class Luat  {
    private _tenLuat: string;
    private _Iluat: ILuat ;
    private id :number = 0;


    constructor(id:number,_tenLuat: string, _Iluat:ILuat) {
        this._tenLuat = _tenLuat;
        this._Iluat = _Iluat;
        this.id = id;
    }


    run(P:BieuThucMenhDe):BieuThucMenhDe|null{
        let con:BieuThucMenhDe|null = null;
        con = this.Iluat.boKiemTra(P);
        if(con!==null){
            console.log(this.tenLuat);
            console.log(con.id);
           if(con !== null)
            return this.Iluat.ketQua(P,con);
           else 
           return this.Iluat.ketQua(P,con);    
        }
        return null;
      
    }

    /// GETTER AND SETTER
    public get tenLuat(): string {
        return this._tenLuat;
    }
    public set tenLuat(value: string) {
        this._tenLuat = value;
    }


    public get Iluat(): ILuat  {
        return this._Iluat;
    }
    public set Iluat(value: ILuat ) {
        this._Iluat = value;
    }


}