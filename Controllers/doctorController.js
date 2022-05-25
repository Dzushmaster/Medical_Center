const {Doctor} = require('../Models/models')
const ApiError = require('../errors/ApiError')
class VisitController{
    async getDoctors(req, res, next){
        try{
            const doctors = await Doctor.findAll()
            if (!doctors) return next(ApiError.badRequest("Can't find any visits"))
            res.status(200).json(doctors)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
}
module.exports = new VisitController()