import { z } from 'zod'

const userSchema = z.object({
  Name: z
    .string()
    .max(50, { message: 'Name must be 50 characters or less' })
    .min(1, { message: 'Name is required' }),
  LastName: z
    .string()
    .max(50, { message: 'Last name must be 50 characters or less' })
    .min(1, { message: 'Last name is required' }),
  Age: z
    .number()
    .int()
    .min(1, { message: 'Age must be greater than 0' })
    .max(150, { message: 'Age must be 150 or less' })
    .optional(),
  PhoneNumber: z
    .string()
    .max(50, { message: 'Phone number must be 50 characters or less' })
    .optional(),
  UserName: z
    .string()
    .max(20, { message: 'Username must be 20 characters or less' })
    .min(1, { message: 'Username is required' }),
  Password: z
    .string()
    .max(24, { message: 'Password must be 24 characters or less' })
    .min(1, { message: 'Password is required' }),
  Email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  Image: z
    .string()
    .max(100, { message: 'Image path must be 100 characters or less' })
    .optional(),
  Country: z
    .string()
    .max(50, { message: 'Country must be 50 characters or less' })
    .min(1, { message: 'Country is required' })
})

export class UserSchema {
  static validate (input) {
    return userSchema.safeParse(input)
  }

  static validatePartial (input) {
    return userSchema.partial().safeParse(input)
  }
}
