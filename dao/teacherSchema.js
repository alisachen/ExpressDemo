var mongoose = require('mongoose');

var teacherSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    sid: Number,
});

var Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;