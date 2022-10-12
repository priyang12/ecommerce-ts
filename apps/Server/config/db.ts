import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.TEST_MONGO_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL || "");
    console.log(`MongoDB is connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
