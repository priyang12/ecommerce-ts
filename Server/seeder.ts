import dotenv from "dotenv";
import users from "./data/userData";
import products from "./data/productsData";
import { CreateModels, models } from "./utils/Models";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const importdata = async () => {
  try {
    const { User, Product, Order } = models;

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    CreateModels();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    Product.createIndexes({
      name: "text",
    });
    console.log("DATA IMPORTED");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    const { User, Product, Order } = models;

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("DATA DESTROYED");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importdata();
}
