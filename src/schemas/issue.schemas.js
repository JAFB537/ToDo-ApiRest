import { z } from "zod";

const issueSchema = z.object({
  Name: z.string().min(1, { message: "Issue name is required" }).max(50),
  Description: z.string().max(1000).optional(),
  StateID: z.number().int(),
  TypeIssueID: z.number().int(),
  UserID: z.string().uuid(),
  ProjectID: z.number().int(),
});

export class IssueSchema {
  static validate(input) {
    return issueSchema.safeParse(input);
  }

  static validatePartial(input) {
    return issueSchema.partial().safeParse(input);
  }
}
