const Router = require('express')
const doctorController = require('../Controllers/doctorController')
const router = new Router()
router.get('/', doctorController.getPage)
router.get('/:id', doctorController.getDoctor)
router.post('/', doctorController.create)

module.exports = router