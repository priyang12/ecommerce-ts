import { z } from "zod";
import { UserSchema } from "./UserValidation";
import { OrderSchema } from "./OrderValidation";
import { ProductsSchema } from "./ProductValidation";

export const ReviewSchema = z.object({
  _id: z.string(),
  user: z.string().or(
    UserSchema.pick({
      _id: true,
      name: true,
      email: true,
    })
  ),
  order: z.string().or(OrderSchema.partial()),
  product: z.string().or(ProductsSchema.partial()),
  approved: z.boolean(),
  rating: z.number(),
  comment: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
