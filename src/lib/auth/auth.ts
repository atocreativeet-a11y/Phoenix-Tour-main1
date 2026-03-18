// src/lib/auth/auth.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// --- Define a local User type ---
type MyUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
  isAdmin?: boolean;
};

// --- Extend NextAuth types ---
declare module 'next-auth' {
  interface JWT {
    role?: string;
    permissions?: string[];
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      permissions: string[]; // always defined
      isAdmin: boolean;      // always defined
    };
  }
}

// --- NextAuth configuration ---
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials): Promise<MyUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        // Example hardcoded admin (replace with your DB auth)
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            permissions: ['read', 'write'],
            isAdmin: true,
          };
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // --- Map user to JWT ---
    async jwt({ token, user }) {
      if (user) {
        const u = user as MyUser;

        // Cast token so TS knows it has these fields
        const t = token as typeof token & {
          role?: string;
          permissions?: string[];
          isAdmin?: boolean;
        };

        t.role = u.role;
t.permissions = u.permissions ?? [];
t.isAdmin = u.isAdmin ?? false;

        return t;
      }
      return token;
    },

    // --- Map JWT back to session.user with defaults ---
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'user';
        session.user.permissions = token.permissions ?? []; // default empty array
        session.user.isAdmin = token.isAdmin ?? false;      // default false
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);