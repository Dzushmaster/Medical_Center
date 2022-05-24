const {Doctor, Visit} = require('../Models/models')
const ApiError = require('../errors/ApiError')
class VisitController{
    getPage(req, res){

    }
    async getDoctors(req, res, next){
        try{
            const doctors = await Doctor.findAll()
            if (!doctors) return next(ApiError.badRequest("Can't find any visits"))
            res.status(200).json(doctors)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }/*
    async create(req, res, next){
        try {
            if(!req.payload){
                return next(ApiError.forbiden("Authorise before make new visit"))
            }
            const {id, idDoc, date, time} = req.body
            if (!id || !idDoc || !date ||!time) return next(ApiError.badRequest('Input doctor or date/time'))
            const visit = await Visit.create({
                userId: id,
                doctorId: idDoc,
                date: date,
                time: time
            })
            if (!visit) return next(ApiError.badRequest("Can't create this visit, try again with other data"))
            const desiase = await Desiase.create({
                visityId: visit.id
            })
            if(!desiase) return next(ApiError.badRequest("Can't create new desiase"))
            res.status(200).json(visit)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
    */
}

module.exports = new VisitController()