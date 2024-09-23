import { getUserByUsername } from "@/app/lib/action/user";
import { authConfig } from "@/auth.config";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUserByUsername(username);

          if (!user) return null;
          if (!user.is_validated) return null; //TODO Return missing validation error

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user; // The credentials are valid
        }

        return null; // The credentials are invalid
      },
    }),
  ],
});
