const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const app = express();
const { notFound, errorHandler } = require("./middleware/error");
const CustomRateLimiter = require("./middleware/Ratelimiter");
const connectDB = require("./config/db");
const Jobs = require("./Jobs");

connectDB();

Jobs();

dotenv.config();

//init middleware

app.use(express.json({ extented: false }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/users", CustomRateLimiter(), require("./routes/User.routes.js"));
app.use("/api/products", require("./routes/Products.routes.js"));
app.use("/api/cart", require("./routes/Cart.routes"));
app.use("/api/orders", require("./routes/Order.routes"));
app.use("/api/wishlist", require("./routes/WishList.routes"));
app.use("/api/PhotoUpload", require("./routes/Upload.routes"));

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//static for Browser
const _dirname = path.resolve();

app.use("/Photos", express.static(path.join(__dirname, "/Photos")));

if (process.env.NODE_ENV === "production") {
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
app.listen(port, console.log(`server is running on ${port}`));
