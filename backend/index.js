const express=require("express");
const ConnectionToDb=require("./db/connectToDB");
const app=express();
const cors=require("cors");
const schoolRoute=require("./routes/schoolRoutes");
const authRoute=require("./routes/authRoutes");
const subjectRoute=require("./routes/subjectsRoutes");
const classRoutes=require("./routes/classRoutes");
const teacherRoutes=require("./routes/teacherRoutes");
const studentRoute=require("./routes/studentRoutes");
ConnectionToDb();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server is running");
})
app.use("/school",schoolRoute);
app.use("/auth",authRoute);
app.use("/subject",subjectRoute);
app.use("/class",classRoutes);
app.use("/teacher",teacherRoutes);
app.use("/student",studentRoute);
app.listen(4400,()=>{
    console.log("Server is Running At PORT: 4400");
})