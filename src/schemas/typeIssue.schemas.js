import { z } from 'zod'

const typeIssueSchema = z.object({
  Name: z
    .string()
    .max(50, { message: 'Name must be 50 characters or less' })
    .min(1, { message: 'Name is required' }),
  Description: z
    .string()
    .max(1000, { message: 'Description must be 1000 characters or less' })
    .optional(),
  Image: z
    .string()
    .max(100, { message: 'Image path must be 100 characters or less' })
    .optional(),
  DateCreated: z
    .date()
    .default(() => new Date())
    .refine((date) => date !== null, { message: 'DateCreated is required' })
})

export class TypeIssueSchema {
  static validate (input) {
    return typeIssueSchema.safeParse(input)
  }

  static validatePartial (input) {
    return typeIssueSchema.partial().safeParse(input)
  }
}
