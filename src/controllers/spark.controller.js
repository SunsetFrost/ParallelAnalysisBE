const moment = require('moment');

/* 
 * @param { startTime,  时间戳
            currentTime, 
            totalNum, 
            speed }
 * @return { completeNum }
 */
exports.mockSpark = async (startTime, currentTime, totalNum, speed) => {
    const diff = Math.abs(moment(startTime).diff(moment(currentTime), 'seconds'));
    const completeNum = Math.floor(diff * speed);
    if(completeNum <= totalNum) {
        return completeNum;
    } else {
        return totalNum;
    }
}
