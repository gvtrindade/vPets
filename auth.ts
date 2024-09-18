import { User } from "@/app/lib/definitions";
import { authConfig } from "@/auth.config";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export async function getUserByUsername(username: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`
              SELECT * FROM "user"
              WHERE LOWER(username) = LOWER(${username})
          `;
    return user.rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

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
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user; // The credentials are valid
        }

        return null; // The credentials are invalid
      },
    }),
  ],
});
