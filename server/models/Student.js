const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  roll_no: {type: String, required: true},
  degree: {type: String, required: true},
  city: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

const StudentModel = new mongoose.model('Student', UserSchema)

exports.Student = StudentModel;
