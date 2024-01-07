import { HandlerKey, HandlerMap } from './types/api';

export function getHandler(path: HandlerKey, routerMap: HandlerMap) {
  if (routerMap.get(path)) {
    return routerMap.get(path);
  }

  const pathWithoutQuery = path.split('?')[0];

  const pathParts = pathWithoutQuery.split('/').filter(Boolean);
  const keys = [...routerMap.keys()];

  const handlerKey = keys.find((key) => {
    const keyParts = key.split('/').filter(Boolean);

    if (keyParts.length !== pathParts.length) {
      return false;
    }

    return keyParts.every((part, index) => {
      return part.startsWith(':') || part === pathParts[index];
    });
  });

  if (!handlerKey) {
    throw new Error('Handler not found');
  }

  const handler = routerMap.get(handlerKey);

  if (!handler) {
    throw new Error('Handler not found');
  }

  return handler;
}
