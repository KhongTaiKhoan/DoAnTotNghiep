import { BieuThucMenhDe } from "../ChuongLogic/ThanhPhanC/BieuThucMenhDe";
import { ToanTu } from "../ChuongLogic/ThanhPhanOpts/ToanTuLogic";
import { BieuThucBuilder } from '../ChuongLogic/ThanhPhanC/BieuThucBuilder';
import { Helper } from '../ChuongLogic/ThanhPhanFuncs/Helper';
import { BiaKarnaugh, NhomTeBao } from './BiaKarnaugh';
import { BiaKarNaugh4Bien } from './BiaKarnaugh4Bien';
import { BiaKarNaugh3Bien } from "./BiaKarNaugh3Bien";
import { BiaKarNaugh5Bien } from './BiaKarnaugh5Bien';
import { Hoi } from '../ChuongLogic/ThanhPhanOpts/Hoi';


export class BoQuanLyBiaKarNaugh {
    private deBai: BieuThucMenhDe;
    private danhSachBien:BieuThucMenhDe[] = [];
    private mangDanhDau:number[] = [];
    private cacTeBao:number[][]=[]; //// CAC TE BAO LON

    private ketQua:KetQuaRutGonHamBoolean|null = null;
    public MA_TRAN_3_BIEN:number[][]=
    [
        [0,2,6,4],
        [1,3,7,5]
    ];

    public MA_TRAN_4_BIEN:number[][]=
    [
        [0,4,12,8],
        [1,5,13,9],
        [3,7,15,11],
        [2,6,14,10]
    ];

    private MA_TRAN_5_BIEN:number[][][] = [
        [
            [0,4,12,8],
            [1,5,13,9],
            [3,7,15,11],
            [2,6,14,10]
        ],
        [
            [16,20,28,24],
            [17,21,29,25],
            [19,23,31,27],
            [18,22,30,26]
        ]
    ];


    constructor(danhSachBien:BieuThucMenhDe[],deBai: BieuThucMenhDe,mangDanhDau:number[]) {
        this.deBai = deBai;
        this.danhSachBien=danhSachBien;
        this.mangDanhDau = mangDanhDau;

    }

    //#region  XAY DUNG
    duyet(){
        
        this.danhSachBien.sort((a,b)=>{
            if (a.id > b.id) return 1;
            return -1;
        });
    
        let tongHop:{bia:BiaKarnaugh,maTran:number[][][]}|null= this.xayDungBiaKarnaugh(this.mangDanhDau);

        if(tongHop!==null){
            let karnaugh:BiaKarnaugh = tongHop.bia;
            karnaugh.duyetCacTeBao();
            let nhom:NhomTeBao[] = karnaugh.layTeBao();
            nhom.forEach(element => {
                element.teBao.forEach(e=>{
                   this.cacTeBao.push(e);
                });
            });
            let teBaoLon:BieuThucMenhDe[]=[];
            for (let i = 0; i < this.cacTeBao.length; i++) {
                teBaoLon.push(this.chuyen1TeBao(this.cacTeBao[i]));
            }

            /// CAC TE BAO THIET YEU
            let thietYeu:number[][][]= this.teBaoThietYeu(this.mangDanhDau);
            let toiUu:number[][][]=this.ghiNhanTeBaoToiUu(thietYeu);
            let dsBieuThucDuocRutGon:BieuThucMenhDe[]=this.layTapHopBieuThucRutGon(toiUu);
            this.ketQua= new KetQuaRutGonHamBoolean(
                this.deBai,this.danhSachBien,tongHop.maTran,this.cacTeBao,thietYeu,toiUu,dsBieuThucDuocRutGon,teBaoLon,this.mangDanhDau
            );
        }else
        this.ketQua=null;
    }

   
    
    

    /// XAY DUNG MA TRAN VA HAM TIM KIEM CAC TE BAO LON
    private xayDungBiaKarnaugh(danhDau:number[]):{bia:BiaKarnaugh,maTran:number[][][]}|null{
        
        if(this.danhSachBien.length === 3){
            let maTran:number [][]= this.ghiCacTeBao(this.MA_TRAN_3_BIEN,danhDau);
            let bia = new BiaKarNaugh3Bien(maTran);
            // console.log(maTran);
            return {bia:bia,maTran:[maTran]};

        }
        else if(this.danhSachBien.length === 4){
            let maTran:number [][]= this.ghiCacTeBao(this.MA_TRAN_4_BIEN,danhDau);
            // console.log(maTran);
            let bia = new BiaKarNaugh4Bien(maTran);
            return {bia:bia,maTran:[maTran]};
           
        }
        else if(this.danhSachBien.length === 5){
            let maTran :number[][][]=[];
            for (let index = 0; index < this.MA_TRAN_5_BIEN.length; index++) {
                maTran.push(this.ghiCacTeBao(this.MA_TRAN_5_BIEN[index],danhDau));
            }
            // console.log(maTran);
            let bia = new BiaKarNaugh5Bien(maTran);
            return {bia:bia,maTran:maTran};
        }
        throw Error(`So luong bien khong phu hop: ${this.danhSachBien.length}`);
        return null;
    }

    /// GHI MA TRAN THONG QUA CAC SO DA DUOC DANH DAU
    private ghiCacTeBao(khuong: number[][], mangDanhDau: number[]): number[][] {
        let rs: number[][] = [];
        for (let i = 0; i < khuong.length; i++) {
            let row: number[] = [];
            for (let j = 0; j < khuong[i].length; j++) {
                if (mangDanhDau.includes(khuong[i][j]))
                    row.push(khuong[i][j])
                else row.push(-1);
            }
            rs.push(row);
        }
        return rs;
    }

    //#endregion

    //#region  phan nhom
    public teBaoThietYeu(danhDau: number[]): number[][][] {

        let teBaoThietYeu: number[][][] = [];
        let Cells: { id: number, dem: number, daDuyet: boolean, teBao: number[][] }[] = [];
        //// DUYET BANG DE NHAN CAC THIET LAP CAC TE BAO BAO PHU TUNG O
        for (let i = 0; i < danhDau.length; i++) {
            let dem: number = 0;
            let teBao: number[][] = [];
            for (let j = 0; j < this.cacTeBao.length; j++) {
                if (this.cacTeBao[j].includes(danhDau[i])) {
                    dem++;
                    teBao.push(this.cacTeBao[j]);
                }
            }
            Cells.push({ id: danhDau[i], dem: dem, daDuyet: false, teBao: teBao });

        }

        /// SAP XEP LAI Cells THEO TU DEM TANG DAN
        Cells.sort((a, b) => {
            if (a.dem < b.dem) return -1;
            if (a.dem > b.dem) return 1;
            return 0;
        });

        // Cells.forEach(cell => {
        //     console.log(`ID = ${cell.id} COUNT = ${cell.dem}`);
        // });

        /// TIEN HANH DUYET CAC TE BAO CO SO LUONG TE BAO LON BAN PHU LA 1
        /// TIEN HANH LUU CHUNG VAO MOT MANG, DAY LA CAC TE BAO BAT BUOC PHAI CO
        let khuong: number[][] = [];
        for (let i = 0; i < Cells.length; i++) {
            if (Cells[i].dem !== 1) break;
            if (Cells[i].daDuyet === true) continue;
            khuong.push(Cells[i].teBao[0]);
            for (let j = 0; j < Cells[i].teBao[0].length; j++) {
                let index: number = Cells.findIndex(e => { return e.id === Cells[i].teBao[0][j] });
                if (index !== -1) Cells[index].daDuyet = true;
            }

        }

        //// CAC TRUONG HOP CON LAI TIEN HANH DUYET VA LUU LAI CAC CAU HINH CO THE XAY RA,
        //// CAN KIEM TRA CAC CAU HINH NAY CO TRUNG HAY KHONG TRUOC KHI LUU CHUNG
        let conLai: { id: number, dem: number, daDuyet: boolean, teBao: number[][] }[] = [];
        for (let i = 0; i < Cells.length; i++) {
            if (!Cells[i].daDuyet) conLai.push(Cells[i]);
        }

        if (conLai.length !== 0) {
            
            /// MAX SO LUONG TE BAO BAO PHU CUA TUNG CELL
            let SO_LUONG: number[] = [];
            conLai.forEach(e => {
                SO_LUONG.push(e.dem);
            });

            let tuChon: {teBao:number[][],duyetRoi:number[]}[] = [];
            let trangThai: number[] = [];
            /// Cai dat cac trang thai VD: mac dinh la 0|0|0|..|0
            for (let i = 0; i < SO_LUONG.length; i++) {
                trangThai.push(0);
            }

            /// GHI NHAN TRANG THAI DAU TIEN LA TRANG THAI MAC DINH
            let row:{teBao:number[][],duyetRoi:number[]} = {teBao:[],duyetRoi:[]};
           
            for (let j = 0; j < trangThai.length; j++) {
                /// KIEM TRA TRUNG NHAU GIUA CAC conLai.TEBAO
                if(row.duyetRoi.length===0||!row.duyetRoi.includes(conLai[j].id)){
                    row.teBao.push(conLai[j].teBao[trangThai[j]]);
                    conLai[j].teBao[trangThai[j]].forEach(i=>{
                       row.duyetRoi.push(i); 
                    });
                }
                
                
            } 
            tuChon.push(row);

            /// SINH TO HOP CON
            for (let i = trangThai.length - 1; i >= 0; i--) {
                trangThai[i]+=1; 
                if (trangThai[i] >= SO_LUONG[i]) continue;
                for (let j = i + 1; j < trangThai.length; j++){trangThai[j] = 0;}

                //// GHI NHNA TRANG THAI
                let row:{teBao:number[][],duyetRoi:number[]} = {teBao:[],duyetRoi:[]};
                for (let j = 0; j < trangThai.length; j++) {
                    /// KIEM TRA TRUNG NHAU GIUA CAC conLai.TEBAO
                    if(row.duyetRoi.length===0||!row.duyetRoi.includes(conLai[j].id)){
                        row.teBao.push(conLai[j].teBao[trangThai[j]]);
                        conLai[j].teBao[trangThai[j]].forEach(i=>{
                           row.duyetRoi.push(i); 
                        });
                    }
                    
                } 
                let index=tuChon.findIndex(e=>{
                    return e.teBao.toString() === row.teBao.toString();
                });
                if(index ===-1)
                tuChon.push(row);

                i = trangThai.length ;
            }


            //// KET QUA CUOI CUNG
            for (let i = 0; i < tuChon.length; i++) {
                let ketHop: number[][] = [];
                for (let j = 0; j < khuong.length; j++) ketHop.push(khuong[j]);
                for (let j = 0; j < tuChon[i].teBao.length; j++) ketHop.push(tuChon[i].teBao[j]);
                teBaoThietYeu.push(ketHop);
            }
        } else teBaoThietYeu.push(khuong);
        return teBaoThietYeu;
    }

    /// TE BAO TOI UU LA CAC NHOM TE BAO CO SO LUONG IT NHAT
    private ghiNhanTeBaoToiUu(nhom:number[][][]):number[][][]{
        let ketQua:number[][][]=[];
        /// SAP XEP CAC NHOM TE BAO THEO SO LUONG TANG DAN
        nhom.sort((a,b)=>{
            if(a.length>b.length) return 1;
            if(a.length<b.length) return -1;
            return 0;
        });
        
        //// LAY CAC TE BAO LON NHAT
        for (let i = 0; i < nhom.length; i++) {
            if(i===0||nhom[i].length===nhom[i-1].length)ketQua.push(nhom[i]);
            else break;
        } 

        return ketQua;
    }

    private layTapHopBieuThucRutGon(toiUu:number[][][]):BieuThucMenhDe[]{
        let ketQua:BieuThucMenhDe[]=[];

          for (let index = 0; index < toiUu.length; index++) {
              let row:BieuThucMenhDe[]=[];
              for (let i = 0; i < toiUu[index].length; i++) {
                  row.push(this.chuyen1TeBao(toiUu[index][i]));  
              }
              let builder = new BieuThucBuilder().addToanTu(ToanTu.TUYEN);
              for (let i = 0; i < row.length; i++) {
                 builder.addBieuThucCon(row[i]);
              }
              ketQua.push(builder.build());
          }

          return ketQua;
    }

    private chuyen1TeBao(teBaoLon: number[]): BieuThucMenhDe {
        let boChuyenDoi: ChuyenDoiKarnaugh.ChuyenDoiTeBaoKarnaugh = ChuyenDoiKarnaugh.BoChuyenDoiKarNaugh_Factory.create(this.danhSachBien);
        let nhiPhan: string[] = [];
        
        //// CHUYEN CAC SO DUOC DANH DAU SANG NHI PHAN
        teBaoLon.forEach(num=>{
            nhiPhan.push(boChuyenDoi.ChuyenSoSangString(num));
        });


       ///// TIM DIEM CHUNG CUA CAC CHUOI NHI PHAN NAY
       let giongNhau:string=nhiPhan[0];
       for (let i = 1; i < nhiPhan.length; i++) {
          for (let j = 0; j < nhiPhan[i].length; j++) {
              if(giongNhau[j] !== nhiPhan[i][j]) giongNhau= giongNhau.substring(0,j)+'2'+giongNhau.substring(j+1);
          }
       }
    //    console.log(giongNhau);
       let builder:BieuThucBuilder=new BieuThucBuilder().addToanTu(ToanTu.HOI);
       for (let i = 0; i < giongNhau.length; i++) {
        //    console.log(this.danhSachBien[i].id);
           if(giongNhau[i] ==='2')continue;
           if(giongNhau[i] === '1'){
               builder.addBieuThucCon(Helper.SAO_CHEP(this.danhSachBien[i]));
               continue;
            }
           builder.addBieuThucCon(Helper.PHU_DINH_MENH_DE(this.danhSachBien[i]));
        }
        let kq = builder.build()
        // console.log(kq.id);
        // console.log('====\n');
       return kq;
    }

    // private sapXepNhomTeBao(nhom:NhomTeBao, ketQua:number[]):NhomTeBao{
    //     let ghiNhan:{id:number,dem:number}[]=[];
    //     /// DEM SO LUONG PHAN TU BI TRUNG
    //     for (let i = 0; i < nhom.teBao.length; i++) {
    //        let dem:number =0;
    //        for (let j = 0; j < nhom.teBao[i].length; j++) {
    //          if(ketQua.includes(nhom.teBao[i][j]))
    //          dem++;
    //        }
    //        ghiNhan.push({id:i,dem:dem});
    //     }
    //     /// TIEN HANH SAP XEP
    //     ghiNhan.sort((a,b)=>{
    //         if(a.dem > b.dem) return -1;
    //         if(a.dem < b.dem) return 1;
    //         return 0;
    //     });

    //     let sapXepRoi: number[] = [];
    //     for (let i = 0; i < ghiNhan.length; i++) {
    //         if (sapXepRoi.includes(i)) continue;
    //         let row: number[] = nhom.teBao[i];
    //         nhom.teBao[i] = nhom.teBao[ghiNhan[i].id];
    //         nhom.teBao[ghiNhan[i].id] = row;
    //         sapXepRoi.push(ghiNhan[i].id);
    //     }
    // }
    //#endregion

    public getKetQua():KetQuaRutGonHamBoolean|null{
        return this.ketQua;
    }
}

export namespace ChuyenDoiKarnaugh {
    export abstract class ChuyenDoiTeBaoKarnaugh {
        protected bieuThucSoCap:BieuThucMenhDe[] = [];
        constructor(bieuThucSoCap:BieuThucMenhDe[]){
            this.bieuThucSoCap = bieuThucSoCap;
        }

        abstract ChuyenStringSangSo(teBao: string): number;
        abstract ChuyenSoSangString(teBao: number): string;

        ChuyenChuoiSangTeBao(teBao: string, danhSachBien: BieuThucMenhDe[]): BieuThucMenhDe {
            let builder: BieuThucBuilder = new BieuThucBuilder().addToanTu(ToanTu.HOI);
            for (let i = 0; i < teBao.length; i++) {
                if (teBao[i] === '1')
                    builder.addBieuThucCon(Helper.BIEU_THUC_SO_CAP(danhSachBien[i].id))
                else
                    builder.addBieuThucCon(Helper.PHU_DINH_MENH_DE(danhSachBien[i]));

            }
            return builder.build();
        }
        ChuyenTeBaoSangChuoi(teBao: BieuThucMenhDe): string[] {
            let goc: string = '';
            for (let i = 0; i < this.bieuThucSoCap.length; i++) {
                let index:number = teBao.bieuThucCons.
                                   findIndex(e=>{return e.id.includes(this.bieuThucSoCap[i].id)});
                if (index !== -1) {
                    if (teBao.bieuThucCons[index].toanTu.tenToanTu !== ToanTu.PHU_DINH)
                        goc += '1';
                    else goc += '0'
                } else {
                    goc += '2';
                }
            }

            let result: string []= [];
           
            for (let i = 0; i < goc.length; i++) {
               if(goc[i]==='2'){
                   if(result.length===0){
                       goc = goc.substring(0,i)+'1'+goc.substring(i+1);
                       result.push(goc);
                       goc = goc.substring(0,i)+'0'+goc.substring(i+1);
                       result.push(goc);
                   }
                    else {
                        let count = result.length;
                        let newStr: string[] = [];
                        for (let j = 0; j < count; j++) {
                            let str: string = result[j].substring(0, i) + '1' + result[j].substring(i + 1);
                            newStr.push(str);
                            str = result[j].substring(0, i) + '0' + result[j].substring(i + 1);
                            newStr.push(str);
                        }
                        result = newStr;
                    }
                }
            }
            if (result.length === 0) result.push(goc);
            return result;
        }
        

    }

    export class ChuyenDoi3Bien extends ChuyenDoiTeBaoKarnaugh {
        constructor(bieuThucSoCap:BieuThucMenhDe[]){
            super(bieuThucSoCap);
        }
        ChuyenStringSangSo(teBao: string): number {
            if (teBao === '000') return 0;
            else if (teBao === '001') return 1;
            else if (teBao === '010') return 2;
            else if (teBao === '011') return 3;
            else if (teBao === '100') return 4;
            else if (teBao === '101') return 5;
            else if (teBao === '110') return 6;
            else if (teBao === '111') return 7;
            return -1;
        }
        ChuyenSoSangString(teBao: number): string {
            switch (teBao) {
                case 0: return '000';
                case 1: return '001';
                case 2: return '010';
                case 3: return '011';
                case 4: return '100';
                case 5: return '101';
                case 6: return '110';
                case 7: return '111';
            }
            return '000';
        }

    }

    export class ChuyenDoi4Bien extends ChuyenDoiTeBaoKarnaugh {
        constructor(bieuThucSoCap:BieuThucMenhDe[]){
            super(bieuThucSoCap);
        }

        ChuyenStringSangSo(teBao: string): number {
            if (teBao === '0000') return 0;
            else if (teBao === '0001') return 1;
            else if (teBao === '0010') return 2;
            else if (teBao === '0011') return 3;
            else if (teBao === '0100') return 4;
            else if (teBao === '0101') return 5;
            else if (teBao === '0110') return 6;
            else if (teBao === '0111') return 7;
            else if (teBao === '1000') return 8;
            else if (teBao === '1001') return 9;
            else if (teBao === '1010') return 10;
            else if (teBao === '1011') return 11;
            else if (teBao === '1100') return 12;
            else if (teBao === '1101') return 13;
            else if (teBao === '1110') return 14;
            else if (teBao === '1111') return 15;
            return -1;
        }
        ChuyenSoSangString(teBao: number): string {
            switch (teBao) {
                case 0: return  '0000';
                case 1: return  '0001';
                case 2: return  '0010';
                case 3: return  '0011';
                case 4: return  '0100';
                case 5: return  '0101';
                case 6: return  '0110';
                case 7: return  '0111';
                case 8: return  '1000';
                case 9: return  '1001';
                case 10: return '1010';
                case 11: return '1011';
                case 12: return '1100';
                case 13: return '1101';
                case 14: return '1110';
                case 15: return '1111';
            }
            return '000';
        }
    }

    export class ChuyenDoi5Bien extends ChuyenDoiTeBaoKarnaugh {
        constructor(bieuThucSoCap:BieuThucMenhDe[]){
            super(bieuThucSoCap);
        }

        ChuyenStringSangSo(teBao: string): number {
            if (teBao === '00000') return 0;
            else if (teBao === '00001') return 1;
            else if (teBao === '00010') return 2;
            else if (teBao === '00011') return 3;
            else if (teBao === '00100') return 4;
            else if (teBao === '00101') return 5;
            else if (teBao === '00110') return 6;
            else if (teBao === '00111') return 7;
            else if (teBao === '01000') return 8;
            else if (teBao === '01001') return 9;
            else if (teBao === '01010') return 10;
            else if (teBao === '01011') return 11;
            else if (teBao === '01100') return 12;
            else if (teBao === '01101') return 13;
            else if (teBao === '01110') return 14;
            else if (teBao === '01111') return 15;

            else if (teBao === '10000') return 16;
            else if (teBao === '10001') return 17;
            else if (teBao === '10010') return 18;
            else if (teBao === '10011') return 19;
            else if (teBao === '10100') return 20;
            else if (teBao === '10101') return 21;
            else if (teBao === '10110') return 22;
            else if (teBao === '10111') return 23;
            else if (teBao === '11000') return 24;
            else if (teBao === '11001') return 25;
            else if (teBao === '11010') return 26;
            else if (teBao === '11011') return 27;
            else if (teBao === '11100') return 28;
            else if (teBao === '11101') return 29;
            else if (teBao === '11110') return 30;
            else if (teBao === '11111') return 31;
            return -1;
        }
        ChuyenSoSangString(teBao: number): string {
            switch (teBao) {
                case 0: return '00000';
                case 1: return '00001';
                case 2: return '00010';
                case 3: return '00011';
                case 4: return '00100';
                case 5: return '00101';
                case 6: return '00110';
                case 7: return '00111';
                case 8: return '01000';
                case 9: return '01001';
                case 10: return '01010';
                case 11: return '01011';
                case 12: return '01100';
                case 13: return '01101';
                case 14: return '01110';
                case 15: return '01111';

                case 16: return '10000';
                case 17: return '10001';
                case 18: return '10010';
                case 19: return '10011';
                case 20: return '10100';
                case 21: return '10101';
                case 22: return '10110';
                case 23: return '10111';
                case 24: return '11000';
                case 25: return '11001';
                case 26: return '11010';
                case 27: return '11011';
                case 28: return '11100';
                case 29: return '11101';
                case 30: return '11110';
                case 31: return '11111';
            }
            return '000';
        }

    }

    export class BoChuyenDoiKarNaugh_Factory{
        public static create(bienCoSo:BieuThucMenhDe[]):ChuyenDoiTeBaoKarnaugh{
            switch (bienCoSo.length) {
                case 3: return new ChuyenDoiKarnaugh.ChuyenDoi3Bien(bienCoSo);
                case 4: return new ChuyenDoiKarnaugh.ChuyenDoi4Bien(bienCoSo);
                case 5: return new ChuyenDoiKarnaugh.ChuyenDoi5Bien(bienCoSo);
            };
            return new ChuyenDoiKarnaugh.ChuyenDoi4Bien(bienCoSo);
        }
    }
}


export class KetQuaRutGonHamBoolean{
    deBai:BieuThucMenhDe;
    bienCoSo:BieuThucMenhDe[];
    maTran:number[][][];
    teBaoLon:number[][];
    teBaoThietYeu:number[][][];
    teBaoToiUu:number[][][];
    bieuThucLonChuyenDoi:BieuThucMenhDe[];
    bieuThucChuyenDoi:BieuThucMenhDe[];
    mangDanhDau:number[];

    constructor( deBai:BieuThucMenhDe,bienCoSo:BieuThucMenhDe[],maTran:number[][][],teBaoLon:number[][],teBaoThietYeu:number[][][],teBaoToiUu:number[][][],bieuThucChuyenDoi:BieuThucMenhDe[],bieuThucLonChuyenDoi:BieuThucMenhDe[],mangDanhDau:number[]){
        this.deBai=deBai;
        this.bienCoSo=bienCoSo;
        this.maTran=maTran;
        this.teBaoLon=teBaoLon;
        this.teBaoThietYeu=teBaoThietYeu;
        this.teBaoToiUu=teBaoToiUu; 
        this.bieuThucLonChuyenDoi = bieuThucLonChuyenDoi;
        this.bieuThucChuyenDoi=bieuThucChuyenDoi;
        this.mangDanhDau = mangDanhDau;
    }
}

export class QuanLyKarnaugh_Factory{
    private bienCoSo:BieuThucMenhDe[]=[];
    private duyetBienCoSo() {
        this.bienCoSo.push(Helper.BIEU_THUC_SO_CAP('a'));
        this.bienCoSo.push(Helper.BIEU_THUC_SO_CAP('b'));
        this.bienCoSo.push(Helper.BIEU_THUC_SO_CAP('c'));
        this.bienCoSo.push(Helper.BIEU_THUC_SO_CAP('d'));
        this.bienCoSo.push(Helper.BIEU_THUC_SO_CAP('e'));
    }

    public createByArrayNumber(num:number[],length?:number,bienCoSo?:BieuThucMenhDe[]):BoQuanLyBiaKarNaugh{
        if (typeof bienCoSo !== 'undefined') {
            this.bienCoSo = bienCoSo;
            length = bienCoSo.length;
        }else {
            this.duyetBienCoSo(); 
           this.bienCoSo = this.bienCoSo.splice(0,length);
        }

        
        let boChuyenDoiKarNaugh: ChuyenDoiKarnaugh.ChuyenDoiTeBaoKarnaugh = ChuyenDoiKarnaugh.BoChuyenDoiKarNaugh_Factory.create(this.bienCoSo);
        let builder: BieuThucBuilder = new BieuThucBuilder().addToanTu(ToanTu.TUYEN);
        for (let i = 0; i < num.length; i++) {
            let so = boChuyenDoiKarNaugh.ChuyenSoSangString(num[i]);
            let bt: BieuThucMenhDe = boChuyenDoiKarNaugh.ChuyenChuoiSangTeBao(so, this.bienCoSo);
            builder.addBieuThucCon(bt);
        }

        let final: BieuThucMenhDe = builder.build();
        return new BoQuanLyBiaKarNaugh(this.bienCoSo,final,num);
    }
    // public createByArrayNumber(num:number[]):BoQuanLyBiaKarNaugh{
    //     let max_:number = -1;
    //     num.forEach(i=>{
    //         if(max_ < i) max_=i;
    //     });

    //     let soLuongCoSo:number = 0;
    //     this.bienCoSo = this.bienCoSo.slice(0,max_);
    //     this.duyetBienCoSo(); 


    //     let boChuyenDoiKarNaugh: ChuyenDoiKarnaugh.ChuyenDoiTeBaoKarnaugh = ChuyenDoiKarnaugh.BoChuyenDoiKarNaugh_Factory.create(this.bienCoSo);
    //     let builder: BieuThucBuilder = new BieuThucBuilder().addToanTu(ToanTu.TUYEN);
    //     for (let i = 0; i < num.length; i++) {
    //         let so = boChuyenDoiKarNaugh.ChuyenSoSangString(num[i]);
    //         let bt: BieuThucMenhDe = boChuyenDoiKarNaugh.ChuyenChuoiSangTeBao(so, this.bienCoSo);
    //         builder.addBieuThucCon(bt);
    //     }

    //     let final: BieuThucMenhDe = builder.build();
    //     return new BoQuanLyBiaKarNaugh(this.bienCoSo,final,num);
    // }
    public createByBieuThuc(bieuThuc:BieuThucMenhDe):BoQuanLyBiaKarNaugh{
       this.xacDinhSoLuongBien(bieuThuc);   
       let num:number[]=this.danhDauCacTeBao(bieuThuc);
       return new BoQuanLyBiaKarNaugh(this.bienCoSo,bieuThuc,num);
    }


    private xacDinhSoLuongBien(deBai:BieuThucMenhDe){
        for (let i = 0; i < deBai.bieuThucCons.length; i++) {
            let bt: BieuThucMenhDe = deBai.bieuThucCons[i];
            for (let j = 0; j < bt.bieuThucCons.length; j++) {
                let con: BieuThucMenhDe = bt.bieuThucCons[j];
                let id_:string = con.id;
                if(con.toanTu.tenToanTu === ToanTu.PHU_DINH)id_ = id_.split('0')[1];
                let index = this.bienCoSo.findIndex(e=>{return e.id === id_;}) ;
                
                if(index ===-1){
                    this.bienCoSo.push(Helper.BIEU_THUC_SO_CAP(id_));
                }
            }
        }
    }

    private danhDauCacTeBao(deBai:BieuThucMenhDe):number[]{
        let boChuyenDoi:ChuyenDoiKarnaugh.ChuyenDoiTeBaoKarnaugh = ChuyenDoiKarnaugh.BoChuyenDoiKarNaugh_Factory.create(this.bienCoSo);  
        let thanhPhanDanhDau:number[]=[];
        deBai.bieuThucCons.forEach(element => {
            let ma:string[] = boChuyenDoi.ChuyenTeBaoSangChuoi(element);
            ma.forEach(m=>{
                if(!thanhPhanDanhDau.includes(boChuyenDoi.ChuyenStringSangSo(m)))
                thanhPhanDanhDau.push(boChuyenDoi.ChuyenStringSangSo(m));
            });
        });
        if(thanhPhanDanhDau.length==0)throw Error('Bo Danh Dau dang rong {[]}');
        thanhPhanDanhDau.sort((a,b)=>{
            if(a>b)return 1;
            else if(a < b)return -1;
            return 0;
        });

        return thanhPhanDanhDau;
    }

    

}