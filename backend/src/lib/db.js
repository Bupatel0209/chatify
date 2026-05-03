import mongoose from 'mongoose';
import {ENV} from "./env.js";
import dns from 'dns';

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

export const connectDB = async () => {
    try {
        const {MONGODB_URI} = ENV;
        if (!MONGODB_URI) throw new Error("MONGODB_URI is not Set");
        
        const conn = await mongoose.connect(ENV.MONGODB_URI);
        console.log("MongoDB connected:", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // 1 means fail and 0 means success
    }
};