import { injectable } from 'tsyringe';
import { z } from 'zod';
import { BadRequestError } from '../../core/errors/api-errors';
import { NextApiQuery } from '../../core/types/api';

export interface IParseRouteParamsUseCase {
  execute: <T>(
    query: NextApiQuery,
    requestPath: string,
    schema: z.AnyZodObject
  ) => T;
}

@injectable()
export class ParseRouteParamsUseCase implements IParseRouteParamsUseCase {
  private readonly baseParamSchema = z.object({
    backend: z.array(z.string()),
  });

  execute = <T>(
    query: NextApiQuery,
    requestPath: string,
    schema: z.AnyZodObject
  ) => {
    const baseParams = this.baseParamSchema.parse(query);
    const { paramPosition, paramName } = this.getParamsMeta(requestPath);

    const param = { [paramName]: baseParams.backend[paramPosition] };

    const result = schema.safeParse(param);

    if (!result.success) {
      throw new BadRequestError(
        'Invalid request params',
        result.error.flatten().fieldErrors
      );
    }

    return result.data as T;
  };

  private getParamsMeta(requestPath: string) {
    const splittedPath = requestPath.split('/').filter(Boolean).slice(1);

    const paramPosition = splittedPath.findIndex((item) =>
      item.startsWith(':')
    );

    const paramName = splittedPath[paramPosition].replace(':', '');

    return { paramPosition, paramName };
  }
}
