const express=require('express')

const login=require("../module/login");
const {loginValidationRules,validate}=require("../middleware/validation")
const bcrypt=require('bcrypt')
var jwt=require('jsonwebtoken')
const secret="RESTAPI";
const router=express.Router();




//login api
router.post("/signup",loginValidationRules(),validate,
async (req,res)=>{
     try{
    const {email,password} =req.body;

   bcrypt.hash(password,10, async function(err,hash){
    if(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
    const userlogin=await login.create({
        email,
        password:hash
    });
       res.json({
        status:"success",
        message:"register successful",
        userlogin
       }) 
   })
}catch(e){
    res.status(500).json({
        status:"registration failed",
        message:e.message
    })
}

});



//signIn api
router.post("/signin",loginValidationRules(),validate,
async (req,res)=>{
     try{
    

   const {email,password} =req.body;

const data=await login.findOne({email})
if(!data){
    res.status(400).json({
        status:"failed",
        message:"user is not register"
    })
}

   bcrypt.compare(password,data.password, async function(err,result){
    if(err){
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
    if(result){
        const token=jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: data._id
          }, secret);

          res.json({
            status:"success",
            token
           }) 
    }
   
       
   })
}catch(e){
    res.status(500).json({
        status:"registration failed",
        message:e.message
    })
}

});

module.exports=router;
