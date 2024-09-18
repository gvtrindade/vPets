import Heading from "@/app/ui/heading";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <Heading>Success</Heading>
      <p>Thank you for signing up for Munlore!</p>
      <p>A validation email has been sent to your @</p>
      <p>Please check your inbox</p>
    </div>
  );
}
