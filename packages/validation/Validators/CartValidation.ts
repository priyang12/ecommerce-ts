import { z } from "zod";

const CartSchema = z.object({
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

const CartPost = z.object({
  ProductId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  qty: z.number().min(1, {
    message: "Qty must be greater than 0",
  }),
});

export { CartSchema, CartPost };
