import {App} from "./core/App";
import * as config from "dotenv";

import { XacDinhTinhChatQuanHe } from "./BieuDienTriThuc/QuanHeHaiNgoi/ThanhPhanFuncs/XacDinhTinhChatQuanHe";


// config.config();
// let port:Number  = Number( process.env.PORT) || 4300;


// let app = new App(port);
// app.run();

let xacDinh = new XacDinhTinhChatQuanHe();
// console.log(bt.id);
xacDinh.giai();

