import { inject, injectable } from 'tsyringe';
import {
  HandlerExecute,
  MethodHandler,
  IRequestParser,
} from '@vs-next-bff/api';
import {
  GetUserByIdParams,
  GetUserByIdResponse,
  getUserByIdParamsSchema,
} from './get-users-by-id.schema';
import { InjectionKeys } from '../../../config/injection-keys';

@injectable()
export class GetUserByIdHandler implements MethodHandler<GetUserByIdResponse> {
  constructor(
    @inject(InjectionKeys.RequestParser)
    private requestParser: IRequestParser
  ) {}

  execute: HandlerExecute<GetUserByIdResponse> = (req, res) => {
    const { id } = this.requestParser.parse<GetUserByIdParams>(
      req,
      'params',
      getUserByIdParamsSchema,
      InjectionKeys.GetUserByIdHandler
    );

    const result: GetUserByIdResponse = {
      id,
      name: 'John Doe',
      email: 'johndoe@email.com',
    };

    res.status(200).json({ result });
  };
}
