const mongoose =require('mongoose')
const Schema= mongoose.Schema

const RegisterSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const RegisterModel= mongoose.model('RegisterModel', RegisterSchema)
module.exports=RegisterModel