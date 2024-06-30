import { z } from "zod";

const projectSchema = z.object({
  Name: z.string().min(1, { message: "Project name is required" }).max(50),
  Description: z.string().max(1000).optional(),
  StartDate: z.date().nullable(),
  EndDate: z.date().nullable(),
  StateID: z.number().int(),
  UserID: z.string().uuid(),
});

export class ProjectSchema {
  static validate(input) {
    return projectSchema.safeParse(input);
  }

  static validatePartial(input) {
    return projectSchema.partial().safeParse(input);
  }
}
