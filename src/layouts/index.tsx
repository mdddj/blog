import { Outlet } from "umi";
import AppBar from "@/components/appbar";
import React, { useEffect } from "react";
import { useLocation } from "@@/exports";
import { MyRewardDialog } from "@/components/alert_modal";
import Foot from "@/components/foot";
import WriteButton from "@/components/write_button";
import {configure} from "axios-hooks";
import axiosInstance from "@/tools/api";
import "../main.css"
configure({ axios: axiosInstance })
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
    <div
      data-act-class="ACTIVECLASS"
      className={"flex flex-col gap-5 h-screen relative"}
    >
      <AppBar />
      <main className={"flex-grow mt-24 container mx-auto lg:max-w-5xl p-3"}>
        <Outlet />
        <MyRewardDialog />
      </main>
      <Foot />
      <WriteButton />

    </div>
  );
}
