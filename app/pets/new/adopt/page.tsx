import { fetchOrphanPets } from "@/app/lib/data/pet";
import Heading from "@/app/ui/heading";
import { auth } from "@/auth";
import { Suspense } from "react";
import PetOptions from "./petOptions";

export default async function Page() {
  const session = await auth();
  if (!session) return null;

  const userId = session.user!.id!;
  const avaliablePets = await fetchOrphanPets();

  return (
    <div className="flex flex-col gap-8 text-center">
      <Heading>Adopt a Pet</Heading>

      <Suspense fallback={<p>Loading...</p>}>
        <PetOptions avaliablePets={avaliablePets} userId={userId} />
      </Suspense>
    </div>
  );
}
