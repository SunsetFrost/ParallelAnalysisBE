const setting = {
    app: {
        name: 'ParallelBE',
    },
    port: '9315',
    mesos_ip: 'http://172.21.213.110',
    mesos_port: '5050',
    front_port: '9035',
    mongodb: {
        name: 'ParallelCarbonModel',
        host: '127.0.0.1',
        port: '27017'
    }
}

module.exports = setting;