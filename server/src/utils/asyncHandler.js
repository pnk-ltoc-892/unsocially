//      Handling Methods :
//          1. Promises
//          2. try-catch


const asyncHandler = (requestHandler) => {
    // Execute and return fn, in form of promise
    return (req, res, next) => {
        Promise
        .resolve( requestHandler(req, res, next) )  // Execute Function
        .catch( (err) => next(err) )
    }
}

export {asyncHandler}


// Explore this code

// const asyncHandler = (fn) =>{ async () => {}}    // async () => {}: async function
// const asyncHandler = (fn) => async () => {}  // auto-return

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }