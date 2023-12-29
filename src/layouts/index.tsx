import { Link, Outlet } from "umi";
import { NextUIProvider } from "@nextui-org/react";
import css from "../../tailwind.css";
import AppBar from "@/components/appbar";

export default function Layout() {
  return (
    <NextUIProvider>
      <div>
        <AppBar />
        <div className="container mx-auto max-w-5xl p-5">
          <Outlet />
        </div>
      </div>
    </NextUIProvider>
  );
}
