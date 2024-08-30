import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return <h3 className="text-xl italic text-center">{children}</h3>;
}
