var User = require('../../Models/User');
var mongoose = require('mongoose');
var atob = require('atob');
var bcrypt = require('bcrypt');

module.exports = function () {
    this.signup = function (signupdetails,callback) {
        var data = atob(signupdetails).split(':');
        var response;
        const user = new User({
            _id: new  mongoose.Types.ObjectId(),
            userid: data[0],
            password: data[1],
            name: data[2],
            email: data[3],
            mobile: data[4],
            image: 'abc.jpeg',
            description: 'Describe yourself.'
        });
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
                user.password = hash;
                user.save(callback);
            });
        }); 
    }
}