import { z } from 'zod'
import { isValidDate } from '../utils/validates.js'

const projectSchema = z.object({
  Name: z
    .string()
    .max(50, { message: 'Name must be 50 characters or less' })
    .min(1, { message: 'Name is required' }),
  Description: z
    .string()
    .max(1000, { message: 'Description must be 1000 characters or less' })
    .optional(),
  StartDate: z
    .string()
    .min(1, { message: 'StartDate is required' })
    .refine((val) => isValidDate(val), { message: 'Invalid StartDate Format' }),
  EndDate: z
    .string()
    .min(1, { message: 'EndDate is required' })
    .refine((val) => isValidDate(val), { message: 'Invalid EndDate Format' }),
  StateID: z
    .number()
    .int()
    .min(1, { message: 'StateID is required' }),
  UserID: z
    .string()
    .uuid({ message: 'Invalid UUID format' })
    .min(1, { message: 'UserID is required' })
})

export class ProjectSchema {
  static validate (input) {
    return projectSchema.safeParse(input)
  }

  static validatePartial (input) {
    return projectSchema.partial().safeParse(input)
  }
}
