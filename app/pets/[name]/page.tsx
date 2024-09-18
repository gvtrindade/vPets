import { fetchPetByName } from "@/app/lib/data/pet";
import { Pet } from "@/app/lib/definitions";
import Heading from "@/app/ui/heading";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { name: string } }) {
  const session = await auth();

  if (!session) return null;

  const passedName = params.name;
  const petData: Pet = await fetchPetByName(session.user!.id!, passedName);
  const shownData: { [key: string]: string } = {
    hp: "HP",
    intelligence: "Intelligence",
    hunger: "Hunger",
  };

  return (
    <>
      <Heading>Pet Page</Heading>
      <br />

      <div>
        <img src={petData.appearance.src} className="size-48 mx-auto" />
        <p className="text-center">{petData.name}</p>
        <ul className="w-full px-4">
          {Object.entries(petData).map(
            ([key, value]) =>
              shownData[key] &&
              !(value instanceof Object) && (
                <li key={key} className="flex justify-between">
                  <p className="font-bold">{shownData[key]}</p>
                  <p>{value}</p>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
}
