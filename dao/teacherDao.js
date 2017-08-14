var Teacher = require('./teacherSchema.js');
var conf = require('../conf/db.js');
mongo = require('mongodb').MongoClient;

var mongoTeacher = mongo.connect(conf.mongo.connectionString);

console.log('connect')

module.exports = {
    add: function (req, res, next) {
        var param = req.query || req.params;
        mongoTeacher.then(db => {
            db.collection('Teacher').insertOne({
                id: param.id,
                name: param.name,
                age: param.age,
                sid: param.sid
            }, function (err, result) {
                if (err) {
                    throw new Error('Error:Add Teacher');
                } else {
                    res.json(result);
                }
            });
        })
    },
    delete: function (req, res, next) {
        var name = req.query.name;
        mongoTeacher.then(db => {
            db.collection('Teacher').deleteOne({
                name: name,
            }, function (err, result) {
                if (err) {
                    throw new Error('Error:Delete Teacher');
                } else {
                    res.json(result);
                }
            });
        })
    },
    update: function (req, res, next) {

        mongoTeacher.then(db => {
            db.collection('Teacher').updateOne(
                {
                    name: name,
                }, function (err, result) {
                    if (err) {
                        throw new Error('Error:Add user');
                    } else {
                        res.json(result);
                    }
                });
        })
    },
    queryByNameCB: function (req, res, callback) {
        var name = req.query.name;
        mongoTeacher.then(db => {          
            db.collection('Teacher').find({ "name": name }, { "sid": 1, "_id": 0}).toArray(function(err, results){
                if(err){
                    throw new Error('Error: query by name');
                }else{
                    // console.log(results);
                    // res.json(results);
                    callback(results);
                }             
            });
        });
    },

     queryByName: function (req, res, next) {
        var name = req.query.name;
        mongoTeacher.then(db => {          
            db.collection('Teacher').find({ "name": name }, { "sid": 1, "_id": 0}).toArray(function(err, results){
                if(err){
                    throw new Error('Error: query by name');
                }else{
                    // console.log(results);
                    res.json(results);
                }             
            });
        });
    },

     queryBySid: function (req, res, next) {
        var sid = req.query.sid.toString();
        console.log(sid);
        mongoTeacher.then(db => {          
            db.collection('Teacher').find({ "sid": sid }, {"name": 1, "_id": 0}).toArray(function(err, results){
                if(err){
                    throw new Error('Error: query by name');
                }else{
                    // console.log(results);
                    res.json(results);
                }             
            });
        });
    }
};
