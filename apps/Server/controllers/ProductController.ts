import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import NodeCache from "node-cache";

//modal
import Products from "../modals/Product";
import imageKit from "../config/imageKit";
import { runInTransaction } from "../utils/Transactions";
import type { Request, Response } from "express";
import { GetParams } from "./Utils";
dotenv.config();

const ProductCache = new NodeCache({ stdTTL: 600 });

/**
 * @desc    Get Previous Products
 * @route   Get /api/products
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const GetAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const { select, page, filter, perPage, sort } = GetParams(req.query, {
    page: 1,
    perPage: 9,
    filter: {},
  });

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
        ...filter,
      }
    : filter;

  const count = await Products.countDocuments({ ...keyword });

  let products = ProductCache.get("products" + keyword + page + count + filter);

  res.set("x-total-count", JSON.stringify(count));
  if (!products) {
    products = await Products.find({ ...keyword })
      .sort(sort)
      .limit(perPage)
      .skip(perPage * (page - 1))
      .select(select);

    ProductCache.set(
      "products" + keyword + page + count + filter,
      products,
      3600 / 2
    );

    res.json({ products, page, pages: Math.ceil(count / perPage) });
  } else {
    res.json({
      products,
      page,
      pages: Math.ceil(count / perPage),
    });
  }
});

/**
 * @desc    Get top rated products
 * @route   GET /api/products/top
 * @access  Public
 */

const GetTopProducts = asyncHandler(async (req: Request, res: Response) => {
  let TopProducts = ProductCache.get("TopProducts");
  if (!TopProducts) {
    TopProducts = await Products.find({})
      .sort({ rating: -1 })
      .limit(5)
      .select("name image description")
      .lean();
    ProductCache.set("TopProducts", TopProducts, 3600 / 2);
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
    ProductCache.flushAll();
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
    ProductCache.flushAll();
    res.status(200).json({ msg: product.name + " Deleted Successfully" });
  }
);

/**
 * @desc    Get AdminProducts
 * @route   Get /api/admin/products
 * @access  Public
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} products
 */

const AdminProducts = asyncHandler(async (req: Request, res: Response) => {
  const { select, page, filter, perPage, sort } = GetParams(req.query, {
    page: 1,
    perPage: 10,
    filter: {},
  });

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
        ...filter,
      }
    : {};
  const count = await Products.countDocuments({ ...keyword });

  let products = ProductCache.get(
    "AdminProducts" + keyword + page + count + filter + sort
  );

  res.set("x-total-count", JSON.stringify(count));

  if (!products) {
    products = await Products.find({ ...keyword })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .select(select)
      .sort(sort);

    ProductCache.set(
      "AdminProducts" + keyword + page + count + filter + sort,
      products,
      3600 / 2
    );
    res.json(products);
  } else {
    console.log("Cache");

    res.json(products);
  }
});

export {
  GetAllProducts,
  GetProductByID,
  UpdateProduct,
  AddProduct,
  deleteProduct,
  AdminProducts,
  GetTopProducts,
};
