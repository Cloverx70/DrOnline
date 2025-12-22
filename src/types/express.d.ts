import type { User } from "../modules/auth/user.entity.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    token?: string;
  }
}
