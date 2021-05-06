import * as express from 'express';
import { ToanTu } from '../BieuDienTriThuc/ChuongLogic/ThanhPhanOpts/ToanTuLogic';
import { ChuyenStringThanhBieuThuc } from '../BieuDienTriThuc/ChuongLogic/ThanhPhanFuncs/ChuyenStringThanhBieuThuc';
import { BaiTap } from '../BieuDienTriThuc/BaiTap/BaiTap';
import { MenhDeTuongDuong } from '../BieuDienTriThuc/BaiTap/BaiTap_Logic/MenhDeTuongDuong';

export  class Controller{
    public index(req:express.Request,res:express.Response){
        let toanTus:string[] =[];
        ToanTu.kyHieus.forEach(e=>{toanTus.push(e)});
        toanTus.push('(')
        toanTus.push(')')
        toanTus.push('\u2261')

        res.render('index.ejs',{toanTus:toanTus});
    }

    public notBai(req:express.Request,res:express.Response){
        let deBai:string  =   req.body.noidung;
        deBai = deBai.replace(new RegExp(' ','g'),'');

        let baiTap:BaiTap = new MenhDeTuongDuong(deBai);

        let loiGiai= baiTap.giai(); 
        // console.log(loiGiai.length);
        
        if(loiGiai === null || loiGiai === []){
            res.send(
                {
                    complete:false
                });
        }
            res.send({
                complete:true,
                loiGiai:loiGiai
            });
    }
}