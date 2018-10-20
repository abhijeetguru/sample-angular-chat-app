var server = require('../Servers/Server');
var signupprocessor = require('../Processor/UserManagment/SignUpProcessor');
var loginprocessor = require('../Processor/UserManagment/LoginProcessor');
var responssprocessor = require('../Processor/Response/ResponseProcessor');
var router = server.express.Router();
var User =require('../Models/User');

router.post('/login', async function (req, res, next) {
    var data = req.headers.authorization;
    if (data && data.startsWith('Basic ')) {
       var response = await new loginprocessor().login(data.slice(6, data.length));
       res.statusCode = 200;
       res.send(response);
    }
});

router.post('/signup', function (req, res, next) {
    var data = req.headers.authorization;
    if (data && data.startsWith('Basic ')) {
        new signupprocessor().signup(data.slice(6, data.length),function(err){
            if(err){
                res.statusCode = 401;
                res.send(new responssprocessor().createError(401, err.message));
            }else{
                res.statusCode = 200;
                res.send(new responssprocessor().createSuccess('Registration Successful.'));
            }
        });
    } else {
        res.statusCode = 500;
        res.send(new responssprocessor().createError(500, 'Opps! Someting went wrong.'));
    }
});

router.get('/isLoggedIn', function (req, res, next) {

});

module.exports = router;