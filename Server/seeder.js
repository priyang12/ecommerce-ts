const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/user");
const products = require("./data/products");
const User = require("./modals/User");
const Product = require("./modals/Product");
const Order = require("./modals/order");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importdata = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    await Products.createIndexes({
      name: "text",
      description: "text",
      brand: "text",
      category: "text",
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
