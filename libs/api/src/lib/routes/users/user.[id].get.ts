import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import { HandlerExecute, MethodHandler } from '../../core/types/api';
import { IParseRouteParamsUseCase } from '../../use-cases/parse-route-params/parse-route-params.usecase';
import { InjectionKeys } from '../../core/injection-keys';

const getUserByIdResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const getUserByIdParamsSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .refine((id) => !isNaN(id), {
      message: 'id must be a number',
    }),
});

type GetUserByIdParams = z.infer<typeof getUserByIdParamsSchema>;
type GetUserByIdResponse = z.infer<typeof getUserByIdResultSchema>;

@injectable()
export class GetUserByIdHandler implements MethodHandler<GetUserByIdResponse> {
  constructor(
    @inject(InjectionKeys.ParseRouteParamsUseCase)
    private parseRouteParamsUseCase: IParseRouteParamsUseCase
  ) {}

  execute: HandlerExecute<GetUserByIdResponse> = (req, res) => {
    const { id } = this.parseRouteParamsUseCase.execute<GetUserByIdParams>(
      req.query,
      InjectionKeys.GetUserByIdHandler,
      getUserByIdParamsSchema
    );

    const result: GetUserByIdResponse = {
      id,
      name: 'John Doe',
      email: 'johndoe@email.com',
    };

    res.status(200).json({ result });
  };
}
