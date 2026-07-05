import mongoose, { Connection } from "mongoose";
const mongodbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/GOWHEEL";

if(!mongodbUrl) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
}

let cached=global.mongooseConn
if(!cached) {
    cached=global.mongooseConn = { conn: null, promise: null }
}
const connectDB = async () => {
    if(cached.conn) {
        return cached.conn
    }
    if(!cached.promise) {
        cached.promise=mongoose.connect(mongodbUrl).then(c=>c.connection)
    }
    try {
        const conn = await cached.promise
        return conn
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectDB