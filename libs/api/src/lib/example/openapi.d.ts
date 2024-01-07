import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface GetUserByIdBadRequestResponse {
            error?: {
                message?: string;
                details?: {
                    id?: string[];
                };
            };
        }
        export interface GetUserByIdResponse {
            id?: string;
            name?: string;
            email?: string;
        }
    }
}
declare namespace Paths {
    namespace GetUserById {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetUserByIdResponse;
            export type $400 = Components.Schemas.GetUserByIdBadRequestResponse;
        }
    }
}

export interface OperationMethods {
  /**
   * getUserById - Get user by ID
   */
  'getUserById'(
    parameters?: Parameters<Paths.GetUserById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserById.Responses.$200>
}

export interface PathsDictionary {
  ['/users/{id}']: {
    /**
     * getUserById - Get user by ID
     */
    'get'(
      parameters?: Parameters<Paths.GetUserById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
