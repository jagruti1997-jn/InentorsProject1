const mongoose=require('mongoose')
const vendorSchema=mongoose.Schema;
const venDetails=new vendorSchema({
    Name:{
        type:String,required:true
    },
    description:{
        type:String
    },

   user:{
        type:vendorSchema.Types.ObjectId,ref:"User"
    }
},{timestamps:true})

const vendorDetails=mongoose.model("Vendor",venDetails);
module.exports=vendorDetails;