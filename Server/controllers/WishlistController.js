const asyncHandler = require("express-async-handler");

// User Modal

const Products = require("../modals/Product");
const Wishlist = require("../modals/Wishlist");

/**
 * @desc    Get All Wishlist Products
 * @route   Get /api/wishlist
 * @access  Private
 * @param   {object} req.user.id
 */

const GetWishlist = asyncHandler(async (req, res) => {
  const list = await Wishlist.findOne({ user: req.user.id })
    .select("-__v -updatedAt -createdAt")
    .populate({
      path: "products",
      model: "Product",
      select: "name price _id image countInStock description",
    })
    .lean();
  if (!list) {
    return res.status(400).json({ msg: "Wishlist is empty" });
  }

  res.status(200).json(list);
});

/**
 * @desc    Add Product to Wishlist
 * @route   PUT /api/Wishlist
 * @access  Private
 * @param   {object} req.user.id
 */

const AddToWishlist = asyncHandler(async (req, res) => {
  const List = await Wishlist.findOne({ user: req.user.id }).select(
    "-__v -updatedAt -createdAt"
  );

  if (!List) {
    return res.status(400).json({ msg: "Wishlist is not found" });
  }
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ msg: "Product not Found" });
  }
  //check if the product is in the already in the wishlist
  let isProduct = List.products.find(
    (product) => product.toString() === req.params.id
  );

  if (isProduct) {
    return res.status(400).json({ msg: "Product already in wishlist" });
  } else {
    List.products.push(req.params.id);
    await List.save();
    res.status(200).json({
      msg: `${product.name} is Added to wishlist`,
    });
  }
});

/**
 * @desc    DELETE  Product from Wishlist
 * @route   Delete /api/cart/:id
 * @access  Private
 * @param   {object} req.user.id
 */

const DeleteWishlistProduct = asyncHandler(async (req, res) => {
  const session = await Wishlist.startSession();
  try {
    session.startTransaction();
    const List = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: req.params.id } },
      { new: true }
    );

    if (!List) {
      return res.status(400).json({ msg: "Server Error" });
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
