import NextAuth, { Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./app/api/db";
import checkPass from "./app/features/bcompare";
import { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string; // Add your custom field
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Add your custom field
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 4 },
  jwt: {
    maxAge: 60 * 60 * 4,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required.");
        }

        // Ensure `credentials.username` and `credentials.password` are strings
        const username = credentials.username as string;
        const password = credentials.password as string;

        const dbuser = await prisma.user.findFirst({
          where: {
            username,
          },
        });

        if (!dbuser) {
          throw new Error("Invalid username or password.");
        }

        const pwMatch = checkPass(password, dbuser.password);

        if (!pwMatch) {
          throw new Error("Invalid username or password.");
        }

        user = { id: "66edb898", username: dbuser.username };
        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | { id: string } }) {
      // If user exists (e.g., after login), add the `id` to the token
      if (user && typeof user.id === "string") {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Explicitly assign `id` if it exists and is a string
      session.user.id = typeof token.id === "string" ? token.id : "";

      return session;
    },
  },
});
