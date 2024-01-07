import { NextApiRequest, NextApiResponse } from 'next';
import { DependencyContainer } from 'tsyringe';
import { getHandlerInjectionKey } from './get-handler-injection-keys';
import { MethodHandler } from './types/api';
import { ApiError } from './errors/api-errors';

type CreateRouterArgs = {
  createContainer: () => DependencyContainer;
  basePath: string;
  injectionKeys: Record<string, string>;
};

export function createRouter({
  basePath,
  createContainer,
  injectionKeys,
}: CreateRouterArgs) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const container = createContainer();
      const fullPath = req.url?.replace(basePath, '');
      const method = req.method;

      if (!fullPath || !method) {
        throw new Error('Path or method not found');
      }

      const handlerKey = `${method} ${fullPath}`;

      const injectionKey = getHandlerInjectionKey(
        handlerKey,
        Object.values(injectionKeys)
      );

      const handler = container.resolve<MethodHandler<unknown>>(injectionKey);

      if (!handler) {
        throw new Error('Handler not found');
      }

      await handler.execute(req, res);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(error.toJSON());
        return;
      }

      res.status(500).json({ statusCode: 500, message: 'Unknown error' });
    }
  };
}
