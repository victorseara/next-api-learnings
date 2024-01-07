import { inject, injectable } from 'tsyringe';
import { InjectionKeys } from '../../../../core/injection-keys';
import { HandlerExecute, MethodHandler } from '../../../../core/types/api';
import { IParseRouteParamsUseCase } from '../../../use-cases/parse-route-params/parse-route-params.usecase';
import {
  GetUserByIdParams,
  GetUserByIdResponse,
  getUserByIdParamsSchema,
} from './user.[id].schema';

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
