const Router = require('express')
const doctorController = require('../Controllers/doctorController')
const router = new Router()
router.get('/', doctorController.getDoctors)
//router.post('/', doctorController.create)

module.exports = router