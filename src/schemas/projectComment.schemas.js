import { z } from 'zod'

const projectCommentSchema = z.object({
  UserID: z
    .string()
    .uuid({ message: 'Invalid UUID format' })
    .min(1, { message: 'UserID is required' }),
  ProjectID: z
    .number()
    .int()
    .refine((val) => val !== null, { message: 'ProjectID is required' }),
  Description: z
    .string()
    .max(1000, { message: 'Description must be 1000 characters or less' })
    .min(1, { message: 'Description is required' })
})

export class ProjectCommentSchema {
  static validate (input) {
    return projectCommentSchema.safeParse(input)
  }

  static validatePartial (input) {
    return projectCommentSchema.partial().safeParse(input)
  }
}
