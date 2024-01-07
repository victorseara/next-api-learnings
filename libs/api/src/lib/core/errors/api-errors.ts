export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        details: this.details,
      },
    };
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, details: unknown) {
    super(400, message, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(500, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(403, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(401, message);
  }
}

export class BadGatewayError extends ApiError {
  constructor(message: string) {
    super(502, message);
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message: string) {
    super(503, message);
  }
}
