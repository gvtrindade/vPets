import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

type NewUser = {
  username: string;
  email: string;
  password: string;
};

export async function createUser(user: NewUser) {
  try {
    await sql`INSERT INTO "user" (username, email, password) VALUES (${user.username}, ${user.email}, ${user.password})`;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create user.");
  }
}

export async function sendValidationEmail(email: string) {
  console.log("Sending confirmation email to:", email);

  const emailToken = randomUUID();
}
