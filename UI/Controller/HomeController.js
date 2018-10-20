chatApp
.value('TOKEN',{
    basic : '',
    bearer : ''
})
.factory('httpInterceptor', ['TOKEN',function(TOKEN){
    return{
        request: function(config) {
            if(config.url.indexOf('/login') > -1) {
              config.headers['Authorization'] = 'Basic '+TOKEN.basic;
              config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }else{
                config.headers['Authorization'] = 'Bearer '+TOKEN.bearer;
            }
            return config;
        }
    }
}])
.config(function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
})
.controller("HomeController",['$scope','$http','TOKEN',function($scope,$http,TOKEN){
    /* socket.on('chat', function(chatObj){
        console.log("Chat From: " + chatObj.from + ' Message: ' + chatObj.message);
        processResponse(chatObj);
    }); */
    function processResponse(chatObj){
        $scope.$apply(function(){
           if($scope.messageList == undefined){
            $scope.messageList = [chatObj];
           }else{
            $scope.messageList.push(chatObj);
           }
        }); 
    }
    $scope.sendMsg = function(){
        var objectToSend = {
            Header:{
                Username:$scope.user.name
            },
            ChatSnippet:{
                from : $scope.user.name,
                to : $scope.toInp,
                message : $scope.msg
            }
        }
        $http.post('http://localhost:3020/chats/sendMessage', objectToSend).then(function(){
            console.log('Success');
        });
    }
    $scope.msg = 'Hello World, My angular app is working.';
    $scope.signIn = function(){
        console.log('%cUser: %s', 'color:red', $scope.userName);
        TOKEN.basic = btoa($scope.userName+':'+$scope.password);
        $http.post('http://localhost:3020/user/login', '').then(function(result){
            console.log('Token : '+result.data.Login.token);
            TOKEN.bearer = result.data.Login.token;
            $scope.user={
                name : $scope.userName,
                socket : io('/'+$scope.userName)
            }
            $scope.user.socket.on('chat', processResponse);
        });
    }
}]);