import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const port = 5000;

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);

app.listen(port, ()=>{
    connectDB();
    console.log(`server started now on port ${port}`);
})