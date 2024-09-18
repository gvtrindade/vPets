export function fetchItemDataByTag(tag: string) {
  switch (tag) {
    case "sword":
      return { title: "Sword", description: "Sword description" };
    case "potion":
      return { title: "Potion", description: "Potion description" };
    default:
      return { title: "Item", description: "Item description" };
  }
}
