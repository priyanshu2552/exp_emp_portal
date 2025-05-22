const express=require('express')
const app=express()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port=5000
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
require('dotenv').config();
const connectDB = require('./config/db'); 
connectDB()

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("🟢 Employee Management Portal API is running...");
});



app.listen(port,()=>{
    console.log("server is running on port 5000")
})