import { z } from 'zod'

const userProjectSchema = z.object({
  UserID: z
    .string()
    .uuid({ message: 'Invalid UUID format' })
    .min(1, { message: 'UserID is required' }),
  ProjectID: z
    .number()
    .int()
    .min(1, { message: 'ProjectID must be greater than 0' })
})

export class UserProjectSchema {
  static validate (input) {
    return userProjectSchema.safeParse(input)
  }

  static validatePartial (input) {
    return userProjectSchema.partial().safeParse(input)
  }
}
