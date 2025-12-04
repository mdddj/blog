import { Outlet } from "umi";
import { GlassNavbar } from "@/components/glass";
import { useEffect } from "react";
import { useLocation } from "@@/exports";
import { MyRewardDialog } from "@/components/alert_modal";
import Foot from "@/components/foot";
import WriteButton from "@/components/write_button";
import { configure } from "axios-hooks";
import axiosInstance from "@/tools/api";
import "../main.css";
configure({ axios: axiosInstance });

export default function Layout() {
  const nav = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    if (document && nav.pathname !== "/") {
      if (document?.documentElement || document?.body) {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
  }, [nav.pathname]);

  // Enable theme transitions after initial render (Requirements 8.4)
  // This prevents flash of unstyled content during initial page load
  useEffect(() => {
    // Small delay to ensure CSS has loaded and applied
    const timer = setTimeout(() => {
      document.documentElement.setAttribute('data-theme-ready', 'true');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // return <main className="flex flex-col gap-5 h-screen relative">
  //   <div></div>
  //   <div className="flex flex-row gap-2">
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //   </div>
  //   <div></div>
  // </main>
  // IDE-style layout

  return (
    <div
      data-act-class="ACTIVECLASS"
      className={"flex flex-col gap-5 min-h-screen relative"}
    >
      <GlassNavbar />
      {/* Main content with top padding to account for fixed navbar (56px + spacing) */}
      <main className={"grow mt-20 container mx-auto lg:max-w-5xl p-3 relative"}>
        <Outlet />
        <MyRewardDialog />
      </main>
      <Foot />
      <WriteButton />
    </div>
  );
}
