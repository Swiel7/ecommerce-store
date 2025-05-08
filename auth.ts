import { loginSchema } from "@/lib/validations";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/actions/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = loginSchema.parse({
            ...credentials,
            remember: credentials.remember === "false" ? false : true,
          });

          const user = await getUserByEmail(email);
          if (!user) return null;

          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) return null;

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
});
