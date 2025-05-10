import { loginSchema } from "@/lib/validations";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/services/user";
import { authRoutes, protectedRoutes } from "@/lib/routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const parsedCredentials = loginSchema.safeParse({
          ...credentials,
          remember: credentials.remember === "false" ? false : true,
        });

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          const isPasswordValid = await compare(password, user.password);

          if (isPasswordValid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;
      if (user?.firstName) token.firstName = user.firstName;
      if (user?.lastName) token.lastName = user.lastName;

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
    authorized({ request, auth }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname))
        return false;

      if (isLoggedIn && authRoutes.includes(nextUrl.pathname))
        return Response.redirect(new URL("/", nextUrl));

      return true;
    },
  },
});
