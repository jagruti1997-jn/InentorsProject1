const mongoose=require('mongoose')
const usersSchema=mongoose.Schema;
const userDetails=new usersSchema({
    FirstName:{
        type:String,required:true
    },
    LastName:{
        type:String
    },
    Contact:{
        type:Number,required:true
    },
    Email:{
        type:String,required:true
    },
    Password:{
        type:String,required:true
    },
    
    Role:{
        type:String,
        enum:['Supervisor','Accountant'],required:true
    },
    description:{
        type:String
    },
   
  
    user:{
        type:usersSchema.Types.ObjectId,ref:"User"
    }
},{timestamps:true})

const userdetails=mongoose.model("UserCreate",userDetails);
module.exports=userdetails;