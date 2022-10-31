import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import Products from "../modals/Product";
import Wishlist from "../modals/Wishlist";
import NodeCache from "node-cache";
import { GetParams } from "./Utils";

const WishListCache = new NodeCache({ stdTTL: 600 });

/**
 * @desc    Get All Wishlist Products
 * @route   Get /api/wishlist
 * @access  Private
 * @param   {object} req.user.id
 */

const GetWishlist = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { select, page, perPage, sort } = GetParams(req.query, {
      select: "-__v -createdAt",
    });

    const CacheUserDate = WishListCache.get(
      `${req.user.id} + ${page} + ${perPage} + ${sort}`
    );

    if (CacheUserDate) {
      res.status(200).json(CacheUserDate);
    } else {
      const list = await Wishlist.findOne({ user: req.user.id })
        .select(select)
        .populate({
          path: "products",
          model: "Product",
          select: "name price _id image countInStock description",
        })
        .sort(sort)
        .limit(perPage)
        .skip((page - 1) * perPage)
        .lean();

      if (!list) {
        return res.status(400).json({ msg: "Wishlist is empty" });
      }
      WishListCache.set(
        `${req.user.id} + ${page} + ${perPage} + ${sort}`,
        list
      );
      res.status(200).json(list);
    }
  }
);

/**
 * @desc    Add Product to Wishlist
 * @route   PUT /api/Wishlist
 * @access  Private
 * @param   {object} req.user.id
 */

const AddToWishlist = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const List = await Wishlist.findOne({ user: req.user.id }).select(
      "-__v -updatedAt -createdAt"
    );

    if (!List) {
      return res.status(400).json({ msg: "Wishlist is not found" });
    }
    const product = await Products.findById(req.params.id).lean();

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
      const ProjectId = req.params.id as any;
      List.products.push(ProjectId);
      await List.save();
      WishListCache.flushAll();
      res.status(200).json({
        msg: `${product.name} is Added to wishlist`,
      });
    }
  }
);

/**
 * @desc    DELETE  Product from Wishlist
 * @route   Delete /api/cart/:id
 * @access  Private
 * @param   {object} req.user.id
 */

const DeleteWishlistProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const List = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      // @ts-ignore
      { $pull: { products: req.params.id } },
      { new: true }
    ).exec();

    if (!List) {
      return res.status(400).json({ msg: "Server Error" });
    }
    WishListCache.flushAll();
    res.status(200).json({ msg: "Product Deleted" });
  }
);

export { AddToWishlist, DeleteWishlistProduct, GetWishlist };
