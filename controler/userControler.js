const bcrypt =require('bcryptjs')
const RegisterModel =require('../model/registerModel')
const userValidator=require('../validator/userValidator')
const jwt=require('jsonwebtoken')

const welcome=(req, res)=>{
    res.status(200).json({massage:"Welcome to our Server"})
}

const registerControler=(req, res)=>{
    
    let varify = userValidator.RegisterValidator(req.body)
    if(!varify.isValid){
        return res.status(400).json(varify.err)
    }
	RegisterModel.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			return res.status(400).json({email:"User allready exist ", status :false})
		}else{
			bcrypt.hash(req.body.password, 12,((err, hash)=>{
				if(err){
					console.log(err)
					res.status(500).json({massage:"Server error occurd "})
				}else{
					const newUser= new RegisterModel({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash
                    })
					newUser.save()
					.then(user=>{
						console.log(user)
						res.json({massage:"Register Success "})
					})
					.catch(err=>{
						console.log(err)
					})
				}
			}))
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({massage:"server error occurd "})
	})
}

const loginControler=(req,res)=>{
    console.log(req.body)
    let varify =  userValidator.loginValidator({email:req.body.email, password:req.body.password})
    if(!varify.isValid){
        return res.status(400).json(varify.err)
    }
	RegisterModel.findOne({email:req.body.email})
	.then(user=>{
		if(!user){
		    return	res.status(404).json({massage:"User not found !", status:false});
		}
        bcrypt.compare(req.body.password, user.password)
        .then(result=>{
            if(!result){
                return res.status(400).json({massage:" Wrong password", status:false})
            }
            let token = jwt.sign({name:user.name, email:user.email}, "secret" , {expiresIn:'4h'})
            res.status(200).json({massage:"Login successfull !", status:true, userId:user._id , token:token  } )
        })
	})
	.catch(err=>{
		console.log(err)
		res.json({err:err})
	})
}



module.exports={
    welcome,
    registerControler,
    loginControler

}