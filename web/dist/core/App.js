"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const MenhDeTuongDuong_1 = require("../BaiTap/BaiTap_Logic/MenhDeTuongDuong");
const BieuThucMenhDe_1 = require("../BieuDienTriThuc/ChuongLogic/ThanhPhanC/BieuThucMenhDe");
class App {
    // constructor(port: Number) {
    //     this.app = express();
    //     this.port = port;
    //     this.bai = new MenhDeTuongDuong('');
    // }
    constructor() {
        // this.app = express();
        // this.port = port;
        this.bai = new MenhDeTuongDuong_1.MenhDeTuongDuong('');
    }
    // async run() {
    //     await this.app.listen(this.port);
    //     console.log(`SERVER DANG CHAY O PORT ${this.port}`); 
    //     this.bai.giai(new BieuThucMenhDe());
    // }
    chay() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bai.giai(new BieuThucMenhDe_1.BieuThucMenhDe());
        });
    }
}
exports.App = App;
