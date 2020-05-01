const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    emoji: {type: String, required: true},
    content: {type: String, required: true},
    datePosted: {type: Date},
});

const rPost = mongoose.model('rPost', postSchema);
module.exports = rPost;