import { BieuThucMenhDe } from "../../ChuongLogic/ThanhPhanC/BieuThucMenhDe";
import {BaiTap} from "../BaiTap"
import { BieuThucBuilder } from '../../ChuongLogic/ThanhPhanC/BieuThucBuilder';
import { ToanTu } from "../../ChuongLogic/ThanhPhanOpts/ToanTuLogic";
import { Helper } from '../../ChuongLogic/ThanhPhanFuncs/Helper';
import { RutGonBieuThuc } from './RutGonBieuThuc';
import { LoiGiaiChuyenDoi } from './LoiGiaiChuyenDoi';
import { ChuyenStringThanhBieuThuc } from '../../ChuongLogic/ThanhPhanFuncs/ChuyenStringThanhBieuThuc';
export class MenhDeTuongDuong extends BaiTap{
    private VT: BieuThucMenhDe;
    private VP:BieuThucMenhDe;
    private vp_clone:BieuThucMenhDe;
    private deBai:String;
    constructor(deBai:String){
        super();
        this.deBai = deBai;
        this.VT = new BieuThucMenhDe();
        this.VP = new BieuThucMenhDe();
        this.vp_clone = new BieuThucMenhDe();
    }

    tao_VT_VP(){
        if(this.deBai.includes('\u2194')){
           let str_deBai:string[] = this.deBai.split('\u2194');
        //    console.log(str_deBai[0]);
           this.VT = ChuyenStringThanhBieuThuc.chuyenDoi(str_deBai[0]);
           this.VP = ChuyenStringThanhBieuThuc.chuyenDoi(str_deBai[1]);
        }else if('\u2261'){
            let str_deBai:string[] = this.deBai.split('\u2261');
            // console.log(str_deBai[0]);
            this.VT = ChuyenStringThanhBieuThuc.chuyenDoi(str_deBai[0]);
            this.VP = ChuyenStringThanhBieuThuc.chuyenDoi(str_deBai[1]);
            this.vp_clone = ChuyenStringThanhBieuThuc.chuyenDoi(str_deBai[1]);
        }
        
    }


    //////
    giai(): any {
        this.tao_VT_VP();
       
        let loiGiai:LoiGiaiChuyenDoi|null =  this.chuyenDoi(this.VT,this.VP);
        if(loiGiai===null)console.log('khong giai duoc');
        else{
            let kq:{   btGoc:string,
                       btApDung:string ,
                       btKetQua:string ,
                       luat:string} [] = [];
            loiGiai.loiGiai[loiGiai.loiGiai.length-1].bieuThucGoc = this.vp_clone;
            for(let i:number=0;i<loiGiai.loiGiai.length;i++){
                // console.log(loiGiai.loiGiai[i])
                let btGoc:string = Helper.IN(loiGiai.loiGiai[i].bieuThucGoc);
                let btApDung:string = Helper.IN( loiGiai.loiGiai[i].bieuThucApDung);
                let btKetQua:string = Helper.IN( loiGiai.loiGiai[i].bieuThucKetQua);
                let luat:string = this.tapLuat.getLuat(loiGiai.loiGiai[i].idLuat-1).tenLuat;
                kq.push({btGoc:btGoc,btApDung:btApDung,btKetQua:btKetQua,luat});
               
            }
            // console.log(Helper.IN(Helper.PHU_DINH_MENH_DE(Helper.BIEU_THUC_SO_CAP('x'))));
            return kq;
        }
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