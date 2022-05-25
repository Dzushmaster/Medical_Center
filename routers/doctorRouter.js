const Router = require('express')
const doctorController = require('../Controllers/doctorController')
const router = new Router()
router.get('/', doctorController.getDoctors)
module.exports = router