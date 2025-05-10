import { User as DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { TUser } from ".";

type ExtendedUser = {
  id: TUser["id"];
  role: TUser["role"];
  firstName: TUser["firstName"];
  lastName: TUser["lastName"];
};

declare module "next-auth" {
  interface User extends ExtendedUser, DefaultUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedUser, DefaultJWT {}
}
