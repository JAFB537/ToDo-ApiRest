import { z } from "zod";

const stateSchema = z.object({
  Name: z.string().min(1, { message: "State name is required" }).max(50),
});

export class StateSchema {
  static validate(input) {
    return stateSchema.safeParse(input);
  }

  static validatePartial(input) {
    return stateSchema.partial().safeParse(input);
  }
}
