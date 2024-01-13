const express=require('express')
const router=express.Router();
const {siteValidationRules,validate}=require("../middleware/validation")
const siteDetails=require("../module/sitesModel");


//validation






//fetch /read data
router.get("/sites",async (req,res)=>{
    
    const data= await siteDetails.find({user:req.user});
    
    res.json({
        status:"success",
        data
       
    })

});


//get by id

router.get("/sites/:id",async (req,res)=>{
    
    const data= await siteDetails.findOne({_id:req.params.id});
    res.json({
        status:"success",
        data:data
    })

});

//create data

router.post("/sites",siteValidationRules(),validate, async (req,res)=>{
    try{
       
         const data=await siteDetails.create({Name:req.body.Name, description:req.body.description,location:req.body.location,
             user:req.user});
             const siteId=data._id
        res.json({
            status:"success",
            data,
            siteId:siteId
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})


//update data

router.put("/sites/:id", async (req,res)=>{
    try{
        const data=await siteDetails.updateOne({_id:req.params.id},
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



router.delete("/sites/:id", async (req,res)=>{
    try{
        const data=await siteDetails.deleteOne({_id:req.params.id});
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