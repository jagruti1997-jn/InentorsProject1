const express=require('express')
const bodyParser=require('body-parser')
const app=express()
require('dotenv').config();
app.use(bodyParser.json())
const authorization=require("./middleware/authMiddleware.js")
const port=process.env.PORT



const mongoose=require('mongoose')
require('./database/db.js')



const loginRoutes=require("./routers/login.js")
const categoryRoutes=require("./routers/categoryRoutes.js")
const vendorRoutes=require("./routers/vendorRoutes.js")
const sitesRoutes=require("./routers/sitesRoutes.js")
const workerRoutes=require("./routers/workersRoutes.js")
const usersRoutes=require("./routers/userRoutes.js")
const requestRoutes1=require("./routers/requestRoutes1.js")



//middleware
app.use("/api",authorization)






//all routes calling
app.use("/login",loginRoutes) 
app.use("/api",categoryRoutes)
app.use("/api",vendorRoutes)
app.use("/api",sitesRoutes)
app.use("/api",workerRoutes)
app.use("/api",usersRoutes)
app.use("/api",requestRoutes1)


app.listen(port,()=>{
    console.log("server is running at 3001")
})