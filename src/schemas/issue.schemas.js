import { z } from 'zod'

const issueSchema = z.object({
  Name: z
    .string()
    .max(50, { message: 'Name must be 50 characters or less' })
    .min(1, { message: 'Name is required' }),
  Description: z
    .string()
    .max(1000, { message: 'Description must be 1000 characters or less' })
    .optional(),
  StateID: z
    .number()
    .int()
    .refine((val) => val !== null, { message: 'StateID is required' }),
  TypeIssueID: z
    .number()
    .int()
    .refine((val) => val !== null, { message: 'TypeIssueID is required' }),
  UserID: z
    .string()
    .uuid({ message: 'Invalid UUID format' })
    .min(1, { message: 'UserID is required' }),
  ProjectID: z
    .number()
    .int()
    .refine((val) => val !== null, { message: 'ProjectID is required' })
})

export class IssueSchema {
  static validate (input) {
    return issueSchema.safeParse(input)
  }

  static validatePartial (input) {
    return issueSchema.partial().safeParse(input)
  }
}
