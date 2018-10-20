var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    mobile : {type: String, required: true, unique: true},
    image : String,
    description : String
});

var User = mongoose.model('Users', userSchema);

module.exports = User;