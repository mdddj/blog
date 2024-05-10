import React from "react";
import { appMenuStore } from "@/providers/menu";
import { Link } from "@@/exports";
import ThemeSetting from "./theme_setting";

export default function AppBar() {
  const menus = appMenuStore((state) => state.menus);
  return (
    <header className="navbar fixed bg-base-100 shadow-2xl z-10">
      <div className="navbar-start ">
        <div className="dropdown">
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52"
          >
            {menus.map((item, index) => (
              <li key={`${item.href}-${index}`}>
                <Link to={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          梁典典的博客
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menus.map((item, index) => (
            <li key={`${item.href}-${index}`}>
              <Link to={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <ThemeSetting />
        <button
          onClick={() => {
            let ds = document.getElementById("ds");
            if (ds != null) {
              (ds as HTMLDialogElement).showModal();
            }
          }}
          className="btn btn-sm"
        >
          打赏
        </button>
      </div>
    </header>
  );
}
