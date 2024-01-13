const mongoose=require('mongoose')
const categorySchema=mongoose.Schema;
const catDetails=new categorySchema({
    Name:{
        type:String,required:true
    },
    description:{
        type:String
    },

   user:{
        type:categorySchema.Types.ObjectId,ref:"User"
    }
},{timestamps:true})

const categoryDetails=mongoose.model("Category",catDetails);
module.exports=categoryDetails;