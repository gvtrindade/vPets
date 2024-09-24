"use server";

import { sql } from "@vercel/postgres";
import { Pet, PetListing, PetType } from "@/app/lib/definitions";

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

export async function fetchPetTypeByUser(userId: string) {
  const data = await sql<PetType>`
    SELECT * FROM pet_type pt`;

  return data.rows;
}

export async function fetchOrphanPets() {
  const data = await sql<Pet>`
    SELECT p.id, p.name, p.appearance FROM pet p
    LEFT JOIN user_pet up ON up.pet_id = p.id
    WHERE up.user_id IS NULL
    ORDER BY RANDOM()
    LIMIT 3`;

  return data.rows;
}
