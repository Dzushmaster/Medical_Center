const Router = require('express')
const {body} = require('express-validator')
const hAnalyseController = require('../Controllers/hAnalyseController')
const router = new Router()

router.get('/', hAnalyseController.getPage)
router.post('/', hAnalyseController.create)

module.exports = router
