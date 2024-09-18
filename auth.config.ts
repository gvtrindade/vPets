import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      // FIX ME: there should be a way to use the correct type here
      session.user.id = token.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnLogin = nextUrl.pathname === "/login";
      const isOnLanding = nextUrl.pathname === "/";
      const isOnSignup = nextUrl.pathname.includes("/signup");
      if (!isOnLanding && !isOnLogin && !isOnSignup && !isLoggedIn) {
        return false;
      } else if ((isOnLogin || isOnSignup) && isLoggedIn) {
        return Response.redirect(new URL("/pets", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
