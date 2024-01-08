import { InternalInjectionKeys } from '@vs-next-bff/api';

const RouteInjectionKeys = {
  GetUserByIdHandler: 'GET /users/:id',
};

export const InjectionKeys = {
  ...InternalInjectionKeys,
  ...RouteInjectionKeys,
};
