module.exports = function(){
    var response = {
        Header:{
            Response:{
                Error : {
                    Code: 0,
                    Message: ''
                },
                Success : {
                    Message : ''
                }
            }
        },
    }
    this.createError = function(code, message){
        response.Header.Response.Success = undefined;
        response.Header.Response.Error.Code = code;
        response.Header.Response.Error.Message = message;
        return response;
    }
    this.createSuccess = function(message){
        response.Header.Response.Success.Message = message;
        response.Header.Response.Error = undefined;
        return response;
    }
    this.createBody = function(bodyHeader,bodyData){
        response[bodyHeader] = bodyData;
        return response;
    }
}