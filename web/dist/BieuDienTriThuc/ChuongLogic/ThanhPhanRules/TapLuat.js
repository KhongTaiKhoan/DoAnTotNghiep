"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapLuat = void 0;
const Luat_1 = require("./Luat");
const BieuThucMenhDe_1 = require("../ThanhPhanC/BieuThucMenhDe");
const ToanTuLogic_1 = require("../ThanhPhanOpts/ToanTuLogic");
const ToanTuFactory_1 = require("../ThanhPhanOpts/ToanTuFactory");
const BieuThucBuilder_1 = require("../ThanhPhanC/BieuThucBuilder");
const Helper_1 = require("../ThanhPhanFuncs/Helper");
class TapLuat {
    constructor() {
        this.tapLuat = [];
        this.xayDungTapLuat();
    }
    xayDungTapLuat() {
        /// LUAT PHEP TUONG DUONG
        this.tapLuat.push(new Luat_1.Luat(1, "Luat phep tuong duong", new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUONG_DUONG)
                    return P;
                return null;
            }
            ketQua(P) {
                let left = P.bieuThucCons[0];
                let right = P.bieuThucCons[1];
                let S = new BieuThucBuilder_1.BieuThucBuilder()
                    .addBieuThucCon(left)
                    .addBieuThucCon(right)
                    .addToanTu(ToanTuLogic_1.ToanTu.KEO_THEO)
                    .addCha(P)
                    .build();
                let R = new BieuThucBuilder_1.BieuThucBuilder()
                    .addBieuThucCon(right)
                    .addBieuThucCon(left)
                    .addToanTu(ToanTuLogic_1.ToanTu.KEO_THEO)
                    .addCha(P)
                    .build();
                let rs = new BieuThucBuilder_1.BieuThucBuilder()
                    .addBieuThucCon(S)
                    .addBieuThucCon(R)
                    .addToanTu(ToanTuLogic_1.ToanTu.HOI)
                    .addCha(P.cha)
                    .build();
                return rs;
            }
        }()));
        /// LUAT PHEP KEO THEO
        this.tapLuat.push(new Luat_1.Luat(2, "Luat phep keo theo", new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.KEO_THEO)
                    return P;
                return null;
            }
            ketQua(P) {
                let left = P.bieuThucCons[0];
                let right = P.bieuThucCons[1];
                let rs = new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(Helper_1.Helper.PHU_DINH_MENH_DE(left))
                    .addBieuThucCon(right)
                    .addToanTu(ToanTuLogic_1.ToanTu.TUYEN)
                    .addCha(P.cha)
                    .build();
                return rs;
            }
        }()));
        /// LUAT DONG NHAT
        this.tapLuat.push(new Luat_1.Luat(3, "Luat dong nhat", new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUYEN && P.id.includes(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI))
                    return new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(P.bieuThucCons[0])
                        .addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI))
                        .addCha(P.cha)
                        .addToanTu(P.toanTu.tenToanTu)
                        .build();
                return null;
            }
            ketQua(P) {
                /// B1: LOAI BO HANG SAI
                let index = P.bieuThucCons.findIndex(element => element.id === BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI);
                P.bieuThucCons.splice(index, 1);
                /// B2: NEU MENH DE CHI CON 1 BIEU THUC CON, MENH DE TRO THANH MENH DE SO CAP
                if (P.bieuThucCons.length === 1)
                    P = Helper_1.Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id, P);
                return P;
            }
        }()));
        /// LUAT DONG NHAT
        this.tapLuat.push(new Luat_1.Luat(3, "Luat dong nhat", new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI && P.id.includes(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG))
                    return new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(P.bieuThucCons[0])
                        .addBieuThucCon(Helper_1.Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG))
                        .addCha(P.cha)
                        .addToanTu(P.toanTu.tenToanTu)
                        .build();
                return null;
            }
            ketQua(P) {
                /// B1: LOAI BO HANG SAI
                let index = P.bieuThucCons.findIndex(element => element.id === BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG);
                P.bieuThucCons.splice(index, 1);
                /// B2: NEU MENH DE CHI CON 1 BIEU THUC CON, MENH DE TRO THANH MENH DE SO CAP
                if (P.bieuThucCons.length === 1)
                    P = Helper_1.Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id, P);
                return P;
            }
        }()));
        /// LUAT NUOT
        this.tapLuat.push(new Luat_1.Luat(4, 'Luat nuot', new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI && P.id.includes(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI)) {
                    return P;
                }
                return null;
            }
            ketQua(P) {
                return Helper_1.Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI, P);
            }
        }()));
        /// LUAT NUOT
        this.tapLuat.push(new Luat_1.Luat(4, 'Luat nuot', new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUYEN && P.id.includes(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG))
                    return P;
                return null;
            }
            ketQua(P) {
                return Helper_1.Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG, P);
            }
        }()));
        /// LUAT LUY DANG
        this.tapLuat.push(new Luat_1.Luat(5, 'Luat luy dang', new class {
            boKiemTra(P) {
                let ktTrung = false;
                let i = -1;
                let j = -1;
                for (i = 0; i < P.bieuThucCons.length; i++) {
                    for (j = 0; j < P.bieuThucCons.length; j++) {
                        if (i === j)
                            continue;
                        if (P.bieuThucCons[i].id === P.bieuThucCons[j].id) {
                            ktTrung = true;
                            break;
                        }
                    }
                    if (ktTrung)
                        break;
                }
                if ((P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI || P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUYEN) && ktTrung) {
                    return new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon2(P.bieuThucCons[i])
                        .addBieuThucCon2(P.bieuThucCons[i])
                        .addToanTu(P.toanTu.tenToanTu)
                        .build();
                }
                return null;
            }
            ketQua(P, con) {
                let i = 0;
                i = P.bieuThucCons.findIndex(e => e.id = con.id);
                P.bieuThucCons.splice(i, 1);
                if (P.bieuThucCons.length == 1) {
                    P = Helper_1.Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id, P);
                }
                return P;
            }
        }()));
        ///Luat Phu dinh kep
        this.tapLuat.push(new Luat_1.Luat(6, 'Luat phu dinh kep', new class {
            boKiemTra(P) {
                if (P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.PHU_DINH && P.bieuThucCons[0].toanTu.tenToanTu == ToanTuLogic_1.ToanTu.PHU_DINH)
                    return P;
                return null;
            }
            ketQua(P) {
                let rs = new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(P.bieuThucCons[0].bieuThucCons[0])
                    .addToanTu(P.bieuThucCons[0].bieuThucCons[0].toanTu.tenToanTu)
                    .addCha(P.cha)
                    .build();
                return Helper_1.Helper.CHUYEN_CAP(rs.bieuThucCons[0], rs);
            }
        }()));
        /// LUAT PHAN TU BU
        this.tapLuat.push(new Luat_1.Luat(7, 'Luat phan tu bu', new class {
            boKiemTra(P) {
                let ktTrung = false;
                let i = -1;
                let j = -1;
                for (i = 0; i < P.bieuThucCons.length; i++) {
                    for (j = 0; j < P.bieuThucCons.length; j++) {
                        if (i === j)
                            continue;
                        if (P.bieuThucCons[i].id === Helper_1.Helper.PHU_DINH_MENH_DE(Helper_1.Helper.SAO_CHEP(P.bieuThucCons[j])).id) {
                            ktTrung = true;
                            break;
                        }
                    }
                    if (ktTrung)
                        break;
                }
                let kt = P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUYEN || P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI;
                if (kt && ktTrung) {
                    return new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(P.bieuThucCons[i])
                        .addBieuThucCon(P.bieuThucCons[j])
                        .addToanTu(P.toanTu.tenToanTu)
                        .build();
                }
                return null;
            }
            ketQua(P, con) {
                let index = P.bieuThucCons.findIndex(ele => ele.id == con.bieuThucCons[0].id);
                P.bieuThucCons.splice(index, 1);
                index = P.bieuThucCons.findIndex(ele => ele.id == con.bieuThucCons[1].id);
                P.bieuThucCons.splice(index, 1);
                if (con.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI)
                    P.bieuThucCons.push(Helper_1.Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_SAI));
                else
                    P.bieuThucCons.push(Helper_1.Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe_1.BieuThucMenhDe.MA_HANG_DUNG));
                if (P.bieuThucCons.length == 0)
                    P.toanTu = new ToanTuFactory_1.ToanTuFactory().create(ToanTuLogic_1.ToanTu.NONE);
                return P;
            }
        }()));
        //Luat hap thu
        this.tapLuat.push(new Luat_1.Luat(8, 'Luat hap thu', new class {
            boKiemTra(P) {
                let i = 0;
                let j = 0;
                let kt = false;
                for (i = 0; i < P.bieuThucCons.length; i++) {
                    for (j = 0; j < P.bieuThucCons[i].bieuThucCons.length; j++) {
                        if (i === j)
                            continue;
                        if (Helper_1.Helper.IS_BIEU_THUC_SO_CAP(P.bieuThucCons[i].bieuThucCons[j]))
                            continue;
                        if (P.bieuThucCons[j].bieuThucCons[0].id === P.bieuThucCons[i].id || P.bieuThucCons[j].bieuThucCons[1].id === P.bieuThucCons[i].id) {
                            kt = true;
                            break;
                        }
                    }
                    if (kt)
                        break;
                }
                if (kt)
                    if ((P.bieuThucCons[i].toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUYEN && P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI) ||
                        (P.bieuThucCons[i].toanTu.tenToanTu === ToanTuLogic_1.ToanTu.HOI || P.toanTu.tenToanTu === ToanTuLogic_1.ToanTu.TUYEN)) {
                        return new BieuThucBuilder_1.BieuThucBuilder().addBieuThucCon(P.bieuThucCons[i])
                            .addBieuThucCon(P.bieuThucCons[j])
                            .addToanTu(P.toanTu.tenToanTu)
                            .build();
                    }
                return null;
            }
            ketQua(P, con) {
                let index = 0;
                index = P.bieuThucCons.findIndex(ele => ele.id === con.bieuThucCons[1].id);
                P.bieuThucCons.splice(index, 1);
                if (P.bieuThucCons.length == 1) {
                    P = Helper_1.Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id, P);
                }
                return P;
            }
        }()));
        // /// LUAT PhAN PHOI
        // this.tapLuat.push(
        //     new Luat(9,
        //         'Luat phan phoi',
        //         new class implements ILuat{
        //             boKiemTra(P:BieuThucMenhDe,con:BieuThucMenhDe):boolean{
        //                 let arr:string[] = [];
        //                 let i:number = 0;
        //                 let j:number = 0;
        //                 let kt:boolean = false;
        //                 for(i=0;i<P.bieuThucCons.length-1;i++){
        //                     if(P.bieuThucCons[i].bieuThucCons.length===1) continue;                            
        //                     for(j=i+1;j<P.bieuThucCons.length;j++){
        //                         if(P.bieuThucCons[j].bieuThucCons.length===1)continue;
        //                         for(let z:number= 0 ;z<P.bieuThucCons[i].bieuThucCons.length-1;z++){
        //                             if(P.bieuThucCons[j].id.includes( P.bieuThucCons[i].bieuThucCons[z].id)){
        //                                 arr.push(P.bieuThucCons[i].bieuThucCons[z].id);
        //                                 kt = true;    
        //                             }
        //                         }
        //                         if(kt)break;
        //                     }
        //                     if(kt)break;
        //                 }
        //                 if(kt){
        //                     let kt2:boolean =(P.bieuThucCons[i].toanTu.tenToanTu == P.bieuThucCons[j].toanTu.tenToanTu)
        //                                     && P.bieuThucCons[i].toanTu.tenToanTu !== ToanTu.KEO_THEO && P.bieuThucCons[i].toanTu.tenToanTu !== ToanTu.TUONG_DUONG
        //                                     && P.toanTu.tenToanTu !== ToanTu.KEO_THEO && P.toanTu.tenToanTu !== ToanTu.TUONG_DUONG
        //                                     && P.toanTu.tenToanTu !== P.bieuThucCons[i].toanTu.tenToanTu;
        //                     if(kt2){
        //                         let r:BieuThucMenhDe = new BieuThucMenhDe();
        //                         let build:BieuThucBuilder = new BieuThucBuilder();
        //                         for(let i_:number=0;i_<arr.length;i_++){
        //                             let index:number = P.bieuThucCons[i].bieuThucCons.findIndex(ele =>ele.id === arr[i_]);
        //                             build.addBieuThucCon(P.bieuThucCons[i].bieuThucCons[index]);   
        //                         } 
        //                         r = build.addToanTu(P.bieuThucCons[i].toanTu.tenToanTu).build();
        //                         con = new BieuThucBuilder().addBieuThucCon(r)
        //                                                    .addBieuThucCon(P.bieuThucCons[i])
        //                                                    .addBieuThucCon(P.bieuThucCons[j])
        //                                                    .addToanTu(P.toanTu.tenToanTu)
        //                                                    .build(); 
        //                     }   
        //                     else 
        //                     return false;             
        //                 }
        //                 return false;
        //             }
        //             ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
        //                 let left: BieuThucMenhDe = new BieuThucMenhDe();
        //                 let right: BieuThucMenhDe = new BieuThucMenhDe();
        //                 for (let i: number = 0; i < con.bieuThucCons[1].bieuThucCons.length; i++) {
        //                     let kt: boolean = false;
        //                     for (let j: number = 0; j < con.bieuThucCons[0].bieuThucCons.length; j++) {
        //                         if (con.bieuThucCons[1].bieuThucCons[i].id === con.bieuThucCons[0].bieuThucCons[j].id) {
        //                             kt = true;
        //                         }
        //                     }
        //                     if (!kt)
        //                         left.bieuThucCons.push(con.bieuThucCons[1].bieuThucCons[i]);
        //                 }
        //                 left.toanTu = con.bieuThucCons[1].toanTu;
        //                 for (let i: number = 0; i < con.bieuThucCons[2].bieuThucCons.length; i++) {
        //                     let kt: boolean = false;
        //                     for (let j: number = 0; j < con.bieuThucCons[0].bieuThucCons.length; j++) {
        //                         if (con.bieuThucCons[2].bieuThucCons[i].id === con.bieuThucCons[0].bieuThucCons[j].id) {
        //                             kt = true;
        //                         }
        //                     }
        //                     if (!kt)
        //                         right.bieuThucCons.push(con.bieuThucCons[2].bieuThucCons[i]);
        //                 }
        //                 right.toanTu = con.bieuThucCons[2].toanTu;
        //                 let S:BieuThucMenhDe = new BieuThucBuilder().addBieuThucCon(left)
        //                                                             .addBieuThucCon(right)
        //                                                             .addToanTu(P.toanTu.tenToanTu)
        //                                                             .addCha(P)
        //                                                             .build();
        //                    // if(con !== null)
        //                 return new BieuThucBuilder().addBieuThucCon(con.bieuThucCons[0])          
        //                                             .addBieuThucCon(S)
        //                                             .addToanTu(con.bieuThucCons[0].toanTu.tenToanTu)
        //                                             .addCha(P.cha)
        //                                             .build();                                    
        //                 return new BieuThucMenhDe();
        //             }
        //         }()
        //     )
        // );
        // /// LUAT KET HOP
        // this.tapLuat.push(
        //     new Luat(10,
        //         'Luat ket hop',
        //         new class implements ILuat{
        //             boKiemTra(P:BieuThucMenhDe, con:BieuThucMenhDe):boolean{
        //                 let tt:ToanTu = P.toanTu;
        //                 let kt:boolean = false;
        //                 let builder:BieuThucBuilder = new BieuThucBuilder().addToanTu(tt.tenToanTu);
        //                 for(let i:number = 0;i<P.bieuThucCons.length;i++){
        //                     if(P.bieuThucCons[i].toanTu.tenToanTu === ToanTu.NONE||tt.tenToanTu === P.bieuThucCons[i].toanTu.tenToanTu){
        //                         kt = true; 
        //                         builder.addBieuThucCon(P.bieuThucCons[i]);
        //                     }
        //                 }
        //                 if(kt)
        //                 con = builder.build();
        //                 return kt;
        //             }
        //             ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
        //                 let builder:BieuThucBuilder = new BieuThucBuilder().addToanTu(P.toanTu.tenToanTu);
        //                 let index:number=0;
        //                 for(let i:number=0;i<P.bieuThucCons.length;i++){
        //                     if(P.bieuThucCons[i].id === con.bieuThucCons[index].id){
        //                         for(let j:number=0;j<P.bieuThucCons[i].bieuThucCons.length;j++){
        //                              builder.addBieuThucCon(P.bieuThucCons[i].bieuThucCons[j]);  
        //                         }
        //                     }else
        //                     builder.addBieuThucCon(P.bieuThucCons[i]);
        //                 }
        //                 builder.addCha(P.cha);
        //                 return builder.build();
        //             }
        //         }()
        //     )
        // );
        // /// LUAT DE MORGAN
        // this.tapLuat.push(
        //     new Luat(11,
        //         'Luat De Morgan',
        //         new class implements ILuat{
        //             boKiemTra(P:BieuThucMenhDe,con:BieuThucMenhDe):boolean{
        //                 let tt = P.toanTu.tenToanTu === ToanTu.HOI ? new ToanTuFactory().create(ToanTu.TUYEN) : new ToanTuFactory().create(ToanTu.HOI);          
        //                 let builder = new BieuThucBuilder().addToanTu(tt.tenToanTu);
        //                 let count:number = 0;
        //                 for(let i:number=0;i<P.bieuThucCons.length;i++){
        //                     if(P.bieuThucCons[i].toanTu.tenToanTu === ToanTu.PHU_DINH){
        //                         builder.addBieuThucCon(P.bieuThucCons[i].bieuThucCons[0]);
        //                         count++;
        //                     }
        //                 }
        //                 builder.addCha(P);
        //                 if(count>=2){
        //                     con = builder.build();
        //                     return true;
        //                 }
        //                 return false;
        //             }
        //             ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
        //                 let S:BieuThucMenhDe = new BieuThucBuilder().addCha(P)
        //                                                             .addToanTu(ToanTu.PHU_DINH)
        //                                                             .addBieuThucCon(con)
        //                                                             .build() ;
        //                 let builder = new BieuThucBuilder().addToanTu(P.toanTu.tenToanTu);
        //                 for(let i:number=0;i<P.bieuThucCons.length;i++){
        //                     if(P.bieuThucCons[i].toanTu.tenToanTu !== ToanTu.PHU_DINH){
        //                         builder.addBieuThucCon(P.bieuThucCons[i].bieuThucCons[0]);
        //                     }
        //                 }                                         
        //                 return builder.addBieuThucCon(S).build();
        //             }
        //         }()
        //     )
        // )
        // /// LUAT DE MORGAN
        // this.tapLuat.push(
        //     new Luat(12,
        //         'Luat DE Morgan',
        //         new class implements ILuat{
        //             boKiemTra(P:BieuThucMenhDe):boolean{
        //                 return P.toanTu.tenToanTu === ToanTu.PHU_DINH && !Helper.IS_BIEU_THUC_SO_CAP(P) &&P.cha!==null &&!P.cha.id.includes(P.bieuThucCons[0].id);
        //             }
        //             ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
        //                 let tt = P.toanTu.tenToanTu === ToanTu.HOI ? new ToanTuFactory().create(ToanTu.TUYEN) : new ToanTuFactory().create(ToanTu.HOI);          
        //                 let builder = new BieuThucBuilder().addToanTu(tt.tenToanTu);
        //                 for(let i:number=0;i<P.bieuThucCons[0].bieuThucCons.length;i++){
        //                     let bl:BieuThucMenhDe = Helper.PHU_DINH_MENH_DE(P.bieuThucCons[0].bieuThucCons[i]);
        //                     builder.addBieuThucCon(bl);                                             
        //                 }
        //                 builder.addCha(P.cha);
        //                 return builder.build();
        //             }
        //         }()
        //     )
        // );
        // /// LUAT KET HOP
        // this.tapLuat.push(
        //     new Luat(13,
        //     'Luat ket hop',
        //     new class implements ILuat{
        //         boKiemTra(P:BieuThucMenhDe,con:BieuThucMenhDe):boolean{
        //             let bt = new BieuThucMenhDe();
        //             let kt:boolean = false;
        //             for(let i:number= 0;i<P.bieuThucCons.length;i++)
        //                 if(Helper.IS_BIEU_THUC_SO_CAP(P.bieuThucCons[i]))
        //                     bt.bieuThucCons.push(P.bieuThucCons[i]);
        //             con.bieuThucCons.push(bt);
        //             for(let i:number = 0; i<P.bieuThucCons.length;i++){
        //                 if(!Helper.IS_BIEU_THUC_SO_CAP(P.bieuThucCons[i])){
        //                     if(bt.id.includes(P.bieuThucCons[i].id)){
        //                        kt = true;
        //                        con.bieuThucCons.push(P.bieuThucCons[i]);
        //                        con.bieuThucCons.push(P.bieuThucCons[i]);
        //                     }
        //                     if(bt.id.includes(P.bieuThucCons[i].bieuThucCons[0].id)){
        //                         kt =true;
        //                         con.bieuThucCons.push(P.bieuThucCons[i].bieuThucCons[0]);
        //                         con.bieuThucCons.push(P.bieuThucCons[i]);
        //                     }
        //                     if(bt.id.includes(P.bieuThucCons[i].bieuThucCons[1].id)){
        //                         kt =true;
        //                         con.bieuThucCons.push( P.bieuThucCons[i].bieuThucCons[1]);
        //                         con.bieuThucCons.push(P.bieuThucCons[i]);
        //                     }
        //                     if(kt)break;
        //                 }
        //             }        
        //             return kt;
        //         }
        //         ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
        //             let bt = con.bieuThucCons[1];
        //             let builder = new BieuThucBuilder().addCha(P.cha).addToanTu(P.toanTu.tenToanTu);
        //             for(let i:number=0;con.bieuThucCons[0].bieuThucCons.length;i++){
        //                if(bt.bieuThucCons.findIndex(e=>e.id == con.bieuThucCons[0].bieuThucCons[i].id)==-1)   
        //                   builder.addBieuThucCon(con.bieuThucCons[0].bieuThucCons[i]);
        //             }
        //             return builder.addBieuThucCon(con.bieuThucCons[1])
        //                    .addBieuThucCon(con.bieuThucCons[2])
        //                    .build();
        //         }
        //     }()
        // ));
        // /// LUAT PHAN PHOI
        // this.tapLuat.push(
        //     new Luat(14,
        //         'Luat phan phoi',
        //         new class implements ILuat{
        //             boKiemTra(P:BieuThucMenhDe):boolean{
        //                 return !Helper.IS_BIEU_THUC_SO_CAP(P) && Helper.IS_ROOT(P)&& P.toanTu.tenToanTu !== ToanTu.PHU_DINH
        //                        && (!Helper.IS_BIEU_THUC_SO_CAP( P.bieuThucCons[0])  || !Helper.IS_BIEU_THUC_SO_CAP( P.bieuThucCons[1]) );
        //             }
        //             ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
        //                 let in_1:number = 0;
        //                 let in_2:number = 1;
        //                 if(Helper.IS_BIEU_THUC_SO_CAP(P.bieuThucCons[in_2])){
        //                     in_1 = 1;
        //                     in_2 = 0;
        //                 }
        //                 let tt = P.toanTu.tenToanTu === ToanTu.HOI ? new ToanTuFactory().create(ToanTu.TUYEN) : new ToanTuFactory().create(ToanTu.HOI);          
        //                 let builder = new BieuThucBuilder().addCha(P).addToanTu(tt.tenToanTu) ;
        //                 for(let i:number=0;i<P.bieuThucCons[in_2].bieuThucCons.length;i++){
        //                    let m:BieuThucMenhDe = new BieuThucMenhDe();
        //                    for(let j:number=0;j<P.bieuThucCons[in_1].bieuThucCons.length;j++)
        //                       m.bieuThucCons.push(P.bieuThucCons[in_1].bieuThucCons[j]);
        //                    m.bieuThucCons.push(P.bieuThucCons[in_2].bieuThucCons[i]);
        //                    m.toanTu = P.toanTu; 
        //                    builder.addBieuThucCon(m);  
        //                 }
        //                 P.bieuThucCons.splice(0,1); 
        //                 P.bieuThucCons.splice(1,1); 
        //                 P.bieuThucCons.push(builder.build());
        //                 return P;
        //             }
        //         }()
        //     )
        // );
    }
    duyetTapLuat(P) {
        for (let i = 0; i < this.tapLuat.length; i++) {
            let rs = this.tapLuat[i].run(P);
            if (rs !== null) {
                console.log(rs.id);
            }
        }
    }
}
exports.TapLuat = TapLuat;
