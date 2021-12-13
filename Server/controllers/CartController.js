const asyncHandler = require('express-async-handler');

// User Modal
const User = require('../modals/User');

const Products = require('../modals/Product');

// @desc    Get All Cart Products
// @route   Get /api/products
// @access  Private
const GetCartProducts = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  const user = await User.findById(req.user.id)
    .select('cart name')
    .populate('cart.product', ['price', 'image', 'name', 'countInStock']);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ msg: 'No Product in the Cart' });
  }
});

// @desc    Get All Products
// @route   POST /api/products/:id
// @access  Private
const AddToCart = asyncHandler(async (req, res) => {
  const { id, qty } = req.body;
  const user = await User.findById(req.user.id).select('cart name');
  const product = await Products.findById(id);
  if (!user || !product) {
    res.status(404).json({ msg: 'UnAuth Or Product not Found' });
  } else {
    //check if the product is in the cart already
    let isproduct = await user.cart.find((item) => String(item.product) === id);
    if (qty <= product.countInStock) {
      if (isproduct) {
        isproduct.qty = qty;
        await user.save();
        const newuser = await User.findById(req.user.id)
          .select('cart')
          .populate('cart.product', ['price', 'image', 'name', 'countInStock']);
        res.json({
          msg: `${product.name} Qty is Updated to ${qty}`,
          product: newuser.cart,
        });
      } else {
        user.cart.unshift({ product: id, qty: qty });
        await user.save();
        const newuser = await User.findById(req.user.id)
          .select('cart')
          .populate('cart.product', ['price', 'image', 'name', 'countInStock']);
        res.json({
          msg: `${product.name} is Added Cart`,
          product: newuser.cart,
        });
      }
    } else {
      res.status(404).json({ msg: 'Sorry Out Of stock' });
    }
  }
});

// @desc    Get Delete Cart Products
// @route   Get /api/products
// @access  Private
const DeleteCartProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select('cart')
    .populate('cart.product', ['price', 'image', 'name', 'countInStock']);
  if (user) {
    const removeIndex = user.cart.map((item) => item.id).indexOf(req.params.id);
    if (Number(removeIndex) === -1) {
      res.status(404);
      throw Error('No Product in the Cart');
    } else {
      user.cart.splice(removeIndex, 1);
      await user.save();
      res.json(user);
    }
  } else {
    res.status(404);
    throw Error('User Does not Exist');
  }
});

module.exports = {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
};
