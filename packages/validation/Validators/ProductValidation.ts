import { z } from "zod";
import { UserSchema } from "./UserValidation";

export const ReviewSchema = z.object({
  _id: z.string(),
  rating: z.number(),
  comment: z.string(),
  user: z.string().or(
    UserSchema.pick({
      _id: true,
      name: true,
      email: true,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProductsSchema = z.object({
  _id: z.string(),
  name: z.string(),
  user: z.string().or(
    UserSchema.pick({
      _id: true,
      name: true,
      email: true,
      isAdmin: true,
    })
  ),
  image: z.string().url(),
  brand: z.string(),
  category: z.string(),
  description: z.string().refine((str) => str.length > 30 || str.length < 500, {
    message: "description must be between 30 and 500 characters",
  }),
  reviews: z.array(ReviewSchema),
  rating: z.number(),
  numReviews: z.number(),
  price: z.number().min(0),
  countInStock: z.number().min(0),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const CreateProductValidation = ProductsSchema.omit({
  _id: true,
  user: true,
  reviews: true,
  createdAt: true,
  updatedAt: true,
  numReviews: true,
  image: true,
}).extend({
  imageFile: z.any(),
});

export const UpdateProductValidation = CreateProductValidation.optional();
