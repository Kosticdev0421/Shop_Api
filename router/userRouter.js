const express=require('express')
const userRouter = express()
const userControler= require('../controler/userControler')

userRouter.get('/welcome', userControler.welcome)
userRouter.post('/auth/register', userControler.registerControler)
userRouter.post('/auth/login',userControler.loginControler)
module.exports= userRouter