import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import CustomRateLimiter from "./middleware/Ratelimiter";
import connectDB from "./config/db";
import Jobs from "./Jobs";
import { notFound, errorHandler } from "./middleware/ErrorMiddleWare";
import UserRoute from "./routes/User.routes.js";
import ProductsRoute from "./routes/Products.routes.js";
import CartRoute from "./routes/Cart.routes";
import OrderRoute from "./routes/Order.routes";
import WishListRoute from "./routes/WishList.routes";
import UploadRoute from "./routes/Upload.routes";

const app = express();

connectDB();

Jobs();

dotenv.config();

//init middleware

app.use(express.json({}));

if (process.env.NODE_ENV === "development") {
  const Morgan = morgan("dev") as any;
  app.use(Morgan);
}

app.use("/api/users", CustomRateLimiter(), UserRoute);
app.use("/api/products", ProductsRoute);
app.use("/api/cart", CartRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/wishlist", WishListRoute);
app.use("/api/PhotoUpload", UploadRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//static for Browser
const _dirname = path.resolve();

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "development"
) {
  app.use(express.static(path.join(_dirname, "/Client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "Client", "build", "index.html"))
  );
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
