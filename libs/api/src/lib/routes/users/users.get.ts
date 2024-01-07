import { z } from 'zod';
import type { HandlerExecute, MethodHandler } from '../../core/types/api';

const getUserResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type GetUserResponse = z.infer<typeof getUserResultSchema>;

export class GetUserHandler implements MethodHandler<GetUserResponse> {
  execute: HandlerExecute<GetUserResponse> = async (req, res) => {
    console.log({ query: req.query });
    const result: GetUserResponse = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    };

    res.status(200).json({ result });
  };
}