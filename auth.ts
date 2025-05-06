import { db } from "@/db";
import { users } from "@/db/schema";
import { loginSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import NextAuth, { CredentialsSignin } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        try {
          const { email, password } = loginSchema.parse({
            ...credentials,
            remember: false,
          });

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
  callbacks: {
    authorized: async ({ auth, request }) => {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      const authPaths = [];

      // const { pathname } = request.nextUrl;
      // if (protectedPaths.some((p) => p.test(pathname))) return !!auth;

      // return false;
      return !auth?.user;
    },
  },
});
