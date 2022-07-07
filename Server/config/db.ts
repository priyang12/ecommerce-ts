import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://priyang:QV3vnWKyaMI442gk@cluster1.f9zvf.mongodb.net/Test-ecommerce?retryWrites=true&w=majority"
    );
    console.log(`MongoDB is connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
