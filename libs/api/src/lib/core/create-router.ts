import { NextApiRequest, NextApiResponse } from 'next';
import { MethodHandler, HandlerKey, HttpVerb } from './types/api';
import { getHandler } from './get-handler';

type RouterConfig = {
  baseUrl: string;
  routerMap: Map<HandlerKey, MethodHandler<unknown>>;
};

export function createRouter(config: RouterConfig) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const baseUrl = config.baseUrl;
      const fullPath = req.url?.replace(baseUrl, '');
      const method = req.method;

      if (!fullPath || !method) {
        throw new Error('Path or method not found');
      }

      const handler = getHandler(
        `${method as HttpVerb} ${fullPath}`,
        config.routerMap
      );

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
