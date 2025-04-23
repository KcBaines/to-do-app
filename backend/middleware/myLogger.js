
const loggerMiddleware = function (req, res, next) {
    console.log('MIDDLEWARE LOGGED')

    next()
}

// Here we export middleware functions to be used in "routes/myLoggerRoute.js"
module.exports = {
    loggerMiddleware,
    //another middleware can be placed here
};