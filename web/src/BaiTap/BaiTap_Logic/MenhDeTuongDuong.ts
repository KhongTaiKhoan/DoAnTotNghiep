import { BieuThucMenhDe } from "../../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe";
import {BaiTap} from "../BaiTap"
import { BieuThucBuilder } from '../../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucBuilder';
import { ToanTu } from "../../BieuDienTriThuc/ChuongLogic/ThanhPhanOpts/ToanTuLogic";
import { Helper } from '../../BieuDienTriThuc/ChuongLogic/ThanhPhanFuncs/Helper';
export class MenhDeTuongDuong extends BaiTap{
  //  private VT: BieuThucMenhDe;
 //   private VP:BieuThucMenhDe;
    private root:String;
    constructor(root:String){
        super();
        this.root = root;
    }

    tao_VT_VP(){
        this.root.includes("")
    }


    //////
    giai(P: BieuThucMenhDe): void {
        let l:BieuThucMenhDe = new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('a'))
                                                    .addBieuThucCon(Helper.BIEU_THUC_SO_CAP('b'))
                                                    .addToanTu(ToanTu.TUYEN)
                                                    .build();

        let r:BieuThucMenhDe = new BieuThucBuilder().addBieuThucCon( new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('a'))
                                                                                          .addBieuThucCon(Helper.BIEU_THUC_SO_CAP('b'))
                                                                                          .addToanTu(ToanTu.TUYEN)
                                                                                          .build())            
                                                    .addBieuThucCon( new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('c'))
                                                                                          .addBieuThucCon(Helper.BIEU_THUC_SO_CAP('d'))
                                                                                          .addToanTu(ToanTu.TUYEN)
                                                                                          .build())
                                                    .addToanTu(ToanTu.HOI)
                                                    .build();         
        
        let bt:BieuThucMenhDe = new BieuThucBuilder().addBieuThucCon(l)
                                                     .addBieuThucCon(r)
                                                     .addToanTu(ToanTu.TUYEN)      
                                                     .build();                                       
        
        
        this.tapLuat.duyetTapLuat(bt);
        
      
    }
}