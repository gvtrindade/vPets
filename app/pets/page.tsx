import Link from "next/link";

export type Pet_type = {
  id: number;
  name: string;
}

export type Pet = {
  id: string;
  name: string;
  hp: number;
  intelligence: number;
  hunger: number;
  appearance: JSON;
  pet_type_id: number;
}

export default function Page() {
  const pets = ["dog"];

  return (
    <>
      <h3>Pets</h3>
      <ul>
        {pets.map((pet) => (
          <li key={pet}>
            <Link href={`/pets/${pet}`}>{pet}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
