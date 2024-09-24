import { Pet } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { fetchPetsByUser } from "../data/pet";
import { MAX_NUM_OF_PETS } from "../constants";

type NewPet = {
  name: string;
  petType: number;
  appearance: {
    src: string;
  };
};

export async function getNewPet(
  formData: { name: string; type: number },
  userId: string
) {
  const existingPets = await fetchPetsByUser(userId);
  if (existingPets.length >= MAX_NUM_OF_PETS) {
    throw new Error("You have reached the maximum number of pets");
  }

  const newPet: NewPet = {
    name: formData.name,
    petType: formData.type,
    appearance: {
      src: "",
    },
  };
  const pet = await createPet(newPet);
  await addPetToUser(pet.id, userId);
}

export async function adoptPet(petId: string, userId: string) {
  const existingPets = await fetchPetsByUser(userId);
  if (existingPets.length >= MAX_NUM_OF_PETS) {
    throw new Error("You have reached the maximum number of pets");
  }

  await addPetToUser(petId, userId);
}

async function createPet(pet: NewPet) {
  try {
    const data = await sql<Pet>`
      INSERT INTO pet (name, pet_type_id, appearance) 
      VALUES (${pet.name}, ${pet.petType}, ${pet.appearance.src})
    `;

    return data.rows[0];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to create pet");
  }
}

async function addPetToUser(petId: string, userId: string) {
  try {
    await sql`
      INSERT INTO user_pet (user_id, pet_id) 
      VALUES (${userId}, ${petId})
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to add pet to user");
  }
}

async function removePetFromUser(petId: string, userId: string) {
  try {
    await sql`
      DELETE FROM user_pet
      WHERE user_id = ${userId}
      AND pet_id = ${petId}
    `;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to remove pet from user");
  }
}
