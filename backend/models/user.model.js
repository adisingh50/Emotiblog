const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true, default: ''},
    lastName: {type: String, required: true, default: ''},
    email: {type: String, required: true, default: ''},
    password: {type: String, required: true, default: ''}
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;