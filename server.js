const express=require('express')
const PORT = process.env.PORT || 5000
const mongoose =require ('mongoose')
const app =express()
const morgan =require('morgan')
const bodyParser=require('body-parser')

// router
const userRouter =require('./router/userRouter')


mongoose .connect('mongodb://localhost/shop_management',{useUnifiedTopology:true, useNewUrlParser:true})
.then(()=>{
    console.log('Mongodb connected successfull', )
})
.catch(err=>{
    console.log(err)
    console.log('Database connnection faild ')
})

// using middleware to server 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// using  route to server
app.use(userRouter)

app.listen(PORT , ()=>{console.log(`Server started to Port no : ${PORT}`)})