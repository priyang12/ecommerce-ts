import asyncHandler from "express-async-handler";
import Order from "../modals/Order";
import Product from "../modals/Product";
import Review from "../modals/Review";
import type { Request, Response } from "express";
import { runInTransaction } from "../utils/Transactions";
import { GetParams } from "./Utils";
import NodeCache from "node-cache";

const ReviewCache = new NodeCache({ stdTTL: 600 });

/**
 * @desc    Fetch All Product Reviews
 * @route   GET /api/review/ProductId/:ProductId
 * @access  Public
 * @param   OrderID req.params id of the order
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Products Reviews Array
 */

export const GetProductApprovedReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const Reviews = await Review.find({
      product: req.params.ProductId,
      approved: true,
    });
    if (!Reviews) {
      res.status(404);
      throw Error("Server Error");
    }
    res.json(Reviews);
  }
);

/**
 * @desc    Fetch All Order Product Reviews
 * @route   GET /api/review/OrderID/:OrderID
 * @access  Private
 * @query   OrderID req.params id of the order
 * @query   ProductId req.params id of the Product
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */

export const GetOrderReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const Reviews = await Review.find({
      product: req.query.ProductId,
      order: req.params.OrderID,
    });
    res.json(Reviews);
  }
);

/**
 * @desc    Fetch All Users Reviews
 * @route   GET /api/review/
 * @access  Private
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */

export const UserReviews = asyncHandler(async (req: Request, res: Response) => {
  const { page, filter, sort, perPage } = GetParams(req.query, {
    sort: "-createdAt",
    filter: {},
    page: 0,
    perPage: 0,
  });

  const ProductSelect = req.query.productSelect as string;
  const OrderSelect = req.query.orderSelect as string;

  if (!OrderSelect) {
    const Reviews = await Review.find({
      user: req.user.id,
      ...filter,
    })
      .sort(sort)
      .populate("product", ProductSelect.split(","))
      .limit(perPage)
      .skip((page - 1) * perPage);

    res.json(Reviews);
  }
  if (OrderSelect) {
    const Reviews = await Review.find({
      user: req.user.id,
      ...filter,
    })
      .sort(sort)
      .populate("product", ProductSelect.split(","))
      .populate("order", OrderSelect.split(","))
      .limit(perPage)
      .skip((page - 1) * perPage);

    res.json(Reviews);
  }
});

/**
 * @desc    Post Review
 * @query   ?ProductId=&OrderID=
 * @route   Post /api/review
 * @access  Private
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */

export const PostReview = asyncHandler(async (req: Request, res: Response) => {
  const OrderID = req.query.OrderID;
  const ProductId = req.query.ProductId;
  const [CheckOrder, CheckProduct, CheckReview] = await Promise.all([
    Order.findById(OrderID),
    Product.findById(ProductId),
    Review.findOne({
      product: ProductId,
      order: OrderID,
    }),
  ]);

  const IsProduct = CheckOrder?.orderItems.findIndex(
    (item: any) => item.product._id.toString() === ProductId
  ) as number;

  if (!CheckOrder || !CheckProduct || IsProduct < 0) {
    res.status(413);
    throw Error("Wrong Credentials");
  }
  if (CheckReview) {
    res.status(401);
    throw Error("Order Product is already Reviewed");
  }

  const MakeReview = await Review.create({
    user: req.user.id,
    order: OrderID,
    product: ProductId,
    ...req.body,
  });

  CheckOrder.orderItems[IsProduct].Reviewed = true;
  CheckOrder.save();
  if (!MakeReview) {
    res.status(401);
    throw Error("Server Error Creating Review");
  }

  res.status(202);
  res.json({
    msg: "Review Posted",
  });
});

/**
 * @desc    Delete Review
 * @route   Post /api/review
 * @access  Private
 * @param   {string} req.params.id
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */

export const DeleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    const DeletedReview = await Review.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!DeletedReview) {
      res.status(401);
      throw Error("Server Error Delete Review");
    }
    res.status(201);
    res.json({
      msg: "Review Deleted",
      review: DeletedReview,
    });
  }
);

/**
 * @desc    Get All Reviews
 * @route   Post /api/review
 * @access  admin
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */

export const GetReviews = asyncHandler(async (req: Request, res: Response) => {
  const { page, filter, sort, perPage } = GetParams(req.query, {
    sort: "-createdAt",
    filter: {},
    page: 0,
    perPage: 0,
  });

  const reviewCount = await Review.countDocuments();
  res.set("x-total-count", reviewCount.toString());

  const CacheKey = `AllReviews + ${page} + ${perPage} + 
  ${JSON.stringify(filter)} + ${JSON.stringify(sort)} + ${reviewCount}`;

  const GetCache = ReviewCache.get(CacheKey);

  if (GetCache) {
    res.status(201);
    res.json(GetCache);
  } else {
    const Reviews = await Review.find(filter)
      .sort(sort)
      .limit(perPage)
      .skip((page - 1) * perPage);

    if (!Reviews) {
      res.status(404);
      throw Error("Server Error Could not Found Reviews");
    }
    ReviewCache.set(`CacheKey`, Reviews, 3600 / 2);
    res.status(201);
    res.json(Reviews);
  }
});

/**
 * @desc    Get Id Review
 * @route   GET /api/review/:id
 * @access  admin
 * @param   {object} req
 * @param   {object} res
 * @returns {IReview} IReview[] - Order Products Reviews Array
 */

export const GetReviewById = asyncHandler(
  async (req: Request, res: Response) => {
    const Reviews = await Review.findById(req.params.id);
    if (!Reviews) {
      res.status(404);
      throw Error("Server Error Could not Found Reviews");
    }
    res.status(201);
    res.json(Reviews);
  }
);

/**
 * @desc    Change Approval of the Reviews
 * @route   PUT api/review/:id
 * @access  admin
 * @param   {string} req.params.id
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */

export const ChangeApproversReview = asyncHandler(
  async (req: Request, res: Response) => {
    await runInTransaction(async (session) => {
      const ApprovedReview = await Review.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          approved: req.body.approved,
          rating: req.body.rating,
        },
        {
          new: true,
        }
      ).session(session);

      if (!ApprovedReview) {
        res.status(401);
        throw Error("Fail to Approve the Review Server Error");
      }

      const [product] = await Promise.all([
        await Product.findById(ApprovedReview.product).session(session),
      ]);

      if (!product) {
        res.status(401);
        throw Error("Fail to Approve the Review Server Error");
      }

      const TotalRating =
        (product.rating + (ApprovedReview.rating as number)) /
        product.numReviews;

      await Product.findByIdAndUpdate(
        {
          _id: ApprovedReview.id,
        },
        {
          rating: TotalRating,
          numReviews: product.numReviews + 1,
        },
        {
          new: true,
        }
      );
      ReviewCache.flushAll();
      res.status(201);
      res.json({
        msg: "Review has been approved",
      });
    });
  }
);

/**
 * @desc    Delete Review By admin panel
 * @route   DELETE api/review/:id
 * @access  admin
 * @param   {string} req.params.id
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */
export const DeleteAnyReview = asyncHandler(
  async (req: Request, res: Response) => {
    const DeletedReview = await Review.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!DeletedReview) {
      res.status(401);
      throw Error("Server Error Delete Review");
    }
    res.status(201);
    res.json({
      msg: "Review Deleted",
      review: DeletedReview,
    });
  }
);

/**
 * @desc    Change Approval of the Reviews
 * @route   patch api/review/:id
 * @access  admin
 * @query   req.params.ids - ids of review to deleted
 * @param   {object} req
 * @param   {object} res
 * @returns {Array<IReview>} IReview[] - Order Products Reviews Array
 */
export const DeleteManyReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const Ids = req.query.ids;
    const IdsArray = typeof Ids === "string" && Ids.split(",");
    const ReviewsList = await Review.deleteMany({
      _id: { $in: IdsArray },
    }).lean();
    if (ReviewsList) {
      res.json({
        msg: "Orders have been deleted",
        ids: IdsArray,
      });
    } else {
      res.status(404);
      throw new Error("Orders not found");
    }
  }
);
