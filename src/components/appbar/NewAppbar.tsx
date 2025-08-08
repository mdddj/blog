import { appMenuStore, MenuModal } from "@/providers/menu";
import { List, ListItem } from "../idea-ui";

export function NewAppbar() {
  const menus = appMenuStore((s) => s.menus);
  const items: ListItem[] = menus.map(menuItem);
  function menuItem(item: MenuModal): ListItem {
    return {
      id: item.title,
      content: item.title,
    };
  }
  return <List items={items}></List>;
}
