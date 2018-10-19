chatApp.controller("HomeController",['$scope','$http',function($scope,$http){
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
            from : $scope.user.name,
            to : $scope.toInp,
            message : $scope.msg
        }
        $http.post('http://localhost:3020/chats/sendMessage', objectToSend).then(function(){
            console.log('Success');
        });
    }
    $scope.msg = 'Hello World, My angular app is working.';
    $scope.signIn = function(){
        console.log('%cUser: %s', 'color:red', $scope.userName);
        socket.emit('userlogin', {name : $scope.userName});
        $scope.user={
            name : $scope.userName,
            socket : io('/'+$scope.userName)
        }
        $scope.user.socket.on('chat', processResponse);
    }
}]);