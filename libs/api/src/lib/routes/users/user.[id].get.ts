import { NextApiRequest } from 'next';
import { MethodHandler, HandlerExecute } from '../../core/types/api';
import { z } from 'zod';

const getUserByIdResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const getUserByIdParamsSchema = z.object({
  id: z.string().transform((item) => parseInt(item, 10)),
});

const apiParamsSchema = z.object({
  backend: z.array(z.string()),
});

type NextApiQuery = NextApiRequest['query'];

function getRouteParam(query: NextApiQuery, paramPosition: number) {
  const params = apiParamsSchema.parse(query);

  return params.backend[paramPosition];
}

type GetUserByIdResponse = z.infer<typeof getUserByIdResultSchema>;

export class GetUserByIdHandler implements MethodHandler<GetUserByIdResponse> {
  execute: HandlerExecute<GetUserByIdResponse> = (req, res) => {
    const idParam = getRouteParam(req.query, 1);
    const param = getUserByIdParamsSchema.parse({ id: idParam });

    const result: GetUserByIdResponse = {
      id: param.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
    };

    res.status(200).json({ result });
  };
}
