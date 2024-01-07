import { NextApiRequest, NextApiResponse } from 'next';

type HandlerResponse<Response> = {
  result?: Response;
  error?: ApiError;
};

export type HandlerExecute<T> = (
  request: NextApiRequest,
  response: NextApiResponse<HandlerResponse<T>>
) => void | Promise<void>;

export interface MethodHandler<T> {
  execute: HandlerExecute<T>;
}

export type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATH' | 'DELETE';

export type HandlerKey = `${HttpVerb} ${string}`;
export type HandlerMap = Map<HandlerKey, MethodHandler<unknown>>;
