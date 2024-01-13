const express=require('express')
const router=express.Router();
const {vendorValidationRules,validate}=require("../middleware/validation")
const vendorDetails=require("../module/vendorModel");

//fetch /read data
router.get("/vendor",async (req,res)=>{
    
    const data= await vendorDetails.find({user:req.user});
    res.json({
        status:"success",
        data:data
    })

});


//get by id

router.get("/vendor/:id",async (req,res)=>{
    
    const data= await vendorDetails.findOne({_id:req.params.id});
    res.json({
        status:"success",
        data:data
    })

});

//create data

router.post("/vendor",vendorValidationRules(),validate, async (req,res)=>{
    try{

         const data=await vendorDetails.create({Name:req.body.Name, description:req.body.description,
             user:req.user});
             const venderID=data._id
        res.json({
            status:"success",
            data,
            venderID:venderID
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})


//update data

router.put("/vendor/:id", async (req,res)=>{
    try{
        const data=await vendorDetails.updateOne({_id:req.params.id},
            {$set:{
                Name:req.body.Name,
            description:req.body.description,

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



router.delete("/vendor/:id", async (req,res)=>{
    try{
        const data=await vendorDetails.deleteOne({_id:req.params.id});
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


module.exports=router;