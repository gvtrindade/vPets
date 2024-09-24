import Heading from "@/app/ui/heading";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 text-center">
      <Heading>New Pet</Heading>

      <Link href="new/create">Get a new pet!</Link>
      <Link href="new/adopt">Adopt a pet!</Link>
      <Link href="/pets">Go back</Link>
    </div>
  );
}