const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const visitRouter = require('./visitRouter')
const hAnalyseRouter = require('./hAnalyseRouter')
router.use('/user', userRouter)
router.use('/visite', visitRouter)
router.use('/hAnalyse', hAnalyseRouter)
module.exports = router