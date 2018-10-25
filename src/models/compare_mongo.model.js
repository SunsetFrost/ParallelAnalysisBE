// const mongoose = require('mongoose');
// const setting = require('../setting');

// mongoose.Promise = global.Promise;
// const url = 'mongodb://' + setting.compare_db.ip + ':' + setting.compare_db.port + '/' + setting.compare_db.name;

// mongoose.connect(url);

// class CmpMongooseBase {
//     constructor(collName, schema) {
//         this.schema = new mongoose.Schema(schema, {
//             collection: collName
//         });
//         this.model = mongoose.model(collName, this.schema);
//     }

//     find(where) {
//         return new Promise((resolve, reject) => {
//             this.model.find(where, (err, rst) => {
//                 if(err) {
//                     return reject(err);
//                 } else {
//                     return resolve(rst);
//                 }
//             });
//         });
//     }

//     remove(where) {
//         return new Promise((resolve, reject) => {
//             this.model.remove(where, err => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve();
//                 }
//             });
//         });
//     }

//     insert(item) {
//         const model = new this.model(item);
//         return new Promise((resolve, reject) => {
//             model.save((err, rst) => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve(rst._doc);
//                 }
//             });
//         });
//     }

//     update(where, update) {
//         return new Promise((resolve, reject) => {
//             this.model.update(where, update, (err, rst) => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve(rst);
//                 }
//             });
//         });
//     }
// }

// module.exports = CmpMongooseBase;