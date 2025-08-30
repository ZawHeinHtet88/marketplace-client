import { z } from "zod";


export const profileSchema = z.object({
  name: z.string().min(1).max(20),
  street: z.string().min(1).max(20),
  city: z.string().min(1).max(20),
  state: z.string().min(1).max(20),
  country: z.string().min(1).max(20),
  postalCode: z.coerce.number().int().min(1),
  phone : z.string().min(9),
  image : z.any().optional(),
}).strict();

export type ProfileSchemaType = z.infer<typeof profileSchema>;