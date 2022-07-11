import { z } from "zod";

const WishlistSchema = z.object({
  // Look into RegEx for validation more
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  user: z.string(),
  products: z.array(
    z.object({
      product: z.string(),
      qty: z.number(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export { WishlistSchema };
