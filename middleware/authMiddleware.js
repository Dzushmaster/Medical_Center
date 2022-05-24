const ApiError = require("../errors/ApiError")
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next){
    if(req.method === 'OPTIONS')
        next()
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return next(ApiError.unauthorized('Не авторизован'))
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
        req.user = decoded
        next()
    }catch(e){
        return next(ApiError.unauthorized('Не авторизован'))
    }
}