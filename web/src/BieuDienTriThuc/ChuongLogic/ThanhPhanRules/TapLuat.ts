import { Luat } from './Luat';
import { ILuat } from './ILuat';
import { BieuThucMenhDe } from '../ThanhPhanC/BieuThucMenhDe';
import { ToanTu } from '../ThanhPhanOpts/ToanTuLogic';
import { ToanTuFactory } from '../ThanhPhanOpts/ToanTuFactory';
import { BieuThucBuilder } from '../ThanhPhanC/BieuThucBuilder';
import { Helper } from '../ThanhPhanFuncs/Helper';
export class TapLuat {
    private tapLuat: Luat[];
    constructor() {
        this.tapLuat = [];
        this.xayDungTapLuat();
    }

    xayDungTapLuat() {
        /// LUAT PHEP TUONG DUONG
        this.tapLuat.push(
            new Luat(1,"Luat phep tuong duong", new class implements ILuat {
                boKiemTra(P: BieuThucMenhDe): BieuThucMenhDe|null {
                    if(P.toanTu.tenToanTu === ToanTu.TUONG_DUONG)
                         return P;
                    return null;
                }
                ketQua(P: BieuThucMenhDe): BieuThucMenhDe {
                    let left:BieuThucMenhDe = P.bieuThucCons[0];
                    let right:BieuThucMenhDe = P.bieuThucCons[1];

                    let S: BieuThucMenhDe = new BieuThucBuilder()
                                                .addBieuThucCon(left)
                                                .addBieuThucCon(right)
                                                .addToanTu(ToanTu.KEO_THEO)
                                                .addCha(P)
                                                .build();

                    let R: BieuThucMenhDe = new BieuThucBuilder()
                                                .addBieuThucCon(right)
                                                .addBieuThucCon(left)
                                                .addToanTu(ToanTu.KEO_THEO)
                                                .addCha(P)
                                                .build();

                    let rs: BieuThucMenhDe = new BieuThucBuilder()
                                                .addBieuThucCon(S)
                                                .addBieuThucCon(R)
                                                .addToanTu(ToanTu.HOI)
                                                .addCha(P.cha)
                                                .build();
                    return rs;
                }
            }())
        );
        /// LUAT PHEP KEO THEO
        this.tapLuat.push(
            new Luat(2,"Luat phep keo theo", new class implements ILuat{
                boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                    if(P.toanTu.tenToanTu === ToanTu.KEO_THEO)
                          return P;
                    return null;
                }
                ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
                    let left:BieuThucMenhDe = P.bieuThucCons[0];
                    let right:BieuThucMenhDe = P.bieuThucCons[1];
                    
                    let rs: BieuThucMenhDe = 
                    new BieuThucBuilder().addBieuThucCon(Helper.PHU_DINH_MENH_DE(left))
                                        .addBieuThucCon(right)
                                        .addToanTu(ToanTu.TUYEN)
                                        .addCha(P.cha)
                                        .build();
                    return rs; 
                }
            }())
        );

        /// LUAT DONG NHAT
        this.tapLuat.push(
            new Luat(3,
            "Luat dong nhat",
            new class implements ILuat{
                boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                    if (P.toanTu.tenToanTu === ToanTu.TUYEN&& P.id.includes(BieuThucMenhDe.MA_HANG_SAI))
                        return new BieuThucBuilder().addBieuThucCon(P.bieuThucCons[0])
                                                    .addBieuThucCon(Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe.MA_HANG_SAI))
                                                    .addCha(P.cha)
                                                    .addToanTu(P.toanTu.tenToanTu)
                                                    .build();
                    return null;
                }
                ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
                    /// B1: LOAI BO HANG SAI
                    let index= P.bieuThucCons.findIndex(element=>element.id===BieuThucMenhDe.MA_HANG_SAI);
                    P.bieuThucCons.splice(index,1);
                    /// B2: NEU MENH DE CHI CON 1 BIEU THUC CON, MENH DE TRO THANH MENH DE SO CAP

                    
                    if(P.bieuThucCons.length === 1)
                        P = Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id,P);
                    
                    return P;
                }
            }()
        ));

        /// LUAT DONG NHAT
        this.tapLuat.push(
            new Luat(3,
            "Luat dong nhat",
            new class implements ILuat{
                boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                    if (P.toanTu.tenToanTu === ToanTu.HOI&& P.id.includes(BieuThucMenhDe.MA_HANG_DUNG))
                        return new BieuThucBuilder().addBieuThucCon(P.bieuThucCons[0])
                                                    .addBieuThucCon(Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe.MA_HANG_DUNG))
                                                    .addCha(P.cha)
                                                    .addToanTu(P.toanTu.tenToanTu)
                                                    .build();
                    return null;
                }
                ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
                    /// B1: LOAI BO HANG SAI
                    let index= P.bieuThucCons.findIndex(element=>element.id===BieuThucMenhDe.MA_HANG_DUNG);
                    P.bieuThucCons.splice(index,1);
                    /// B2: NEU MENH DE CHI CON 1 BIEU THUC CON, MENH DE TRO THANH MENH DE SO CAP
                    
                    if(P.bieuThucCons.length === 1)
                        P = Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id,P);
                    
                    return P;
                }
            }()
        ));

        /// LUAT NUOT
        this.tapLuat.push(
            new Luat(4,
                'Luat nuot',
                new class implements ILuat{
                    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                        if(P.toanTu.tenToanTu === ToanTu.HOI && P.id.includes(BieuThucMenhDe.MA_HANG_SAI)){
                            return P;
                        }
                        return null
                    }
                    ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
                        return Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(BieuThucMenhDe.MA_HANG_SAI,P);  
                    }
                }()
            )
        );

        /// LUAT NUOT
        this.tapLuat.push(
            new Luat(4,
                'Luat nuot',
                new class implements ILuat{
                    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                        if (P.toanTu.tenToanTu === ToanTu.TUYEN && P.id.includes(BieuThucMenhDe.MA_HANG_DUNG))
                        return P;
                        return null;
                    }
                    ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
                        return Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(BieuThucMenhDe.MA_HANG_DUNG,P); 
                    }
                }()
            )
        );

        /// LUAT LUY DANG
        this.tapLuat.push(
            new Luat(5,
                'Luat luy dang',
                new class implements ILuat{
                    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                        let ktTrung:boolean = false;
                        let i:number=-1;
                        let j:number= -1;
                        for(i=0;i<P.bieuThucCons.length;i++){
                            for(j=0;j<P.bieuThucCons.length;j++){
                                if(i===j)continue;
                                if(P.bieuThucCons[i].id === P.bieuThucCons[j].id ){
                                    ktTrung = true;
                                    break;
                                }
                            }
                            if(ktTrung)break;
                        }
                        if ((P.toanTu.tenToanTu === ToanTu.HOI || P.toanTu.tenToanTu === ToanTu.TUYEN) && ktTrung)   {
                            return new BieuThucBuilder().addBieuThucCon2(P.bieuThucCons[i])
                                                        .addBieuThucCon2(P.bieuThucCons[i])
                                                        .addToanTu(P.toanTu.tenToanTu)
                                                        .build(); 
                        }
                        return null;

                    }
                    ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
                       let i:number = 0;
                       
                       i = P.bieuThucCons.findIndex(e=>e.id = con.id);

                       P.bieuThucCons.splice(i,1);
                       if(P.bieuThucCons.length==1){
                           P =Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id,P); 
                       }
                       return P;  
                    }
                }()
            )
        )

        ///Luat Phu dinh kep
        this.tapLuat.push(
            new Luat(6,
                'Luat phu dinh kep',
                new class implements ILuat{
                    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                        if(P.toanTu.tenToanTu === ToanTu.PHU_DINH && P.bieuThucCons[0].toanTu.tenToanTu == ToanTu.PHU_DINH )
                           return P;
                        return null;
                    }
                    ketQua(P:BieuThucMenhDe):BieuThucMenhDe{
                       let rs:BieuThucMenhDe= new BieuThucBuilder().addBieuThucCon(P.bieuThucCons[0].bieuThucCons[0])
                                                   .addToanTu(P.bieuThucCons[0].bieuThucCons[0].toanTu.tenToanTu)
                                                   .addCha(P.cha)
                                                   .build();
                        return Helper.CHUYEN_CAP(rs.bieuThucCons[0],rs);

                    }
                }()
            )
        );

        /// LUAT PHAN TU BU
        this.tapLuat.push(
            new Luat(7,
                'Luat phan tu bu',
                new class implements ILuat{
                    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                        let ktTrung:boolean = false;
                        let i:number=-1;
                        let j:number= -1;
                        
                        for(i=0;i<P.bieuThucCons.length;i++){
                            for(j=0;j<P.bieuThucCons.length;j++){
                                if(i===j)continue;
                                if(P.bieuThucCons[i].id === Helper.PHU_DINH_MENH_DE(Helper.SAO_CHEP(P.bieuThucCons[j])).id ){
                                    ktTrung = true;
                                    break;
                                }
                            }
                            if(ktTrung)break;
                        }
                       
                        let kt = P.toanTu.tenToanTu === ToanTu.TUYEN ||  P.toanTu.tenToanTu === ToanTu.HOI;
                        if(kt&&ktTrung){
                            return  new BieuThucBuilder().addBieuThucCon(P.bieuThucCons[i])
                                                       .addBieuThucCon(P.bieuThucCons[j])
                                                       .addToanTu(P.toanTu.tenToanTu)
                                                       .build(); 
                            
                        }
                        return null;
                    }
                    ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
                        let index: number = P.bieuThucCons.findIndex(ele =>  ele.id == con.bieuThucCons[0].id );
                        P.bieuThucCons.splice(index, 1);
                        index = P.bieuThucCons.findIndex(ele =>  ele.id == con.bieuThucCons[1].id );
                        P.bieuThucCons.splice(index, 1);
                       

                        if(con.toanTu.tenToanTu === ToanTu.HOI)P.bieuThucCons.push(Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe.MA_HANG_SAI));
                        else P.bieuThucCons.push(Helper.BIEU_THUC_SO_CAP(BieuThucMenhDe.MA_HANG_DUNG));
                        if( P.bieuThucCons.length == 0 )
                            P.toanTu = new ToanTuFactory().create(ToanTu.NONE);
                        return P;
                    }
                }()
            )
        )
       
        //Luat hap thu
        this.tapLuat.push(
            new Luat(8,
                'Luat hap thu',
                new class implements ILuat{
                    boKiemTra(P:BieuThucMenhDe):BieuThucMenhDe|null{
                        let i:number=0;
                        let j:number=0;
                        let kt:boolean = false;
                        for (i = 0; i < P.bieuThucCons.length; i++) {
                          for(j = 0;j < P.bieuThucCons.length;j++){
                            if(i===j)continue;   
                            if(Helper.IS_BIEU_THUC_SO_CAP(P.bieuThucCons[j]))continue;
                            if(P.bieuThucCons[j].bieuThucCons.length==1)continue;
                            if(P.bieuThucCons[j].bieuThucCons[0].id === P.bieuThucCons[i].id || P.bieuThucCons[j].bieuThucCons[1].id === P.bieuThucCons[i].id){
                                kt=true;
                                break;
                            }
                          }
                          if(kt)break;
                        }
                        console.log(`${i} ${j}`);
                        if(kt)
                        if(P.bieuThucCons[j].toanTu.tenToanTu !== P.toanTu.tenToanTu){
                               return new BieuThucBuilder().addBieuThucCon(P.bieuThucCons[i])
                                                           .addBieuThucCon(P.bieuThucCons[j])
                                                           .addToanTu(P.toanTu.tenToanTu)
                                                           .build();
                               
                           }
                        return null;
                    }
                    ketQua(P:BieuThucMenhDe,con:BieuThucMenhDe):BieuThucMenhDe{
                        let index:number = 0;
                        
                        index = P.bieuThucCons.findIndex(ele=>ele.id === con.bieuThucCons[1].id);
                        P.bieuThucCons.splice(index,1);
                        if(P.bieuThucCons.length==1){
                            P = Helper.BIEUTHUCSOCAP_TU_BIEUTHUC(P.bieuThucCons[0].id,P);
                        }
                        return P;
                    }
                }()
            )
        )
        
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
    

    duyetTapLuat(P:BieuThucMenhDe) {
        for(let i:number=0;i<this.tapLuat.length;i++){
            let rs:BieuThucMenhDe|null= this.tapLuat[i].run(P);
            if(rs !== null){ 
                 console.log(rs.id);
            }
        }   
    }

}