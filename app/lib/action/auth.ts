"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  createUser,
  createUserToken,
  getUserByToken,
  getUserByUsername,
  getUserByUsernameOrEmail,
  updateUser,
} from "@/app/lib/action/user";
import { randomUUID } from "crypto";
import { sendEmail } from "./email";
import { EmailData } from "../definitions";

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

    const emailToken = randomUUID();
    await createUserToken(username, emailToken);

    const emailData: EmailData = {
      username: newUser.username,
      email: newUser.email,
      token: emailToken,
      subject: "Welcome to Munlore",
      template: "signup",
    };
    await sendEmail(emailData);
  }
}

export async function validateUser(token: string) {
  const user = await getUserByToken(token);
  if (user) {
    await updateUser({ ...user, is_validated: true });
  }
}

export async function authenticateToken(token: string) {
  await getUserByToken(token);
}

export async function forgotPassword(formData: any) {
  const parsedCredentials = z
    .object({
      usernameOrEmail: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { usernameOrEmail } = parsedCredentials.data;
    const user = await getUserByUsernameOrEmail(usernameOrEmail);

    if (!user) return null;

    const emailToken = randomUUID();
    await createUserToken(user.id, emailToken);

    const emailData: EmailData = {
      username: user.username,
      email: user.email,
      token: emailToken,
      subject: "Reset Password",
      template: "forgot-password",
    };
    await sendEmail(emailData);
  }
}

export async function resetPassword(formData: any, token: string) {
  const parsedCredentials = z
    .object({
      password: z.string(),
    })
    .safeParse(formData);

  if (parsedCredentials.success) {
    const { password } = parsedCredentials.data;
    const user = await getUserByToken(token);

    if (!user) return null;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
      ...user,
      password: hashedPassword,
    };

    await updateUser(updatedUser);
  }
}
