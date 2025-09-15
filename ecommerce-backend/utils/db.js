import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to E-commerce DB");
    } catch (error) {
        console.log("Error in connecting to DB");
    }
}

export default connectDb;
