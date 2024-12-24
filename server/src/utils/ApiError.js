
// Using Nodejs Error-Class
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],  // Array of multiple Errors
        stack = ""   // Error Stack
    ){
        // Overwrite Things
        super(message)
        this.statusCode = statusCode
        this.data = null    // Explore
        this.message = message
        this.success = false    // as apierror, handles not api response
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}