import { z } from 'zod'

const issueCommentSchema = z.object({
  UserID: z
    .string()
    .uuid({ message: 'Invalid UUID format' })
    .min(1, { message: 'UserID is required' }),
  IssueID: z
    .number()
    .int()
    .refine((val) => val !== null, { message: 'IssueID is required' }),
  Description: z
    .string()
    .max(1000, { message: 'Description must be 1000 characters or less' })
    .min(1, { message: 'Description is required' })
})

export class IssueCommentSchema {
  static validate (input) {
    return issueCommentSchema.safeParse(input)
  }

  static validatePartial (input) {
    return issueCommentSchema.partial().safeParse(input)
  }
}
