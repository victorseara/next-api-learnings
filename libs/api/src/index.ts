import { createRouter } from './lib/core/create-router';
import { HandlerKey, MethodHandler } from './lib/core/types/api';
import { GetUserByIdHandler } from './lib/routes/users/user.[id].get';
import { GetUserHandler } from './lib/routes/users/users.get';

const testRouter = new Map<HandlerKey, MethodHandler<unknown>>([
  ['GET /users', new GetUserHandler()],
  ['GET /users/:id', new GetUserByIdHandler()],
]);

export const handler = createRouter({
  baseUrl: '/api/backend',
  routerMap: testRouter,
});
