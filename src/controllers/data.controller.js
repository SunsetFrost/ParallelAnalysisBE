const fs = require('fs');

const setting = require('../setting');

async function download(msrId, eventId) {
    try {
        const filePath = `${setting.data_path.IBIS}\\1_proced.csv`;
        const fname = '1_proced.csv';
        const stream = fs.createReadStream(filePath);
        const downObj = {
            stream: stream,
            fname: fname
        }

        return downObj;
    } catch (error) {
        console.log(error);
        return false;
    }



}

module.exports.download = download;