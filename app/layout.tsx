import {
  FolderIcon,
  GlobeAltIcon,
  PlayIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import { DesktopMenu } from "./ui/desktopMenu";
import { MobileMenu } from "./ui/mobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | VPets",
    default: "VPets",
  },
  description: "The latest virtual pets game!",
};

const iconSize = "size-10";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between items-center py-4 px-4 bg-pink">
          <DesktopMenu />

          <h4 className="pl-10">
            <Link href="/">VPets</Link>
          </h4>

          <div>
            <p>00:00</p>
            <p className="text-[10px] text-right"> UST</p>
          </div>
        </header>

        <main className="mt-6 px-4 pb-20">{children}</main>

        <footer className="bg-pink py-2 px-4 fixed w-full bottom-6 md:hidden">
          <div
            id="icons"
            className="flex justify-between items-center z-20 relative"
          >
            <Link href="/pets">
              <UserIcon className={`${iconSize}`} />
            </Link>
            <Link href="/inventory">
              <FolderIcon className={`${iconSize}`} />
            </Link>
            <Link href="/mythara/westkey-village">
              <GlobeAltIcon className={`${iconSize}`} />
            </Link>
            <Link href="/games">
              <PlayIcon className={`${iconSize}`} />
            </Link>
            <MobileMenu />
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
