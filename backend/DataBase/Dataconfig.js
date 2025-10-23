import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ConnectDb= async()=>{
    try{
const connect = await mongoose.connect(process.env.MONGO_URL);
console.log("Database connected successfully");
    }catch(error){
console.log("Database connection failed",error);
    }
}

export default ConnectDb;