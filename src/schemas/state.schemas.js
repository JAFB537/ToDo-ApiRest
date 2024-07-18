import { z } from 'zod'

const stateSchema = z.object({
  Name: z
    .string()
    .max(50, { message: 'Name must be 50 characters or less' })
    .min(1, { message: 'Name is required' })
})

export class StateSchema {
  static validate (input) {
    return stateSchema.safeParse(input)
  }

  static validatePartial (input) {
    return stateSchema.partial().safeParse(input)
  }
}
