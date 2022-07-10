import { z } from "zod";
import { UserSchema } from "./UserValidation";

const ReviewSchema = z.object({
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

const ProductsSchema = z.object({
  _id: z.string(),
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
    message: " description must be between 30 and 500 characters",
  }),
  reviews: z.array(ReviewSchema),
  rating: z.number(),
  numReviews: z.number(),
  price: z.number().min(0),
  countInStock: z.number().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const AddProjectValidation = ProductsSchema.omit({
  _id: true,
  user: true,
  image: true,
  reviews: true,
  createdAt: true,
  updatedAt: true,
  numReviews: true,
}).extend({
  imageFile: z.any(),
});

const UpdateProductValidation = AddProjectValidation.optional();

export { ProductsSchema, AddProjectValidation, UpdateProductValidation };
