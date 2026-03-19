import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TEMP USER (for testing)
        if (
          credentials?.email === "admin@phoenixethiopiatours.com" &&
          credentials?.password === "fre123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@test.com",
            role: "admin",
            permissions: ["all"],
            isAdmin: true,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions || [];
        token.isAdmin = user.isAdmin || false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };