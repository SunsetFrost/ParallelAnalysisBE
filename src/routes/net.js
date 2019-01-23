import express from "express";
import Net from "../controllers/net";

const router = express.Router();

router.get("/", async (req, res, next) => {
    const param = req.query;
    const nets = await Net.getNetsByParam(param);
    res.status(200).send({
        data: nets
    });
});

router.post("/", async (req, res, next) => {
    const newNet = req.body.data;
    const data = await Net.addNet(newNet);
    res.status(201).send({
        message: "创建网络任务成功",
        type: "SUCCESS",
        data
    });
});

router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    const net = await Net.getNetById(id);
    res.status(200).send({
        message: "获取网络成功",
        data: net
    });
});

router.put("/:id", async (req, res, next) => {
    const newNet = req.body.data;
    await Net.updateNet(newNet);
    res.status(200).send({
        message: "更新网络任务成功"
    });
});

router.post("/:id/pc", async (req, res, next) => {
    const { id, pc } = req.body.data;
    const data = await Net.addPc(id, pc);
    res.status(200).send({
        success: "创建PC成功",
        data
    });
});

router.put("/:id/pc/:id", async (req, res, next) => {
    // const { id, pc } = req.body.data;
    // const data = await Net.updatePc(id, pc);
    // res.send({
    //     status: 200,
    //     data
    // });
});

export default router;
