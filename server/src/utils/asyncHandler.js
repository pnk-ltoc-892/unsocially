
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve( requestHandler(req, res, next) )  // Execute Function
        .catch( (err) => next(err) )
    }
}

export {asyncHandler}