/* var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); */
var server = require('./Services/Servers/Server');
var chatrouter = require('./Services/Routes/ChatRoute');
var usermgmtrouter = require('./Services/Routes/UserManagmentRoutes');
var bodyparser = require('body-parser');
var applicationproperties = require('./Services/Resources/application-properties');
var mongoose = require('mongoose');
mongoose.connect(applicationproperties.database.url).then(()=>{
    console.log('database connected');
});


server.app.use(bodyparser.json());
server.app.use(bodyparser.urlencoded({extended : true}));
server.app.use('/',server.express.static("UI"));
server.app.use('/chats',chatrouter);
server.app.use('/user', usermgmtrouter);

var listner = server.http.listen(3020,function(){
    console.log('Listening to: '+ listner.address().port);
});