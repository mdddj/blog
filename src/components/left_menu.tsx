import React from "react";
import { appMenuStore } from "@/providers/menu";
import { NavLink } from "@@/exports";

const LeftMenu: React.FC = () => {
  const menus = appMenuStore((state) => state.menus);

  return (
    <div className={"flex-grow"}>
      <div className={" flex flex-col"}>
        {menus.map((value) => {
          return (
            <NavLink
              key={value.href}
              to={value.href}
              className={({ isActive }) =>
                isActive
                  ? "text-bold text-lg bg-primary text-indigo-50 py-1 rounded px-2"
                  : "text-bold text-lg py-1 rounded px-2"
              }
            >
              {value.title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default LeftMenu;
