"use client";
import { adoptPet } from "@/app/lib/action/pet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PetOptions({
  avaliablePets,
  userId,
}: {
  avaliablePets: { id: string; name: string; appearance: { src: string } }[];
  userId: string;
}) {
  const router = useRouter();
  const handleClick = async (petId: string) => {
    await adoptPet(petId, userId);
    router.push("/pets");
  };

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
      {avaliablePets.map((pet, key) => (
        <div key={key} className="flex flex-col gap-4 items-center">
          <img src={pet.appearance.src} className="size-48 mx-auto" />
          <Button onClick={() => handleClick(pet.id)}>{pet.name}</Button>
        </div>
      ))}
    </div>
  );
}
