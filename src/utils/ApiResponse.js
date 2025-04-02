class ApiResponse{
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode<400 // if koi error h toh API error ke through jaye.
    }
}

// 500-599 Server not response.

// 400-499 Client error responses.

//redirection messages 300-399

//Successfull responses 200-299

//informational responses-100-199

