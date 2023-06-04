const router = require('express').Router()
const userController = require ('../controller/userController')


router.post('/signup',userController.registerUser)

router.post('/login',userController.login)


module.exports = router
