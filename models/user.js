const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    googleId: String
})

const User = mongoose.model('user', userSchema);
module.exports = User;