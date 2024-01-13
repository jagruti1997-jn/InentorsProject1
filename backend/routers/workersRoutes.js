const express=require('express')
const router=express.Router();
const {workersValidationRules,validate}=require("../middleware/validation")
const workerDetails=require("../module/workersModel");




//fetch /read data
router.get("/workers", async (req,res)=>{
    try{
    const data= await workerDetails.find({user:req.user});
    res.json({
        Status_code:200,
        Success:true,
        data:data
    })}catch(e){
        res.status(500).json({
            Success:false,
            message:e.message
        })
    }

});


//get by id

router.get("/workers/:id",async (req,res)=>{
    try{
    const data= await workerDetails.findOne({_id:req.params.id});
    res.json({
        status:"success",
        data:data
    })
}catch(e){
    res.status(500).json({
        Success:false,
        message:e.message
    })
}

});

//create data

router.post("/workers",workersValidationRules(),validate, async (req,res)=>{
    try{
  
   const data=await workerDetails.create({Name:req.body.Name,date:req.body.date,
            status:req.body.status,             
             user:req.user});
             const workerID=data._id
        res.status(200).json({
            Status_code:200,
            Success:true,
            data,
            workerID:workerID
        })
    }catch(e){
        res.status(500).json({
            Success:false,
            message:e.message
        })
    }
})


//update data

router.put("/workers/:id", async (req,res)=>{
    try{
        const data=await workerDetails.updateOne({_id:req.params.id},
            {$set:{
                Name:req.body.Name, date:req.body.date,
                status:req.body.status,

            runValidators:true}});
        res.json({
            Status_code:200,
            Success:true,
            data
        })
    }catch(e){
        res.status(500).json({
            Status:false,
            message:e.message
        })
    }
})



//delete 

router.delete("/workers/:id", async (req,res)=>{
    try{
        const data=await workerDetails.deleteOne({_id:req.params.id});
        res.json({
            Status_code:200,
            Success:true,
            data
        })
    }catch(e){
        res.status(500).json({
            Success:false,
            message:e.message
        })
    }
})


module.exports=router;