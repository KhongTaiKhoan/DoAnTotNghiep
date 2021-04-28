import { ToanTuFactory } from "../ThanhPhanOpts/ToanTuFactory";
import { ToanTu } from "../ThanhPhanOpts/ToanTuLogic";
import { BieuThucMenhDe } from "./BieuThucMenhDe";
import { Helper } from '../ThanhPhanFuncs/Helper';

export class BieuThucBuilder{
    private bieuThuc:BieuThucMenhDe;
    constructor(){
        this.bieuThuc = new BieuThucMenhDe();
    }
    
    public addBieuThucCon (bieuThuc:BieuThucMenhDe):BieuThucBuilder{
        this.bieuThuc.bieuThucCons.push(bieuThuc);
        bieuThuc.cha = this.bieuThuc;
        return this;  
    }


    //// HAM KHONG TIEN HANH SET CHA
    public addBieuThucCon2 (bieuThuc:BieuThucMenhDe):BieuThucBuilder{
        this.bieuThuc.bieuThucCons.push(bieuThuc);
        return this;  
    }


    public addID (id:string):BieuThucBuilder{
        this.bieuThuc.id = id;
        return this;  
    }

    public addToanTu (toanTu : number):BieuThucBuilder{
        this.bieuThuc.toanTu = new ToanTuFactory().create(toanTu);
        return this;  
    }

    public addCha (bt:BieuThucMenhDe|null):BieuThucBuilder{
        this.bieuThuc.cha = bt;
        return this;  
    }

    public addBieuThucSoCap(id: string ):BieuThucBuilder{
        this.bieuThuc.bieuThucCons.push(Helper.BIEU_THUC_SO_CAP(id));
        return this;
    }

    public build():BieuThucMenhDe{
        return this.bieuThuc;
    }


}