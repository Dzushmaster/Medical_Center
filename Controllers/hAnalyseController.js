const {HAnalyse} = require('../Models/models')
const ApiError = require('../errors/ApiError')
const {toInt} = require("validator");
const DEFAULT_VALUE = 0
class HAnalyseController{
    getPage(req, res){

    }
    async create(req, res, next){
        try {
            const {id, pulse, temperature, blood_press = '', date} = req.body
            if(!id) return next(ApiError.unauthorized('Login before send analyses'))
            if (!date) return next(ApiError.badRequest('Input date to analyse'))
            let findValue = await HAnalyse.findOne({where:{userId: id, date:date}})
            AnalyseValidation(pulse, temperature, blood_press)
            let hAnalyse
            if(findValue) {
                findValue = setUser(pulse, temperature, blood_press, findValue)
                hAnalyse = await HAnalyse.update({
                    pulse: findValue.pulse,
                    temperature: findValue.temperature,
                    blood_press: findValue.blood_press,
                }, {
                    where: {userId: id}
                })
            }
            else {
                hAnalyse = await HAnalyse.create({
                    pulse: pulse,
                    temperature: temperature,
                    blood_press: blood_press,
                    date: date,
                    userId: id
                })
            }
            if (!hAnalyse) return next(ApiError.internal("Can't add this analyse, check validation of data"))
            res.status(200).json(hAnalyse)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }


}
setUser = (pulse, temperature, blood_press, findValue)=>{
    if(pulse !== '') findValue.pulse = pulse
    if(temperature !== '') findValue.temperature = temperature
    if(blood_press !== '')  findValue.blood_press = blood_press
return findValue
}
AnalyseValidation = (pulse, temperature, blood_press)=>{
    const MAX_PULSE = 250, MIN_PULSE = 40, MAX_TEMP = 44, MIN_TEMP = 33
    const regexBloodPress = /\d{2,3}[/]\d{2,3}/gm
    if(blood_press !== '' && !regexBloodPress.test(blood_press)) throw "Invalid value of blood_press"
    const checkValue = toInt(blood_press.split('/')[1]) > 250 || toInt(blood_press.split('/')[1]) < 50 || toInt(blood_press.split('/')[2]) > 250 || toInt(blood_press.split('/')[2]) < 250
    if(checkValue) throw "Invalid value of blood_press"
    if(pulse >= MAX_PULSE || pulse <= MIN_PULSE)
        if (pulse !== DEFAULT_VALUE) throw "Invalid value of pulse"
    if(temperature > MAX_TEMP || temperature < MIN_TEMP)
        if(temperature !== DEFAULT_VALUE) throw "Invalid value of temperature"
}
module.exports = new HAnalyseController()