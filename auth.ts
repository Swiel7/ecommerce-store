import { db } from "@/db";
import { users } from "@/db/schema";
import { loginSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import NextAuth, { CredentialsSignin } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user) throw CredentialsSignin;

          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) throw CredentialsSignin;

          return {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.image,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
});
