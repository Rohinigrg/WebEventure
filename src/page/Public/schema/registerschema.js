import * as z from "zod";

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, "Please enter your full name"),

  username: z
    .string()
    .min(1, "Please enter your username"),

  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Please enter your password")
    .min(6, "Password must be at least 6 characters"),

  retype: z
    .string()
    .min(1, "Please confirm your password")
    .min(6, "Password must be at least 6 characters"),
})
.refine((data) => data.password === data.retype, {
  message: "Passwords do not match",
  path: ["retype"],
});
