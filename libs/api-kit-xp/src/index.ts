import 'reflect-metadata';
import { Api } from '@vs-next-bff/api';
import { container as tsyringeContainer } from 'tsyringe';
import { InjectionKeys } from './config/injection-keys';
import { GetUserByIdHandler } from './controllers/users-by-id/get-users-by-id/get-users-by-id';

const api = new Api({
  basePath: '/api/backend',
  injectionKeys: InjectionKeys,
  container: tsyringeContainer,
});

api.configureContainer((container) => {
  container.register<GetUserByIdHandler>(InjectionKeys.GetUserByIdHandler, {
    useClass: GetUserByIdHandler,
  });
});

export const handler = api.getApiHandler();
