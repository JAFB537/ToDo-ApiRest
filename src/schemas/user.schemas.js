import { z } from "zod";

const userSchema = z.object({
  Name: z.string().min(1, { message: "Name is required" }).max(50),
  LastName: z.string().min(1, { message: "Last name is required" }).max(50),
  Age: z.number().int().min(0).optional(),
  PhoneNumber: z.string().min(1, { message: "Phone number is required" }).max(50).optional(),
  UserName: z.string().min(1, { message: "Username is required" }).max(20),
  Password: z.string().min(1, { message: "Password is required" }).max(24),
  Email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }).max(30),
  Image: z.string().min(1, { message: "Image URL is required" }).max(100).optional(),
  Country: z.string().min(1, { message: "Country is required" }).max(50),
});

// Validation schema for login
const loginSchema = z.object({
  UserName: z.string().min(1, { message: "Username is required" }).max(20),
  Password: z.string().min(1, { message: "Password is required" }).max(24),
});

export class UserSchema {

  static validate(input) {
    return userSchema.safeParse(input);
  }

  static validatePartial(input) {
    return userSchema.partial().safeParse(input);
  }

  static validateLogin(input) {
    return loginSchema.safeParse(input);
  }
}
