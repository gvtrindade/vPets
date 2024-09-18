"use server";

import { sql } from "@vercel/postgres";
import { Pet, PetListing } from "@/app/lib/definitions";

export async function fetchPetsByUser(userId: string) {
  const data = await sql<PetListing>`
    SELECT p.id, p.name, p.appearance FROM pet p
    INNER JOIN user_pet up ON up.pet_id = p.id
    WHERE up.user_id = ${userId}`;

  return data.rows;
}

export async function fetchPetByName(userId: string, name: string) {
  const data = await sql<Pet>`
    SELECT * FROM pet p
    INNER JOIN user_pet up ON up.pet_id = p.id
    WHERE up.user_id = ${userId} AND p.name = ${name}
    LIMIT 1`;

  return data.rows[0];
}
