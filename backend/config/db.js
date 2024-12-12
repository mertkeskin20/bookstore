import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() =>  {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('mongo db connected')
    } catch(error){
        console.log("mongo db connection failed", error.message);
        throw error;
    }
}

export default connectDB;