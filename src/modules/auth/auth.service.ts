import {
  BadRequestException,
  NotFoundException,
} from "../../lib/exceptions.js";

import { AppDataSource } from "../../data-source.js";
import { User } from "./user.entity.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { handleError } from "../../lib/index.js";
import jwt from "jsonwebtoken";
import type { loginDto } from "./dtos/login.dto.js";
import type { registerDto } from "./dtos/register.dto.js";

dotenv.config();

export class AuthService {
  private UserRepo = AppDataSource.getRepository(User);

  async register(registerDto: registerDto) {
    try {
      const Exists = await this.UserRepo.findOneBy({
        email: registerDto.email,
      });

      if (Exists)
        throw new BadRequestException("user with same email already exists");

      const newUser = this.UserRepo.create({
        ...registerDto,
        password: await bcrypt.hash(registerDto.password, 10),
      });

      await this.UserRepo.save(newUser);

      return {
        code: 201,
        message: "registered successfully",
      };
    } catch (error) {
      handleError(error);
    }
  }

  async validate(loginDto: loginDto) {
    try {
      const exists = await this.UserRepo.findOneBy({ email: loginDto.email });

      if (!exists) return null;

      const isValid = await bcrypt.compare(loginDto.password, exists.password);
      if (!isValid) return null;

      return exists;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  generateJWT(payload: any) {
    return jwt.sign({ ...payload }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
  }
}
