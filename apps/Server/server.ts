import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import Cors from "cors";
import CustomRateLimiter from "./middleware/Ratelimiter";
import connectDB from "./config/db";
import Jobs from "./Jobs";
import { notFound, errorHandler } from "./middleware/ErrorMiddleWare";
import UserRoute from "./routes/User.routes";
import AdminRoute from "./routes/Admin.routes";
import ProductsRoute from "./routes/Products.routes";
import CartRoute from "./routes/Cart.routes";
import OrderRoute from "./routes/Order.routes";
import ReviewsRoute from "./routes/Review.routes";
import WishListRoute from "./routes/WishList.routes";
import UploadRoute from "./routes/Upload.routes";

const app = express();

connectDB();

Jobs();

dotenv.config();

//init middleware

app.use(
  Cors({
    origin: process.env.CLIENT_URL || "https://ecommerce-ts-admin.vercel.app",
    credentials: true,
    exposedHeaders: ["x-total-count"],
  })
);

app.use(express.json({}));

if (process.env.NODE_ENV === "development") {
  const Morgan = morgan("dev") as any;
  app.use(Morgan);
}

app.use("/api/users", CustomRateLimiter(), UserRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/products", ProductsRoute);
app.use("/api/cart", CartRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/wishlist", WishListRoute);
app.use("/api/reviews", ReviewsRoute);
app.use("/api/PhotoUpload", UploadRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  const _dirname = path.resolve();
  const root = path.join(_dirname, "..", "apps", "Client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
} else if (process.env.NODE_ENV === "development") {
  const _dirname = path.resolve();
  const root = path.join(_dirname, "..", "apps", "Client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
// @ts-ignore
app.listen(port, console.log(`server is running on ${port}`));
