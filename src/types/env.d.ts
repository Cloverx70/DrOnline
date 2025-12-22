import { User } from "./../modules/auth/user.entity";
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
  }
}
