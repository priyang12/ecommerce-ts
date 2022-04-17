const asyncHandler = require("express-async-handler");

// User Modal
const User = require("../modals/User");

const Products = require("../modals/Product");

// @desc    Get All Cart Products
// @route   Get /api/cart
// @access  Private
const GetCartProducts = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  const user = await User.findById(req.user.id)
    .select("cart name")
    .populate("cart.product", ["price", "image", "name", "countInStock"]);
  if (user) {
    res.status(200).json({ Cart: user.cart });
  } else {
    res.status(404).json({ msg: "No Product in the Cart" });
  }
});

// @desc    Add Product to Cart or Update Product Qty in Cart
// @route   POST /api/cart
// @access  Private
const AddToCart = asyncHandler(async (req, res) => {
  const { id, qty } = req.body;
  const user = await User.findById(req.user.id).select("cart name");
  const product = await Products.findById(id);
  console.log(qty);
  if (!user || !product) {
    res.status(404).json({ msg: "UnAuth Or Product not Found" });
  } else {
    //check if the product is in the cart already
    let isProduct = await user.cart.find((item) => String(item.product) === id);
    if (qty <= product.countInStock) {
      if (isProduct) {
        isProduct.qty = qty;
        await user.save();
        res.json({
          msg: `${product.name} Qty is Updated to ${qty}`,
        });
      } else {
        user.cart.unshift({ product: id, qty: qty });
        await user.save();
        res.json({
          msg: `${product.name} is Added Cart`,
        });
      }
    } else {
      res.status(404).json({ msg: "Sorry Out Of stock" });
    }
  }
});

// @desc    Get Delete Cart Products
// @route   Get /api/cart/:id
// @access  Private
const DeleteCartProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("cart name")
    .populate("cart.product", ["price", "image", "name", "countInStock"]);
  if (user) {
    let Product;
    user.cart.filter((item) => {
      if (item.id === req.params.id) Product = item;
      else return item;
    });
    if (!Product)
      return res.status(404).json({ msg: "Product not Found in the Cart" });
    else {
      user.cart.pull(Product);
      await user.save();
      res.json({
        msg: `${Product.product.name} is Deleted from the Cart`,
      });
    }
  } else {
    res.status(404);
    throw Error("User Does not Exist");
  }
});

module.exports = {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
};
