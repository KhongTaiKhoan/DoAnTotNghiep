import express from "express"
import { BaiTap } from '../BaiTap/BaiTap';
import { MenhDeTuongDuong } from '../BaiTap/BaiTap_Logic/MenhDeTuongDuong';
import { BieuThucMenhDe } from "../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe";


class App {
    // private app: express.Application;
    // private port: Number;
    private bai: BaiTap;
    // constructor(port: Number) {
    //     this.app = express();
    //     this.port = port;
    //     this.bai = new MenhDeTuongDuong('');
    // }
 
    constructor() {
       // this.app = express();
       // this.port = port;
        this.bai = new MenhDeTuongDuong('');
    }

    // async run() {
    //     await this.app.listen(this.port);
    //     console.log(`SERVER DANG CHAY O PORT ${this.port}`); 
    //     this.bai.giai(new BieuThucMenhDe());
    // }

    async chay(){
        this.bai.giai(new BieuThucMenhDe());
    }
}

export { App };