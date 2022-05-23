const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {User} = require('../Models/models')
const ApiError = require("../errors/ApiError")
const userService = require('../')
class UserController {
    async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    login: req.body.login
                }
            });
            if (!user) return next(ApiError.internal('invalid login'))
            if (! await bcrypt.compare(req.body.password, user.password)) return next(ApiError.internal('invalid password'))
            const accessToken = jwt.sign({id: user.id, login:user.login}, process.env.JWT_ACCESS_KEY, {expiresIn:'24h'})
            const refreshToken = jwt.sign({ip: req.socket.remoteAddress}, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
            res.cookie('refreshToken', refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
            return  res.status(200).json({accessToken, refreshToken, user})
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
    async register(req, res, next) {
        try {
            const error = validationResult(req)
            const {fullname, gender, birthdate, telenumber, email, login, password, rep_pass} = req.body
            if(!error.isEmpty()){
                return next(ApiError.badRequest('Invalid data in register: ', error.array()))
            }
            const candidate = await User.findOne({where:{login: login}})
            if(candidate) return next(ApiError.internal('User with this login has already created'))
            if(password != rep_pass) return next(ApiError.badRequest('Repeat password is not match with password'))
            const hashPassword = await bcrypt.hash(password, 4)
            const user = await User.create({
                fullname: fullname,
                gender: gender,
                birthdate: birthdate,
                telenumber: telenumber,
                email: email,
                login: login,
                password: hashPassword
            })
            return res.json(user)
        }catch (e){
            return next(ApiError.internal(e))
        }
    }
    async destroyUser(req, res, next){
        try{
            const {id} = req.body
            if(!id) return next(ApiError.badRequest('Id is not given'))
            const user = await User.destroy({
                where:{id: id}
            })
            if(!user) return next(ApiError.internal("Can find this user"))
            return res.json(user)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
    async check(req, res, next){
        const accessToken = jwt.sign({id: user.id, login:user.login}, process.env.JWT_ACCESS_KEY, {expiresIn:'24h'})
        return res.json({accessToken})
    }
}
module.exports = new UserController()