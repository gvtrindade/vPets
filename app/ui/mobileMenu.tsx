import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { LinkItem } from "./linkItem";
import { signOut } from "@/auth";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const iconSize = "size-10";

export function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger>
        <EllipsisHorizontalIcon className={`${iconSize}`} />
      </DrawerTrigger>

      <DrawerContent className="flex flex-col gap-4 p-4">
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
      </DrawerContent>
    </Drawer>
  );
}
