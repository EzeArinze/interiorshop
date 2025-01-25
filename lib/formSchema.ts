import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export type FormDataType = z.infer<typeof formSchema>;
