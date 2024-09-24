import { fetchPetTypeByUser } from "@/app/lib/data/pet";
import { PetType } from "@/app/lib/definitions";
import Heading from "@/app/ui/heading";
import { auth } from "@/auth";
import { Suspense } from "react";
import NewPetForm from "./newPetForm";

export default async function Page() {
  const session = await auth();
  if (!session) return null;

  const userId = session.user!.id!;
  const petTypes: PetType[] = await fetchPetTypeByUser(userId);

  return (
    <div className="flex flex-col gap-8 text-center">
      <Heading>New Pet</Heading>

      <Suspense fallback={<p>Loading...</p>}>
        <NewPetForm petTypes={petTypes} userId={userId}  />
      </Suspense>
    </div>
  );
}
