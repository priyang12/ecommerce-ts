const asyncHandler = require("express-async-handler");

// User Modal

const Products = require("../modals/Product");
const Wishlist = require("../modals/Wishlist");

// @desc    Get All Wishlist Products
// @route   Get /api/wishlist
// @access  Private
const GetWishlist = asyncHandler(async (req, res) => {
  const Wishlist = await Wishlist.findOne({ user: req.user.id })
    .populate({
      path: "products.product",
      model: "Product",
      select: "name price _id image countInStock",
    })
    .lean();
  if (!Wishlist) {
    return res.status(400).json({ msg: "Wishlist is empty" });
  }

  res.status(200).json(Wishlist);
});

// @desc    Add Product to Wishlist
// @route   PUT /api/Wishlist
// @access  Private
const AddToWishlist = asyncHandler(async (req, res) => {
  const List = await Wishlist.findOne({ user: req.user.id });

  if (!List) {
    return res.status(400).json({ msg: "Wishlist is not found" });
  }
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not Found" });
  }
  //check if the product is in the already in the wishlist
  let isProduct = await List.products.find(
    (productItem) => productItem.product === req.params.id
  );

  if (isProduct) {
    return res.status(400).json({ msg: "Product already in wishlist" });
  } else {
    List.products.push({ product: req.params.id, qty: 1 });
    await List.save();
    res.status(200).json(List);
  }
});

// @desc    DELETE  Product from Wishlist
// @route   Delete /api/cart/:id
// @access  Private
const DeleteWishlistProduct = asyncHandler(async (req, res) => {
  const session = await Wishlist.startSession();
  try {
    session.startTransaction();
    const List = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: { product: req.params.id } } },
      { new: true }
    );
    if (!List) {
      return res.status(400).json({ msg: "Wishlist is empty" });
    }
    session.commitTransaction();
    res.status(200).json({ msg: "Product Deleted" });
  } catch (err) {
    session.abortTransaction();
    res.status(400).json({ msg: "Error" });
  }
});

module.exports = {
  AddToWishlist,
  DeleteWishlistProduct,
  GetWishlist,
};
