import Link from "next/link";
import { PetListing } from "@/app/lib/definitions";
import { fetchPetsByUser } from "@/app/lib/data/pet";
import Heading from "@/app/ui/heading";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session) return null;

  const pets: PetListing[] = await fetchPetsByUser(session.user!.id!);

  return (
    <div className="flex flex-col gap-8">
      <Heading>Pets</Heading>

      <ul>
        {pets.map((pet) => (
          <li key={pet.name}>
            <Link href={`/pets/${pet.name}`}>
              <img src={pet.appearance.src || ""} className="size-24 mx-auto" />
              <p className="text-center">{pet.name}</p>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/pets/new">Get a new pet!</Link>
    </div>
  );
}
