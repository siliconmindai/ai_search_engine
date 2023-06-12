import * as z from "zod"
 
export const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Prompt too short",
  }).max(150, {
    message: "Prompt too large, please summarize it"
  }),
})