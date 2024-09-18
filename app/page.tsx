import Link from "next/link";
import Heading from "@/app/ui/heading";

export default function Home() {
  return (
    <>
      <Heading>Welcome to the world of Munlore!</Heading>

      <ul>
        <li>
          <Link href="/pets">Pets</Link>
        </li>
      </ul>
    </>
  );
}
