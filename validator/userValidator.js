const validator = require('validator')

module.exports={

    RegisterValidator(user){
        let err={}
        if(!user.name){
            err.name="Name Required !!"
        }
        if(!user.email){
            err.email='Email Required !!'
        }else if(!validator.default.isEmail(user.email) ){
            err.email="Email not valid !"
        }
        if(!user.password){
            err.password='Password Required !!'
        }
        return{
            err:err,
            isValid:Object.keys(err).length===0
        }
    }
    ,
    loginValidator(user){
        let err={}  
        if(!user.email){
            err.email='Email required !'
        } else if(!validator.default.isEmail(user.email)){
            err.email=' Invalid email !'
        }
        if(user.password){
            err.password='Password required!!'
        }
        return{
            err:err,
            isValid:Object.keys(err).length===0
        }
    }
}