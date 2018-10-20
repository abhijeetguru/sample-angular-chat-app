var server = require('../../Servers/Server');
var nameSpaceProcessor = (function () {
    var namespacearray=[];
    var namespace;
    var instance;
    function init() {
        if (instance == null) {
            instance = this;
            namespacearray = [];
        }
        return instance;
    }
    function setNameSpace(username) {
        namespace = server.io.of('/' + username);
        namespacearray[username] = namespace;
        namespace.on('connection', function (socket) {
            console.log('User: '+username+' is online.')
        });
    }
    function getNameSpace(){
        return namespacearray;
    }
    return{
        getInstance : function(){
            return init();
        },
        createNameSpace : function(username){
            setNameSpace(username);
        },
        getNameSpaceforUser : function(username){
            return getNameSpace()[username];
        },
        getAllNameSpace : function(){
            return getNameSpace();
        }
    }
})();
module.exports = nameSpaceProcessor;