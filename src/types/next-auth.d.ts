import { User as DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

type ExtendedUser = {
  id: string;
  role: "CUSTOMER" | "ADMIN";
  firstName: string;
  lastName: string;
};

declare module "next-auth" {
  export interface User extends ExtendedUser, DefaultUser {}
}

declare module "next-auth/jwt" {
  export interface JWT extends ExtendedUser, DefaultJWT {}
}
