import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();
//modal
import Products from "../modals/Product";

import Orders from "../modals/Order";
import imageKit from "../config/imageKit";
import myCache from "../utils/cache";

import { runInTransaction } from "../utils/Transactions";

import type { Request, Response } from "express";

/**
 * @desc    Get All Products
 * @route   Get /api/products/all
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const GetAllDetailsProducts = asyncHandler(
  async (req: Request, res: Response) => {
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
        .select("-__v -createdAt")
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
  }
);

/**
 * @desc    Get Previous Products
 * @route   Get /api/products
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const GetAllProducts = asyncHandler(async (req: Request, res: Response) => {
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
  res.set("x-total-count", JSON.stringify(count));
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

const GetTopProducts = asyncHandler(async (req: Request, res: Response) => {
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

const GetProductByID = asyncHandler(async (req: Request, res: Response) => {
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

const AddProduct = asyncHandler(async (req: Request, res: Response) => {
  const EndPoint = process.env.END_POINT;
  let Image = req.body.image;

  if (!Image && req.file) {
    const UploadedImage = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    Image = UploadedImage.url;
  }

  const product = await Products.create({
    ...req.body,
    image: Image || `${EndPoint}/sample_a81IvE0ug.webp`,
  });

  console.log(product);

  if (!product) {
    res.status(400).json({ msg: "Product not added" });
  }
  res.status(201).json({ msg: "Product Added Successfully", product });
});

/**
 * @desc    Update Product
 * @route   PUT api/admin/product
 * @access  Admin
 * @param   {object} req.body {name, price, description, category, brand, image}
 * @param   {object} res
 */

const UpdateProduct = asyncHandler(async (req: Request, res: Response) => {
  await runInTransaction(async (session) => {
    const product = await Products.findById(req.params.id).session(session);
    if (!product) {
      return res.status(404).json({ msg: "Product not Found" });
    }
    await product.update(req.body);
    if (req.file) {
      imageKit
        .upload({
          file: req.file.buffer,
          fileName: req.file.originalname,
          // @ts-ignore
          tags: ["test", "image"],
        })
        .then((image) => {
          product.image = image.url;
          product.save();
        });
    }
    if (!product) {
      res.status(400).json({ msg: "Product not added" });
    }
    myCache.del("AdminProducts");
    res
      .status(200)
      .json({ msg: `${product.name} is Updated`, UpdatedImage: product.image });
  });
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 * @param   {object} req.params.id
 */

const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not Found" });
    }
    myCache.del("AdminProducts");
    res.status(200).json({ msg: product.name + " Deleted Successfully" });
  }
);

/**
 * @desc    Add Review
 * @route   POST /api/products/review
 * @access  Private
 * @param   {object} req.body {rating, comment}
 */

const AddReview = asyncHandler(async (req: Request, res: Response) => {
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
      const review: any = {
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

/**
 * @desc    Get AdminProducts
 * @route   Get /api/admin/products
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const AdminProducts = asyncHandler(async (req: Request, res: Response) => {
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
  let products = myCache.get("AdminProducts");

  res.set("x-total-count", JSON.stringify(count));
  if (!products) {
    products = await Products.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .select(
        "rating numReviews price countInStock _id name brand image category Date"
      );
    myCache.set("AdminProducts", products, 3600 / 2);

    res.json(products);
  } else {
    res.json(products);
  }
});

export {
  GetAllDetailsProducts,
  GetAllProducts,
  GetProductByID,
  UpdateProduct,
  AddProduct,
  AddReview,
  deleteProduct,
  AdminProducts,
  GetTopProducts,
};
