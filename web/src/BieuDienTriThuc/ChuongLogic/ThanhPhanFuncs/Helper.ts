import { BieuThucMenhDe } from "../ThanhPhanC/BieuThucMenhDe";
import { ToanTuFactory } from "../ThanhPhanOpts/ToanTuFactory";
import { ToanTu } from "../ThanhPhanOpts/ToanTuLogic";
import { BieuThucBuilder } from '../ThanhPhanC/BieuThucBuilder';

export class Helper{

    static PHU_DINH_MENH_DE(P:BieuThucMenhDe): BieuThucMenhDe{
        let rs:BieuThucMenhDe ;   
        if(this.IS_BIEU_THUC_SO_CAP(P)){
            return new BieuThucBuilder().addToanTu(ToanTu.PHU_DINH)
                                        .addID(P.id)
                                        .build();
            
        } 
        else{
           rs = new BieuThucBuilder().addBieuThucCon(P)
                                     .addToanTu(ToanTu.PHU_DINH)
                                     .build();  
        } 
        return rs;
    }
    static BIEU_THUC_SO_CAP(id:string,toanTu?:number ):BieuThucMenhDe{
        let rs:BieuThucMenhDe = new BieuThucMenhDe();
        rs.id = id;
        if(toanTu!==undefined)
           rs.toanTu = new ToanTuFactory().create(toanTu);
        return rs;
    }
    static HANG_SAI():BieuThucMenhDe{
        return  this.BIEU_THUC_SO_CAP(BieuThucMenhDe.MA_HANG_SAI);  
    }
    static HANG_DUNG():BieuThucMenhDe{
        return  this.BIEU_THUC_SO_CAP(BieuThucMenhDe.MA_HANG_DUNG);  
    }
    static BIEUTHUCSOCAP_TU_BIEUTHUC(id:string, P:BieuThucMenhDe){ 
      let rs:BieuThucMenhDe = this.BIEU_THUC_SO_CAP(id);
      rs.cha = P.cha;
       
      return rs;
    }
    static IS_BIEU_THUC_SO_CAP(P:BieuThucMenhDe):boolean{
       return P.bieuThucCons.length==0 ; 
    }
    static IS_ROOT(P:BieuThucMenhDe):boolean{
        return P.cha == null;
    }
    
    
    static CHUYEN_CAP(P:BieuThucMenhDe, cha:BieuThucMenhDe ):BieuThucMenhDe{
        P.cha = cha.cha;
        return P;
    }
    static SAO_CHEP(P:BieuThucMenhDe):BieuThucMenhDe{
        if(this.IS_BIEU_THUC_SO_CAP(P)) return P;
        let rs = new BieuThucMenhDe();
        rs.bieuThucCons = P.bieuThucCons;
        rs.toanTu = P.toanTu;
        return rs;
    }
}