import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import users from "./data/userData";
import products from "./data/productsData";
import { createReviews } from "./data/reviewData";
import { makeOrders } from "./data/orderData";
import { CreateModels, models } from "./utils/Models";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const getRandomProducts = (products, maxCount = 10) => {
  const count = Math.floor(Math.random() * maxCount) + 1;
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((product) => ({
    product: product._id,
    quantity: Math.floor(Math.random() * 3) + 1,
  }));
};

const importData = async () => {
  try {
    const { User, Product, Order, Cart, Wishlist, Review } = models;

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();
    await Review.deleteMany();

    CreateModels();

    const insertedUsers = await User.insertMany(
      users.map((user) => {
        return { ...user, password: bcrypt.hashSync(user.password, 10) };
      })
    );

    const adminUser = insertedUsers[0]._id;
    const createdProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });

    const insertedProducts = await Product.insertMany(createdProducts);

    const sampleCarts = insertedUsers.map((user) => ({
      user: user._id,
      products: getRandomProducts(insertedProducts),
    }));

    await Cart.insertMany(sampleCarts);

    const sampleWishlists = insertedUsers.map((user) => ({
      user: user._id,
      products: getRandomProducts(createdProducts).map((p) => p.product), // just product IDs
    }));

    await Wishlist.insertMany(sampleWishlists);

    const sampleOrders = makeOrders(insertedUsers, createdProducts);

    const insertedOrders = await Order.insertMany(sampleOrders);

    const sampleReviews = createReviews(insertedOrders);

    await Review.insertMany(sampleReviews);

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
  importData();
}
