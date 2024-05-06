import { Outlet } from "umi";
import AppBar from "@/components/appbar";
import { useEffect } from "react";
import RightMenu from "@/components/right_menu";
import { useLocation } from "@@/exports";

export default function Layout() {
  const nav = useLocation();
  useEffect(() => {
    if (document && nav.pathname !== "/") {
      if (document?.documentElement || document?.body) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
  }, [nav.pathname]);
  return (
      <div className={" flex flex-row container container-sm mx-auto gap-5  h-max"}>

        <div className={"grow w-64"}>
          <AppBar />
          <div className={"p-5"}>
            <Outlet />
          </div>
        </div>

        <div
          className={"flex-none w-72  py-5  h-screen  sticky top-0 hidden lg:flex lg:flex-col overflow-y-auto"}
        >
          <RightMenu />
        </div>
      </div>
  );
}
