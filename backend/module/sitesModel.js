const mongoose=require('mongoose')
const sitesSchema=mongoose.Schema;
const siteDetails=new sitesSchema({
    Name:{
        type:String,required:true
    },
    description:{
        type:String
    },
    location:{
        type:String
    },

   user:{
        type:sitesSchema.Types.ObjectId,ref:"User"
    }
},{timestamps:true})

const sitesDetails=mongoose.model("Sites",siteDetails);
module.exports=sitesDetails;