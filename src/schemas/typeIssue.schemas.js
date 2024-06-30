import { z } from "zod";

const typeIssueSchema = z.object({
  Name: z.string().min(1, { message: "Issue type name is required" }).max(50),
  Description: z.string().max(1000).optional(),
  Image: z.string().max(100).optional(),
});

export class TypeIssueSchema {
  static validate(input) {
    return typeIssueSchema.safeParse(input);
  }

  static validatePartial(input) {
    return typeIssueSchema.partial().safeParse(input);
  }
}
