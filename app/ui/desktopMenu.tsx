import { auth, signOut } from "@/auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  FolderIcon,
  GlobeAltIcon,
  PlayIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { LinkItem } from "./linkItem";

const iconSize = "size-8";

export async function DesktopMenu() {
  const session = await auth();

  return (
    <Sheet>
      <SheetTrigger>
        <Bars3Icon className="size-12 opacity-0 md:opacity-100" />
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col gap-4 pt-12">
        {session ? <ItemsWhenLogged /> : <ItemsWhenNotLogged />}
      </SheetContent>
    </Sheet>
  );
}

export function ItemsWhenLogged() {
  return (
    <>
      <LinkItem href="/pets">
        <UserIcon className={`${iconSize}`} />
        <span>Pets</span>
      </LinkItem>
      <LinkItem href="/inventory">
        <FolderIcon className={`${iconSize}`} />
        <span>Inventory</span>
      </LinkItem>
      <LinkItem href="/mythara/westkey">
        <GlobeAltIcon className={`${iconSize}`} />
        <span>World</span>
      </LinkItem>
      <LinkItem href="/games">
        <PlayIcon className={`${iconSize}`} />
        <span>Games</span>
      </LinkItem>
      <LinkItem href="/settings">
        <EllipsisHorizontalIcon className={`${iconSize}`} />
        <span>Settings</span>
      </LinkItem>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>
          <div className="flex items-center gap-2">
            <ArrowLeftStartOnRectangleIcon className={`${iconSize}`} />
            <span>Sign Out</span>
          </div>
        </button>
      </form>
    </>
  );
}

function ItemsWhenNotLogged() {
  return (
    <>
      <LinkItem href="/login">
        <ArrowRightEndOnRectangleIcon className={`${iconSize}`} />
        <span>Login</span>
      </LinkItem>
    </>
  );
}
