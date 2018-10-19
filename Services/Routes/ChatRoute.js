var server = require('../Servers/Server');
var router = server.express.Router();

var namespacearray = [];
router.get('/getChat', function(req,response, next){
    var chatObj = {
        'from':'Abhijeet',
        'message':'Hello World'
    };
    response.send(chatObj);
    server.io.emit('chat',chatObj);
});

router.post('/sendMessage', function(req,response, next){
    var msgFor = req.body.to;
    if(namespacearray[msgFor]!=undefined){
        namespacearray[msgFor].emit('chat',req.body);
    }
});

server.io.on('connection', function(socket){
    console.log('user connected');
    socket.on('userlogin',function(data){
        createNameSpace(data);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

function createNameSpace(data){
    var namespace = server.io.of('/'+data.name);
    namespacearray[data.name] = namespace;
    namespace.on('connection', function(socket){
        console.log('%c User '+data.name+' connected', 'color:red;');
    });
};

module.exports = router;