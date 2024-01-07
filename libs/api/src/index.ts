import 'reflect-metadata';
import { container } from 'tsyringe';
import { createRouter } from './lib/core/create-router';
import { InjectionKeys } from './lib/core/injection-keys';
import { GetUserByIdHandler } from './lib/example/routes/user-by-id/user-by-id-get/user-by-id.get';
import {
  IParseRouteParamsUseCase,
  ParseRouteParamsUseCase,
} from './lib/example/use-cases/parse-route-params/parse-route-params.usecase';

const createContainer = () => {
  container.register<IParseRouteParamsUseCase>(
    InjectionKeys.ParseRouteParamsUseCase,
    {
      useClass: ParseRouteParamsUseCase,
    }
  );

  container.register<GetUserByIdHandler>(InjectionKeys.GetUserByIdHandler, {
    useClass: GetUserByIdHandler,
  });

  return container;
};

export const handler = createRouter({
  basePath: '/api/backend',
  injectionKeys: InjectionKeys,
  createContainer: createContainer,
});
