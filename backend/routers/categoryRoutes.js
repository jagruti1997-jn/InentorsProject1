const express=require('express')
const router=express.Router();
const {categoryValidationRules,validate}=require("../middleware/validation")
const categoryDetails=require("../module/categoryModel");



//fetch /read data
router.get("/category",async (req,res)=>{
    
    const data= await categoryDetails.find({user:req.user});
    const categoryId=data._id;
    res.json({
        status:"success",
        data:data,
        categoryId:categoryId
    })

});


//get by id

router.get("/category/:id",async (req,res)=>{
    
    const data= await categoryDetails.findOne({_id:req.params.id});
    res.json({
        status:"success",
        data:data
    })

});

//create data

router.post("/category",categoryValidationRules(),validate, async (req,res)=>{
    try{

        const data=await categoryDetails.create({Name:req.body.Name, description:req.body.description,
             user:req.user});
             const categoryId=data._id;
        res.json({
            status:"success",
            data,
            categoryId
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})


//update data

router.put("/category/:id", async (req,res)=>{
    try{
        const data=await categoryDetails.updateOne({_id:req.params.id},
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



router.delete("/category/:id", async (req,res)=>{
    try{
        const users=await categoryDetails.deleteOne({_id:req.params.id});
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