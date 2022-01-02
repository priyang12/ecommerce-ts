const asyncHandler = require("express-async-handler");

//modal
const Products = require("../modals/Product");

const Orders = require("../modals/order");

// @desc    Get All Products
// @route   Get /api/products
// @access  Public
const GetAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Products.countDocuments({ ...keyword });
  const products = await Products.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });

  // const products = await Products.find({});
  // res.json(products);
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const GetTopProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({})
    .sort({ rating: -1 })
    .limit(5)
    .select("name image description");
  res.json(products);
});

// @desc    Get All Products
// @route   POST /api/products/:id
// @access  Public
const GetProductByID = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ msg: "Product not Found" });
  }
});

// @desc    Add Product
// @route   Post api/product
// @access  Admin
const AddProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Products({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    const createdProduct = await product.save();
    res
      .status(201)
      .json({ msg: "Product added successfully", product: createdProduct._id });
  } catch (error) {
    res.status(404);
    throw Error("Adding Error In Server " + error);
  }
});

// @desc    Update Product
// @route   PUT api/admin/product
// @access  Admin
const UpdateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) throw Error("No Product Found");
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      numReviews,
    } = req.body;

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(404);
    throw Error("Adding Error In Server " + error);
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) throw Error("No Product Found");
    await product.remove();
    const products = await Products.find({});
    res
      .status(200)
      .json({ msg: product.name + " Deleted Successfully", products });
  } catch (error) {
    res.status(404);
    throw new Error("Deleting Error In Server : " + error.message);
  }
});

// @desc    Add Review
// @route   POST /api/products/review
// @access  Private
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
  GetAllProducts,
  GetProductByID,
  UpdateProduct,
  AddProduct,
  AddReview,
  deleteProduct,
  GetTopProducts,
};
