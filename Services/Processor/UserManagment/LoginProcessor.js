var User = require('../../Models/User');
var responseprocessor = require('../Response/ResponseProcessor');
var authenticationprocessor = require('../Authentication/AuthenticationProcessor');
var NameSpaceProcessor = require('../Chat/NameSpaceProcessor');
var atob = require('atob');
var bcrypt = require('bcrypt');
const async_hooks = require('async_hooks');

module.exports = function(){
    this.login = async function(details,next){
        var responseObj = new responseprocessor();
        details = atob(details).split(':');
        var user = await User.findOne({userid : details[0]}).exec();
        var response = await new Promise(function(resolve, reject){
            bcrypt.compare(details[1], user.password, function(err, result){
                if(!result){
                    response = responseObj.createError('UM002', 'Invalid credentials.');
                    resolve(response);
                }else{
                    response = responseObj.createSuccess('Your are authenticated.');
                    response = responseObj.createBody('Login', {
                        token : new authenticationprocessor().createToken(details[0])
                    });
                    NameSpaceProcessor.createNameSpace(details[0]);
                    resolve(response);
                }
            });
        });
       return response;
    } 
}