import mongoose, { InferSchemaType, Model } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export type IReview = InferSchemaType<typeof reviewSchema>;

const ReviewModel: Model<IReview> = mongoose.model("Review", reviewSchema);

export default ReviewModel;
