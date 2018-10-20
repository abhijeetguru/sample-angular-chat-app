var NameSpaceProcessor = require('./NameSpaceProcessor');
var ResponseProcessor = require('../Response/ResponseProcessor');

module.exports = function(){
    this.processChat = function(messageObj){
        NameSpaceProcessor.getNameSpaceforUser(messageObj.to).emit('chat',messageObj);
        return new ResponseProcessor().createSuccess('Message Sent.');
    }
}