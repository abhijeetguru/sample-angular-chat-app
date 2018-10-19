/* var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); */
var server = require('./Services/Servers/Server');
var chatrouter = require('./Services/Routes/ChatRoute');
var bodyparser = require('body-parser');

server.app.use(bodyparser.json());
server.app.use('/',server.express.static("UI"));
server.app.use('/chats',chatrouter);

var listner = server.http.listen(3020,function(){
    console.log('Listening to: '+ listner.address().port);
});