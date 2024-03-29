const Router = require('express')
const {body} = require('express-validator')
const userController = require('../Controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()
router.post('/login',userController.login)
router.post('/register',
    body('fullname').isLength({max:50}),
    body('gender').isLength({min: 1, max: 1}),
    body('birthdate').isDate(),
    body('telenumber').not().isEmpty(),
    body('email').isEmail(),
    body('login').isLength({min: 7, max: 30}),
    body('password').isLength({min:7, max:32}),
    userController.register)
router.delete('/deleteUser/:id', userController.destroyUser)
module.exports = router