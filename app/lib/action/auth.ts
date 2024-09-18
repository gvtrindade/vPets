"use server";

import { getUserByUsername, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createUser, sendValidationEmail } from "@/app/lib/action/user";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return "Invalid Credentials";
        default:
          return "Something went wrong";
      }
    }

    throw err;
  }
}

export async function signUp(formData: any) {
  const parsedCredentials = z
    .object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { username, password, email } = parsedCredentials.data;
    const user = await getUserByUsername(username);

    if (user) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    await createUser(newUser);
    await sendValidationEmail(email);
  }
}
