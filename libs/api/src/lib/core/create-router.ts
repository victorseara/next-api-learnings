import { NextApiRequest, NextApiResponse } from 'next';
import { DependencyContainer } from 'tsyringe';
import { getHandlerInjectionKey } from './get-handler-injection-keys';
import { MethodHandler } from './types/api';

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
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ statusCode: 500, message: message });
    }
  };
}
