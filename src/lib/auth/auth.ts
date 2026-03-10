// src/lib/auth/auth.ts - Fixed Version
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "../mongodb";
import Admin from "../models/Admin";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ No credentials provided");
          throw new Error("Email and password are required");
        }

        try {
          console.log("🔍 Attempting to authorize:", credentials.email);
          
          await connectDB();
          
          // Normalize email to lowercase and trim
          const normalizedEmail = credentials.email.toLowerCase().trim();
          console.log("📧 Searching for admin with email:", normalizedEmail);
          
          // Find admin
          const admin = await Admin.findOne({ email: normalizedEmail });
          
          if (!admin) {
            console.log("❌ No admin found with email:", normalizedEmail);
            throw new Error("Invalid credentials");
          }

          // Check if account is active
          if (admin.isActive === false) {
            console.log("❌ Admin account is inactive:", admin.email);
            throw new Error("Account is deactivated");
          }

          console.log("✅ Admin found:", {
            id: admin._id,
            email: admin.email,
            name: admin.name,
            hasPassword: !!admin.password,
            passwordLength: admin.password?.length,
            isActive: admin.isActive
          });

          // Try multiple comparison methods
          let passwordsMatch = false;
          
          // Method 1: Use bcrypt directly
          try {
            console.log("🔄 Attempting bcrypt comparison...");
            passwordsMatch = await bcrypt.compare(credentials.password.trim(), admin.password);
            console.log("🔑 Bcrypt comparison result:", passwordsMatch);
          } catch (bcryptError) {
            console.error("❌ Bcrypt comparison error:", bcryptError);
          }

          // Method 2: Use model method if direct bcrypt fails
          if (!passwordsMatch) {
            try {
              console.log("🔄 Attempting model comparePassword method...");
              passwordsMatch = await admin.comparePassword(credentials.password.trim());
              console.log("🔑 Model method result:", passwordsMatch);
            } catch (modelError) {
              console.error("❌ Model method error:", modelError);
            }
          }

          // Debug info if still not matching
          if (!passwordsMatch) {
            console.log("❌ Password comparison failed. Debug info:");
            console.log("   Entered password:", credentials.password);
            console.log("   Entered password length:", credentials.password.length);
            console.log("   Stored hash prefix:", admin.password.substring(0, 30) + "...");
            console.log("   Stored hash length:", admin.password.length);
            console.log("   Hash algorithm:", admin.password.substring(0, 4));
            console.log("   Is bcrypt hash:", admin.password.startsWith('$2'));
            
            // For debugging - what would a new hash look like?
            const testHash = await bcrypt.hash(credentials.password, 10);
            console.log("   Test hash prefix:", testHash.substring(0, 30) + "...");
            console.log("   Test hash length:", testHash.length);
            
            throw new Error("Invalid credentials");
          }

          console.log("✅ Login successful for:", admin.email);
          
          // Update last login timestamp
          try {
            await Admin.findByIdAndUpdate(admin._id, { 
              lastLogin: new Date(),
              updatedAt: new Date()
            });
            console.log("📝 Updated last login timestamp");
          } catch (updateError) {
            console.error("⚠️ Failed to update last login:", updateError);
          }
          
          // Return user with ALL required properties
          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
            role: admin.role || "admin",
            permissions: admin.permissions || [], // Add this
            isAdmin: true // Add this
          } as User;
          
        } catch (error: any) {
          console.error("🔥 Auth error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
          });
          
          if (error.message.includes("Invalid credentials") || 
              error.message.includes("Account is deactivated")) {
            throw error;
          }
          
          throw new Error("Authentication failed. Please try again.");
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: "/dashboard/login",
    error: "/dashboard/login",
  },
  
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
        token.permissions = (user as any).permissions || [];
        token.isAdmin = (user as any).isAdmin || false;
      }
      
      // Handle session updates
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.email = session.user.email;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.image = null; // Clear image if not used
      }
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
  
  // Security settings
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
};