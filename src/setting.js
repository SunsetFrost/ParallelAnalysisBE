const setting = {
    app: {
        name: 'ParallelBE',
    },
    port: '9315',
    mesos: {
        ip: 'http://172.21.213.110',
        port: '5050',
    },
    front: {
        ip: '127.0.0.1',
        port: '9035'
    },
    compare_server: {

    },
    compare_db: {
        name: 'Comparison',
        ip: '223.2.44.234',
        port: '27017'
    },
    mongodb: {
        name: 'ParallelCarbonModel',
        host: '127.0.0.1',
        port: '27017'
    },
    data_path: {
        LPJ: '/home/bowen/LPJ',
        IBIS: 'D:\\Program\\ZhongShanModel\\DataSun'
    }
}

module.exports = setting;