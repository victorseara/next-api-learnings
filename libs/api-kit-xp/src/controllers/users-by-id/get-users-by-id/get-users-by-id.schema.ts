import { z } from 'zod';

export const getUserByIdResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const getUserByIdParamsSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .refine((id) => !isNaN(id), {
      message: 'id must be a number',
    }),
});

export type GetUserByIdParams = z.infer<typeof getUserByIdParamsSchema>;
export type GetUserByIdResponse = z.infer<typeof getUserByIdResultSchema>;
