var server = require('../Servers/Server');
var authFilter = require('../Filters/AuthFilter');
var ChatProcessor = require('../Processor/Chat/ChatProcessor');
var router = server.express.Router();

router.use(authFilter);

router.post('/sendMessage', function(req, res, next){
    if(req.body.ChatSnippet){
        res.statusCode=200;
        res.send(new ChatProcessor().processChat(req.body.ChatSnippet));
    }else{
        res.statusCode = 500;
        res.send("Oops! Someting went wrong.");
    }
});

module.exports = router;