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

      const isOnLanding = nextUrl.pathname === "/";
      const isOnLogin = nextUrl.pathname.includes("/login");
      const isOnSignup = nextUrl.pathname.includes("/signup");
      const isOnPasswordReset = nextUrl.pathname.includes("/forgot-password");
      if (
        !isOnLanding &&
        !isOnLogin &&
        !isOnSignup &&
        !isOnPasswordReset &&
        !isLoggedIn
      ) {
        return false;
      } else if ((isOnLogin || isOnSignup || isOnPasswordReset) && isLoggedIn) {
        return Response.redirect(new URL("/pets", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
