import { z } from "zod";

const UserApi = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
  cart: z.array(
    z.object({
      product: z.string(),
      qty: z.number(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export default UserApi;
