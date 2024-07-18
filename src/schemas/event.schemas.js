import { z } from 'zod'
import { isValidDate } from '../utils/validates.js'

const eventSchema = z.object({
  StartDate: z
    .string()
    .min(1, { message: 'StartDate is required' })
    .refine((val) => isValidDate(val), { message: 'Invalid StartDate Format' }),
  EndDate: z
    .string()
    .min(1, { message: 'EndDate is required' })
    .refine((val) => isValidDate(val), { message: 'Invalid EndDate Format' }),
  Description: z
    .string()
    .max(1000, { message: 'Description must be 1000 characters or less' })
    .optional(),
  UserID: z
    .string()
    .uuid({ message: 'Invalid UUID format' })
    .min(1, { message: 'UserID is required' }),
  IssueID: z
    .number()
    .int()
    .refine((val) => val !== null, { message: 'IssueID is required' })
})

export class EventSchema {
  static validate (input) {
    return eventSchema.safeParse(input)
  }

  static validatePartial (input) {
    return eventSchema.partial().safeParse(input)
  }
}
