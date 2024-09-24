import { UserItem } from "../lib/definitions";
import Heading from "../ui/heading";
import ItemCard from "../ui/itemcard";

const items: UserItem[] = [
  {
    item: {
      id: "1",
      tag: "sword",
      img_url: "/sword.png",
      status_effect: ["+10 attack"],
    },
    is_stored: false,
  },
  {
    item: {
      id: "2",
      tag: "potion",
      img_url: "/potion.png",
      status_effect: ["+10 health"],
    },
    is_stored: false,
  },
];

export default function Page() {
  return (
    <>
      <Heading>Inventory</Heading>

      <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-4 max-w-3xl mx-auto">
        {items.map((item) => (
          <ItemCard key={item.item.id} item={item} />
        ))}
      </div>
    </>
  );
}
