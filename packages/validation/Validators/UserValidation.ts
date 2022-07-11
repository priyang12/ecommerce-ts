import { z } from "zod";

const UserSchema = z.object({
  _id: z.string(),
  name: z.string().refine((name) => name.length > 2 && name.length < 30, {
    message: "Name must be between 2 and 30 characters",
  }),
  email: z.string().email(),
  password: z.string(),
  isAdmin: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const LoginSchema = UserSchema.pick({ email: true, password: true });

const RegisterSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

const ResetpasswordSchema = UserSchema.pick({
  password: true,
})
  .extend({
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, "Passwords do not match");

const UpdateUserProfileSchema = UserSchema.pick({
  name: true,
  email: true,
});

const recoverMailSchema = UserSchema.pick({
  email: true,
});

export {
  UserSchema,
  LoginSchema,
  RegisterSchema,
  ResetpasswordSchema,
  UpdateUserProfileSchema,
  recoverMailSchema,
};
