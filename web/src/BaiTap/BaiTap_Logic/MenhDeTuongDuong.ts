import { BieuThucMenhDe } from "../../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe";
import {BaiTap} from "../BaiTap"
import { BieuThucBuilder } from '../../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucBuilder';
import { ToanTu } from "../../BieuDienTriThuc/ChuongLogic/ThanhPhanOpts/ToanTuLogic";
import { Helper } from '../../BieuDienTriThuc/ChuongLogic/ThanhPhanFuncs/Helper';
import { RutGonBieuThuc } from './RutGonBieuThuc';
import { LoiGiaiChuyenDoi } from './LoiGiaiChuyenDoi';
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
        let VT_BUILDER:BieuThucBuilder = new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('y'))
                                                     .addBieuThucCon(Helper.BIEU_THUC_SO_CAP('z'))
                                                     .addToanTu(ToanTu.KEO_THEO);

        let VT:BieuThucMenhDe = new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('x'))
                                                     .addBieuThucCon(VT_BUILDER.build())
                                                     .addToanTu(ToanTu.KEO_THEO).build(); 


        let VP_BUILDER:BieuThucBuilder = new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('x'))
                                                     .addBieuThucCon(Helper.BIEU_THUC_SO_CAP('z'))
                                                     .addToanTu(ToanTu.KEO_THEO);

        let VP:BieuThucMenhDe = new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('y'))
                                                     .addBieuThucCon(VP_BUILDER.build())
                                                     .addToanTu(ToanTu.KEO_THEO).build(); 

        let vp_clone:BieuThucMenhDe =  new BieuThucBuilder().addBieuThucCon(Helper.BIEU_THUC_SO_CAP('y'))
                                             .addBieuThucCon(VP_BUILDER.build())
                                             .addToanTu(ToanTu.KEO_THEO).build(); 
        
       
        console.log(Helper.IN(vp_clone));

        console.log(`TA CO VP: ${VP.id}:\n`)
        console.log(`TA CO VT: ${VT.id}:\n`)
       
        let loiGiai:LoiGiaiChuyenDoi|null =  this.chuyenDoi(VT,VP);
        if(loiGiai===null)console.log('khong giai duoc');
        else{
            
            loiGiai.loiGiai[loiGiai.loiGiai.length-1].bieuThucGoc = vp_clone;
            for(let i:number=0;i<loiGiai.loiGiai.length;i++){
                // console.log(loiGiai.loiGiai[i])
                let btGoc:string = loiGiai.loiGiai[i].bieuThucGoc.id;
                let btApDung:string = loiGiai.loiGiai[i].bieuThucApDung.id;
                let btKetQua:string = loiGiai.loiGiai[i].bieuThucKetQua.id;
                let luat:string = this.tapLuat.getLuat(loiGiai.loiGiai[i].idLuat-1).tenLuat;
                console.log(`- Ap dung ${luat} cho ${btApDung}, ta duoc: ${btKetQua}\n Nen ta co: ${btGoc}\n`);
            }
        }
        // let rg:RutGonBieuThuc = new RutGonBieuThuc(VP);
        // let gt:LoiGiaiChuyenDoi|null = rg.giai()||null;
        // if(gt!=null)
        // console.log(`KET QUA: ${gt.ketQua?.id}`);
    }  

    chuyenDoi(VT: BieuThucMenhDe, VP: BieuThucMenhDe): LoiGiaiChuyenDoi | null {
        let rutGon: RutGonBieuThuc = new RutGonBieuThuc(VT);
        /// RUT GON VE TRAI
        let loiGiaiTrai: LoiGiaiChuyenDoi | null = rutGon.giai() || null;
        if (loiGiaiTrai === null) return null;


        /// RUT GON VE PHAI
        rutGon = new RutGonBieuThuc(VP);
        let loiGiaPhai: LoiGiaiChuyenDoi | null = rutGon.giai() || null;
        if (loiGiaPhai === null) return null;
        
        /// THUC HIEN QUA TRINH KET HOP SU KIEN
        let i: number = 0;
        for (i = 0; i < loiGiaPhai.loiGiai.length; i++) {
            if (loiGiaiTrai.ketQua !== null && loiGiaPhai.loiGiai[i].bieuThucGoc.id === loiGiaiTrai.ketQua.id) break;
        }
        if(i === loiGiaPhai.loiGiai.length)return null;
        
        let loiGiaiCuoiCung = loiGiaiTrai;
        loiGiaiCuoiCung.ketQua = VP;
        for (let j: number = i ; j >= 0; j--) {
            if(j > 0){
                // let goc = loiGiaPhai.loiGiai[i-1];
               loiGiaiCuoiCung.loiGiai.push({
                   bieuThucGoc: loiGiaPhai.loiGiai[j-1].bieuThucGoc,
                   bieuThucKetQua: loiGiaPhai.loiGiai[j].bieuThucApDung,
                   bieuThucApDung: loiGiaPhai.loiGiai[j].bieuThucKetQua,
                   idLuat: loiGiaPhai.loiGiai[j].idLuat
               });
            }
            else{
                loiGiaiCuoiCung.loiGiai.push({
                    bieuThucGoc: VP,
                    bieuThucKetQua: loiGiaPhai.loiGiai[j].bieuThucApDung,
                    bieuThucApDung: loiGiaPhai.loiGiai[j].bieuThucKetQua,
                    idLuat: loiGiaPhai.loiGiai[j].idLuat
                });
            }
        }
        
        return loiGiaiCuoiCung;

    }
}