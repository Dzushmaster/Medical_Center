const {HAnalyse} = require('../Models/models')
const ApiError = require('../errors/ApiError')
const {validationResult} = require("express-validator");
const DEFAULT_VALUE = 0
class HAnalyseController{
    getPage(req, res){

    }
    //get all user analyses sorted by pages
    async create(req, res, next){
        try {
            const {id, pulse = DEFAULT_VALUE, temperature = DEFAULT_VALUE, blood_press = ' ', date} = req.body
            if (!id || !date) return next(ApiError.badRequest('Input date to analyse'))
            AnalyseValidation(pulse, temperature, blood_press)
            const hAnalyse = await HAnalyse.create({
                pulse: pulse,
                temperature: temperature,
                blood_press: blood_press,
                date: date,
                userId: id
            })
            if (!hAnalyse) return next(ApiError.internal("Can't add this analyse, check validation of data"))
            res.status(200).json(hAnalyse)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
    async update(req, res, next){
        try{
            const {id, pulse = DEFAULT_VALUE, temperature = DEFAULT_VALUE, blood_press = ' ', date} = req.body
            if (!id || !date) return next(ApiError.badRequest('Input date to analyse'))
            AnalyseValidation(pulse, temperature, blood_press)
            const hAnalyse = await HAnalyse.update({
                pulse:pulse,
                temperature:temperature,
                blood_press:blood_press,
                date:date
            },{
                where:{id: id}
            })
            if(!hAnalyse) return next(ApiError.internal("Can't update this analyse, try with valid data"))
            res.status(200).json(hAnalyse)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }

}
AnalyseValidation = (pulse, temperature, blood_press)=>{
    if(!Number.isInteger(pulse) || parseFloat(temperature) === NaN)
        throw "Invalid value of pulse or temperature"
    const MAX_PULSE = 250, MIN_PULSE = 40, MAX_TEMP = 44, MIN_TEMP = 33
    const regexBloodPress = /\d{2,3}[/]\d{2,3}/gm
    if(blood_press !== ' ' && !regexBloodPress.test(blood_press)) throw "Invalid value of blood_press"
    if(pulse >= MAX_PULSE || pulse <= MIN_PULSE)
        if (pulse !== DEFAULT_VALUE) throw "Invalid value of pulse"
    if(temperature > MAX_TEMP || temperature < MIN_TEMP)
        if(temperature !== DEFAULT_VALUE) throw "Invalid value of temperature"
}
module.exports = new HAnalyseController()