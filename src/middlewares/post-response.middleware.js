import chalk from "chalk";

function postMid(app) {
    // unify response
    // app.use((req, res, next) => {
    //     console.log(res.locals);
    //     if (res.locals.succeed === true) {
    //         const resData = ResponseModel;
    //         resData.href = req.originalUrl;
    //         resData.token = res.locals.token;
    //         resData.username = res.locals.username;
    //         resData.status = {
    //             code: '200',
    //             desc: 'succeed'
    //         };
    //         resData.data = res.locals.resData;
    //         resData.template = res.locals.template;
    //         return res.json(resData);
    //     } else {
    //         return next();
    //     }
    // });

    app.use((err, req, res, next) => {
        const err_obj = JSON.parse(err.message);
        console.log(chalk.redBright(err.message));
        res.status(err_obj.status).send({
            type: err_obj.type,
            message: err_obj.message
        });
    });
}

export default postMid;
