import mongoose from "mongoose";
const Schema = mongoose.Schema;

const netSchema = new Schema({
    name: { type: String, isRequired: true },
    ip: { type: String, isRequired: true },
    type: { type: String, isRequired: true }, //公网 局域网
    pcs: [
        {
            hostname: { type: String, isRequired: true },
            ip: { type: String, isRequired: true },
            cpu: Number,
            mem: Number,
            join_time: { type: Number, default: Date.parse(new Date()) },
            status: { type: Number, isRequired: true, default: 0 }
        }
    ],
    create_time: { type: Number, default: Date.parse(new Date()) },
    status: { type: Number, isRequired: true, default: 0 }, //0 未认证  1 可用   2 断开   3 不可用
    desc: String
});

const Net = mongoose.model("Net", netSchema, "Net");

export default Net;
