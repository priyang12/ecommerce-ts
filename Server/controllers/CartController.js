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
    let isproduct = await user.cart.find((item) => String(item.product) === id);
    if (qty <= product.countInStock) {
      if (isproduct) {
        isproduct.qty = qty;
        await user.save();
        const newuser = await User.findById(req.user.id)
          .select("cart")
          .populate("cart.product", ["price", "image", "name", "countInStock"]);
        res.json({
          msg: `${product.name} Qty is Updated to ${qty}`,
          Cart: newuser.cart,
        });
      } else {
        user.cart.unshift({ product: id, qty: qty });
        await user.save();
        const NewUser = await User.findById(req.user.id)
          .select("cart")
          .populate("cart.product", ["price", "image", "name", "countInStock"]);
        res.json({
          msg: `${product.name} is Added Cart`,
          Cart: NewUser.cart,
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
    .select("cart")
    .populate("cart.product", ["price", "image", "name", "countInStock"]);
  if (user) {
    const removeIndex = user.cart.map((item) => item.id).indexOf(req.params.id);
    if (Number(removeIndex) === -1) {
      res.status(404);
      throw Error("No Product in the Cart");
    } else {
      user.cart.splice(removeIndex, 1);
      await user.save();
      res.json({ Cart: user.cart });
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
