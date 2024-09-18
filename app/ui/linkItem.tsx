import Link from "next/link";

export function LinkItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="flex items-center gap-2">
      {children}
    </Link>
  );
}
