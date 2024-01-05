import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button, Tabs, Tab,
} from "@nextui-org/react";
import React from "react";

export default function AppBar() {


  return (
    <Navbar>
      <NavbarContent>
        <NavbarItem>
         <a className={'font-bold text-lg text-foreground'}>梁典典的博客</a>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}
