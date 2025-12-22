export class HttpException extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, 401);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}
