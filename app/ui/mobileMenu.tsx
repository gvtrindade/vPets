import { auth, signOut } from "@/auth";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { LinkItem } from "./linkItem";

const iconSize = "size-10";

export async function MobileMenu() {
  const session = await auth();

  return (
    <Drawer>
      <DrawerTrigger>
        <EllipsisHorizontalIcon className={`${iconSize}`} />
      </DrawerTrigger>

      <DrawerContent className="flex flex-col gap-4 p-4">
        {session ? <ItemsWhenLogged /> : <ItemsWhenNotLogged />}
      </DrawerContent>
    </Drawer>
  );
}

function ItemsWhenLogged() {
  return (
    <>
      <LinkItem href="/settings">
        <Cog6ToothIcon className={`${iconSize}`} />
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
