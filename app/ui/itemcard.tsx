import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NpcItem, UserItem } from "../lib/definitions";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchItemDataByTag } from "../lib/data/item";

export default async function ItemCard({ item }: { item: UserItem | NpcItem }) {
  const itemData = await fetchItemDataByTag(item.item.tag);

  return (
    <Drawer>
      <DrawerTrigger>
        <Card className="pt-4 pb-2">
          <img src={item.item.imgUrl} className="size-24 mx-auto" />
          <p className="text-center">{itemData.title}</p>
        </Card>
      </DrawerTrigger>

      <DrawerContent className="flex flex-col gap-4 p-4 items-center">
        <DrawerTitle>
          <p className="text-center">{itemData.title}</p>
        </DrawerTitle>

        <img src={item.item.imgUrl} className="size-48 mx-auto" />

        <p className="text-center">{itemData.description}</p>

        {typeof item === "object" ? (
          <>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Options" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Button>Select</Button>
          </>
        ) : (
          <Button>Buy</Button>
        )}
      </DrawerContent>
    </Drawer>
  );
}
