import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Bars3Icon,
  EllipsisHorizontalIcon,
  FolderIcon,
  GlobeAltIcon,
  PlayIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | VPets",
    default: "VPets",
  },
  description: "The latest virtual pets game!",
};

const IconSize = "size-10";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between items-center py-4 px-4 bg-pink">
          <Bars3Icon className="size-12 opacity-0 md:opacity-100" />

          <h4 className="pl-10">
            <Link href="/">VPets</Link>
          </h4>

          <div>
            <p>00:00:00</p>
            <p className="text-[10px] text-right"> UST</p>
          </div>
        </header>

        <main className="mt-6 px-4">{children}</main>

        <footer className="bg-pink py-2 px-4 absolute w-full bottom-6 md:hidden">
          <div
            id="icons"
            className="flex justify-between items-center z-20 relative"
          >
            <Link href="/pets">
              <UserIcon className={`${IconSize}`} />
            </Link>
            <Link href="/inventory">
              <FolderIcon className={`${IconSize}`} />
            </Link>
            <Link href="/pets">
              <GlobeAltIcon className={`${IconSize}`} />
            </Link>
            <Link href="/games">
              <PlayIcon className={`${IconSize}`} />
            </Link>
            <Link href="/settings">
              <EllipsisHorizontalIcon className={`${IconSize}`} />
            </Link>
          </div>
          <div
            id="center-circle"
            className="bg-sand py-8 px-8 rounded-full absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          ></div>
        </footer>
      </body>
    </html>
  );
}
