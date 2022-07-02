const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");

dotenv.config();
//modal
const Products = require("../modals/Product");

const Orders = require("../modals/order");
const imageKit = require("../config/imageKit");
const myCache = require("../utils/cache");

/**
 * @desc    Get All Products
 * @route   Get /api/products/all
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const GetAllDetailsProducts = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Products.countDocuments({ ...keyword });
  let products = myCache.get("products" + keyword + page + count);

  if (!products) {
    products = await Products.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();

    myCache.set("products" + keyword + page + count, products, 3600 / 2);

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  }
});

/**
 * @desc    Get Previous Products
 * @route   Get /api/products
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const GetAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Products.countDocuments({ ...keyword });
  let products = myCache.get("products" + keyword + page + count);

  if (!products) {
    products = await Products.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .select(
        "rating numReviews price countInStock _id name brand image category Date"
      );

    myCache.set("products" + keyword + page + count, products, 3600 / 2);

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  }
});

/**
 * @desc    Get top rated products
 * @route   GET /api/products/top
 * @access  Public
 */

const GetTopProducts = asyncHandler(async (req, res) => {
  let TopProducts = myCache.get("TopProducts");
  if (!TopProducts) {
    TopProducts = await Products.find({})
      .sort({ rating: -1 })
      .limit(5)
      .select("name image description")
      .lean();
    myCache.set("TopProducts", TopProducts, 3600 / 2);
    res.json(TopProducts);
  } else {
    res.json(TopProducts);
  }
});

/**
 * @desc    Get All Products
 * @route   POST /api/products/:id
 * @access  Public
 */

const GetProductByID = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id).lean();
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ msg: "Product not Found" });
  }
});

/**
 * @desc    Add Product
 * @route   Post api/product
 * @access  Admin3
 * @param   {object} req.body {name, price, description, category, brand, image}
 * @param   {object} res
 */

const AddProduct = asyncHandler(async (req, res) => {
  const EndPoint = process.env.END_POINT;

  const product = await Products.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    image: `${EndPoint}/sample_a81IvE0ug.webp`,
    category: req.body.category,
    stock: req.body.stock,
    countInStock: req.body.countInStock,
  });
  console.log(product);
  if (req.file) {
    const image = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      tags: ["test", "image"],
    });
    product.image = image.url;
  }
  res.status(201).json({ msg: `${product.name} is Added` });
});

/**
 * @desc    Update Product
 * @route   PUT api/admin/product
 * @access  Admin
 * @param   {object} req.body {name, price, description, category, brand, image}
 * @param   {object} res
 */

const UpdateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    stock: req.body.stock,
    countInStock: req.body.countInStock,
  });
  if (req.file) {
    const image = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      tags: ["test", "image"],
    });
    product.image = image.url;
  }
  res.status(200).json({ msg: `${product.name} is Updated` });
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 * @param   {object} req.params.id
 */

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).lean();
    if (!product) throw Error("No Product Found");
    await product.remove();
    res.status(200).json({ msg: product.name + " Deleted Successfully" });
  } catch (error) {
    res.status(404);
    throw new Error("Deleting Error In Server : " + error.message);
  }
});

/**
 * @desc    Add Review
 * @route   POST /api/products/review
 * @access  Private
 * @param   {object} req.body {rating, comment}
 */

const AddReview = asyncHandler(async (req, res) => {
  const { name, rating, comment, order_id } = req.body;
  const order = await Orders.findById(order_id).select("_id");
  const product = await Products.findById(req.params.id);

  if (!order || !product) {
    res.status(404);
    throw new Error("Product not Found or not Ordered Error");
  } else {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id.toString()
    );
    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Already Reviewed");
    } else {
      const review = {
        name: name,
        rating: Number(rating),
        comment,
        user: req.user.id,
      };
      product.reviews.unshift(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ mag: "Review Added" });
    }
  }
});

module.exports = {
  GetAllDetailsProducts,
  GetAllProducts,
  GetProductByID,
  UpdateProduct,
  AddProduct,
  AddReview,
  deleteProduct,
  GetTopProducts,
};
