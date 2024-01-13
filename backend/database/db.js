const mongoose=require("mongoose")


const connection ='mongodb://localhost:27017/Test'

mongoose.connect(connection,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((error)=>{
    console.log(error)
})

