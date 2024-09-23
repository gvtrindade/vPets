import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

type NewUser = {
  username: string;
  email: string;
  password: string;
};

export async function getUserByUsername(
  username: string
): Promise<User | undefined> {
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

export async function getUserByUsernameOrEmail(
  usernameOrEmail: string
): Promise<User | undefined> {
  try {
    const user = await sql<User>`
              SELECT * FROM "user"
              WHERE LOWER(username) = LOWER(${usernameOrEmail}) 
                OR email = ${usernameOrEmail}
          `;
    return user.rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserByToken(token: string) {
  try {
    const user = await sql<User>`
      SELECT u.* FROM "user" u
      JOIN user_token ut ON u.id = ut.user_id
      WHERE token = ${token}
      ORDER BY ut.created_at DESC
      LIMIT 1
    `;
    return user.rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(user: NewUser) {
  try {
    await sql`
      INSERT INTO "user" (username, email, password) 
      VALUES (${user.username}, ${user.email}, ${user.password})
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create user.");
  }
}

export async function updateUser(user: User) {
  try {
    await sql`
      UPDATE "user" SET 
        username = ${user.username}, 
        email = ${user.email}, 
        password = ${user.password},
        coins = ${user.coins},
        is_deleted = ${user.is_deleted},
        is_validated = ${user.is_validated},
        is_admin = ${user.is_admin}
      WHERE id = ${user.id}
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to reset password.");
  }
}

export async function createUserToken(userId: string, token: string) {
  try {
    await sql`
      INSERT INTO user_token (user_id, token) 
      VALUES (${userId}, ${token})
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to save validation token.");
  }
}
