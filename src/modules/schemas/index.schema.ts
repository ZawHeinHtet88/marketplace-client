import { z } from "zod";

export const LoginSchama = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(8),
  })
  .strict();

export type LoginSchemaType = z.infer<typeof LoginSchama>;

export const SignupSchama = z
  .object({
    name: z.string().min(1).max(20),
    email: z.string().email().min(1),
    phone : z.string().min(9),
    password: z.string().min(8),
    passwordConfirm: z.string(),
    street: z.string().min(1).max(20),
    city: z.string().min(1).max(20),
    state: z.string().min(1).max(20),
    country: z.string().min(1).max(20),
    postalCode: z.coerce.number().int().min(1),
  })
  .strict()
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password do not match",
    path: ["passwordConfirm"],
  });

export type SignupSchemaType = z.infer<typeof SignupSchama>;

export const StepOneSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password do not match",
    path: ["passwordConfirm"],
  });

export const StepTwoSchema = z
  .object({
    name: z.string().min(1).max(20),
    street: z.string().min(1).max(20),
    city: z.string().min(1).max(20),
    state: z.string().min(1).max(20),
    country: z.string().min(1).max(20),
    postalCode: z.coerce.number().int().min(1),
  })
  .strict();
