import { BadRequestError } from './errors/api-errors';

export function getHandlerInjectionKey(
  handlerKey: string,
  injectionKeys: string[]
) {
  if (injectionKeys.includes(handlerKey)) {
    return handlerKey;
  }

  const pathWithoutQuery = handlerKey.split('?')[0];

  const pathParts = pathWithoutQuery.split('/').filter(Boolean);

  const injectionKey = injectionKeys.find((key) => {
    const keyParts = key.split('/').filter(Boolean);

    if (keyParts.length !== pathParts.length) {
      return false;
    }

    return keyParts.every((part, index) => {
      return part.startsWith(':') || part === pathParts[index];
    });
  });

  if (!injectionKey) {
    throw new BadRequestError('The required path does not exist');
  }

  return injectionKey;
}
