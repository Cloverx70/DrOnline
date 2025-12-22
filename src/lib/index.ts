import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "./exceptions.js";

import type { Response } from "express";

export function handleError(error: any | Error) {
  if (error instanceof NotFoundException)
    throw new NotFoundException(error.message);
  if (error instanceof UnauthorizedException)
    throw new UnauthorizedException(error.message);
  throw new BadRequestException(error.message);
}

export function NewResponse(code: number, message: string, data?: any) {
  return { code, message, data };
}

export function handleResponse(
  res: Response,
  payload: { code: number; message: string; data?: any }
) {
  return res.status(payload.code).json(payload);
}
