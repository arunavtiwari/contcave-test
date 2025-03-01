import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Helper function to refresh the Google Calendar access token.
async function refreshCalendarAccessToken(token: any) {
  try {
    const url = "https://oauth2.googleapis.com/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.calendarRefreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      calendarAccessToken: refreshedTokens.access_token,
      // Set new expiry time (current time + expires_in seconds)
      calendarAccessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // Use new refresh token if provided, else fallback to existing one
      calendarRefreshToken: refreshedTokens.refresh_token ?? token.calendarRefreshToken,
    };
  } catch (error) {
    console.error("Error refreshing calendar access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Basic Google
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    // Google Calendar
    GoogleProvider({
      id: "google-calendar",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    // Normal
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        if (account.provider === "google-calendar") {
          token.calendarAccessToken = account.access_token;
          token.calendarRefreshToken = account.refresh_token;
          token.calendarAccessTokenExpires = Date.now() + (Number(account.expires_in) * 1000);
        } else if (account.provider === "google") {
          token.accessToken = account.access_token;
        }
        return token;
      }

      if (
        token.calendarAccessToken &&
        token.calendarAccessTokenExpires &&
        Date.now() < Number(token.calendarAccessTokenExpires)
      ) {
        return token;
      }

      if (token.calendarRefreshToken) {
        return await refreshCalendarAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.calendarAccessToken = token.calendarAccessToken as string | undefined;
      session.calendarRefreshToken = token.calendarRefreshToken as string | undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
