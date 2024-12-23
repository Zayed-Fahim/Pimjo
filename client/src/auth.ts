import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialProvider({
      name: "Credentials",
      type: "credentials",

      authorize: async function (
        credentials: Partial<Record<string, unknown>>
      ) {
        if (!credentials) return null;
        const user = {
          _id: credentials?._id as string,
          username: credentials?.username as string,
          accessToken: credentials?.accessToken as string,
          email: credentials?.email as string,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.token = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.accessToken = token.token as string;
      }
      return session;
    },
  },
});
