import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
   NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import {appMenuStore} from "@/providers/menu";
import {NavLink} from "@@/exports";

export default function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menus = appMenuStore((state) => state.menus)
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
            className="sm:hidden"
        />
        <NavbarItem>
         <a className={'font-bold text-lg text-foreground'}>梁典典的博客</a>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menus.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <NavLink
                  className={({isActive})=> isActive ? "w-full text-primary " : "w-full"}
                  to={item.href}
                  onClick={()=>setIsMenuOpen(false)}
                  color={'foreground'}
              >
                {item.title}
              </NavLink>
            </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
