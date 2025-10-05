import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' }); // if .env is not in the same folder as server.js

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(e) {
        console.error(e.message)
        process.exit(1); //1 is failure, 0 is success
    }
}