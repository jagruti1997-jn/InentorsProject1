const express=require('express')
const router=express.Router();
const {userValidationRules,validate}=require("../middleware/validation")
const userDetails=require("../module/userModel");
const bcrypt=require('bcrypt')

//validate input






//fetch /read data
router.get("/user",async (req,res)=>{
    
    const data= await userDetails.find({user:req.user});
    res.json({
        status:"success",
        data:data
    })

});



//get by id

router.get("/user/:id",async (req,res)=>{
    
    const data= await workerDetails.findOne({_id:req.params.id});
    res.json({
        status:"success",
        data:data
    })

});
//create data

router.post("/user",userValidationRules(),validate, async (req,res)=>{
    try{

        const {Password} =req.body;
        bcrypt.hash(Password,10, async function(err,hash){
            if(err){
                res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }

   const data=await userDetails.create({FirstName:req.body.FirstName,
            LastName:req.body.LastName,Email:req.body.Email,Password:hash,
            Contact:req.body.Contact,Role:req.body.Role,description:req.body.description,
            user:req.user});
            const userRoleID=data._id
        res.json({
            status:"success",
            data,
            userRoleID:userRoleID

        })
    })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})


//update data

router.put("/user/:id", async (req,res)=>{
    try{
        const data=await userDetails.updateOne({_id:req.params.id},
            {$set:{
                FirstName:req.body.FirstName,
            LastName:req.body.LastName,Email:req.body.Email,Password:req.body.Password,
            Contact:req.body.Contact,Role:req.body.Role,description:req.body.description,

            runValidators:true}});
        res.json({
            status:"success",
            data
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})



//delete 



router.delete("/user/:id", async (req,res)=>{
    try{
        const users=await userDetails.deleteOne({_id:req.params.id});
        res.json({
            status:"success",
            users
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})


module.exports=router;