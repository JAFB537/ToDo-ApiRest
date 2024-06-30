import { z } from "zod";

const eventSchema = z.object({
  StartDate: z
    .date()
    .min(new Date(), { message: "Start date must be in the future" }),
  EndDate: z
    .date()
    .min(z.ref("StartDate"), { message: "End date must be after start date" }),
  Description: z.string().max(1000).optional(),
  UserID: z.string().uuid(),
  IssueID: z.number().int(),
});

export class EventSchema {
  static validate(input) {
    return eventSchema.safeParse(input);
  }

  static validatePartial(input) {
    return eventSchema.partial().safeParse(input);
  }
}
