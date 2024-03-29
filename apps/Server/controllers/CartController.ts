import asyncHandler from "express-async-handler";
import Cart from "../modals/Cart";
import Products from "../modals/Product";
import { runInTransaction } from "../utils/Transactions";

import type { Request, Response } from "express";
import NodeCache from "node-cache";

const CartCache = new NodeCache({ stdTTL: 600 });

/**
 * @desc    Get All Cart Products
 * @route   Get /api/cart
 * @access  Private
 */

const GetCartProducts = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const CacheData = CartCache.get(`${req.user.id}`);
    if (CacheData) {
      res.status(201).json(CacheData);
    } else {
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
      CartCache.set(`${req.user.id}`, cart, 3600 / 2);
      res.status(200).json(cart);
    }
  }
);

/**
 * @desc    Add Product to Cart or Update Product Qty in Cart
 * @route   POST /api/cart
 * @access  Private
 * @params  {id: string, qty: number}
 */

const AddToCart = asyncHandler(async (req: Request, res: Response) => {
  await runInTransaction(async (session) => {
    const { ProductId, qty } = req.body;

    const [UserCart, product] = await Promise.all([
      Cart.findOne({ user: req.user.id }).session(session),
      Products.findById(ProductId).lean(),
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

    let isProduct = UserCart.products.find(
      (p: any) => p.product?.toString() === ProductId
    );

    if (isProduct) {
      isProduct.qty = qty;
      await UserCart.save();
      CartCache.flushAll();
      res.json({
        msg: `${product.name} Qty is Updated to ${qty}`,
      });
    } else {
      await UserCart.products.push({ product: ProductId, qty });
      await UserCart.save();
      CartCache.flushAll();
      res.json({
        msg: `${product.name} is Added Cart`,
      });
    }
  });
});

/**
 * @desc    Get Delete Cart Product
 * @route   DELETE /api/cart/:id
 * @access  Private
 * @params  {id: string}
 */

const DeleteCartProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: { product: req.params.id } } },
      { new: true }
    );
    if (!cart) {
      return res.status(501).json({ msg: "Server Error Cart is Empty" });
    }
    CartCache.flushAll();
    res.status(200).json({ msg: "Product Deleted" });
  }
);

export { AddToCart, GetCartProducts, DeleteCartProduct };
