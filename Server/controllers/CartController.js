const asyncHandler = require("express-async-handler");

// User Modal

const Cart = require("../modals/Cart");
const Products = require("../modals/Product");

/**
 * @desc    Get All Cart Products
 * @route   Get /api/cart
 * @access  Private
 */

const GetCartProducts = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate({
      path: "products.product",
      model: "Product",
      select: "name price _id image countInStock",
    })
    .lean();

  if (!cart) {
    return res.status(400).json({ msg: "Cart is empty" });
  }

  res.status(200).json(cart);
});

/**
 * @desc    Add Product to Cart or Update Product Qty in Cart
 * @route   POST /api/cart
 * @access  Private
 * @params  {id: string, qty: number}
 */

const AddToCart = asyncHandler(async (req, res) => {
  const { id, qty } = req.body;

  const session = await Cart.startSession();
  session.startTransaction();
  const [UserCart, product] = await Promise.all([
    Cart.findOne({ user: req.user.id }),
    Products.findById(id).lean(),
  ]);

  if (!UserCart) {
    return res.status(400).json({ msg: "Cart is Not Found" });
  }
  if (!product) {
    return res.status(404).json({ msg: "UnAuth Or Product not Found" });
  }

  if (qty > product.countInStock) {
    return res.status(404).json({ msg: "Sorry Out Of stock" });
  }

  //check if the product is in the cart already

  try {
    let isProduct = UserCart.products.find(
      (product) => product.product.toString() === id
    );

    if (isProduct) {
      isProduct.qty = qty;
      await UserCart.save();
      res.json({
        msg: `${product.name} Qty is Updated to ${qty}`,
      });
    } else {
      await UserCart.products.push({ product: id, qty });
      await UserCart.save();
      res.json({
        msg: `${product.name} is Added Cart`,
      });
    }
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
});

/**
 * @desc    Get Delete Cart Product
 * @route   DELETE /api/cart/:id
 * @access  Private
 * @params  {id: string}
 */

const DeleteCartProduct = asyncHandler(async (req, res) => {
  const session = await Cart.startSession();
  try {
    session.startTransaction();
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: { product: req.params.id } } },
      { new: true }
    );
    if (!cart) {
      return res.status(501).json({ msg: "Server Error Cart is Empty" });
    }

    session.commitTransaction();
    res.status(200).json({ msg: "Product Deleted" });
  } catch (err) {
    session.abortTransaction();
    res.status(400).json({ msg: "Error" });
  }
});

module.exports = {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
};
