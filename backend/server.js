const express=require('express')
const app=express()
require('dotenv').config();
const connectDB = require('./config/db'); 
connectDB()
const port=5000
app.get('/',(req,res)=>{
    res.send('hello world')
})
app.listen(port,()=>{
    console.log("server is running on port 5000")
})