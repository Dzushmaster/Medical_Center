const {Visit, Workday} = require('../Models/models')
const {Desiase} = require('../Models/models')
const ApiError = require('../errors/ApiError')
class VisitController{
    getPage(req, res){

    }
    async getAllUserVisits(req, res, next){
        try{
            const {id, userId} = req.params
            const visit = await Visit.findAll({where:{userId: id}})
            if (!visit) return next(ApiError.badRequest("Can't find any visits"))
            res.status(200).json(visit)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
    async getAllVisits(req, res, next){
        try{
            const id = req.params.id[1]
            const workdays = await Workday.findAll({where:{doctorId: id}})
            if (!workdays) return next(ApiError.badRequest("Can't find any visits"))
            res.status(200).json(workdays)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
    async create(req, res, next){
        try {
            const {id, idDoc, date, begin, end} = req.body
            if(!id) return next(ApiError.unauthorized('Login before book'))
            if (!idDoc || !date ||!begin || !end) return next(ApiError.badRequest('Input doctor or date/time'))
            const visit = await Visit.create({
                userId: id,
                doctorId: idDoc,
                date: date,
                begin: begin,
                end: end
            })
            if (!visit) return next(ApiError.badRequest("Can't create this visit, try again with other data"))
            let workday = await Workday.findOne({ where: {
                    doctorId: idDoc
                }
            })
            if(!workday) return next(ApiError.forbiden('Doctor have no this time'))
            workday = await Workday.update(
                {
                    cabinet: workday.cabinet,
                    day: workday.day,
                    begin: workday.begin,
                    end: workday.end,
                    busy: 1,
                    createdAt: workday.createdAt,
                    updatedAt: workday.updatedAt
                },
                {
                    where: {id: workday.id}
                }
            )
            if(!workday) return next(ApiError.forbiden('Doctor have no this time'))
            res.status(200).json(visit)
        }catch(e){
            return next(ApiError.internal(e))
        }
    }
}

module.exports = new VisitController()