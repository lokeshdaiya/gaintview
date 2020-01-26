const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true} ,
    email: {type: String, unique: true, required: "Email is required"},
    role: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

UserModel = mongoose.model('User', UserSchema);

exports.User = UserModel;
