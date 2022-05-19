const Router = require('express')
const visitController = require('../Controllers/visiteController')
const router = new Router()
router.get('/', visitController.getPage)
router.get('/:id', visitController.getAllVisits)
router.post('/', visitController.create)

module.exports = router