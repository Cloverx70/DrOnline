import type { NextFunction, Request, Response } from "express";

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoObj, {
      whitelist: true, // remove unknown fields
      forbidNonWhitelisted: true, // block unknown fields
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((e) => e.constraints),
      });
    }

    req.body = dtoObj; // sanitized DTO
    next();
  };
}
