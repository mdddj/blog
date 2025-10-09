import React, { useEffect, useState } from "react";
import { appMenuStore } from "@/providers/menu";
import { showDialogModal } from "@/tools/fun";
import { NavLink } from "@@/exports";
import MiniAppWidget from "@/components/mini_app_widget";
import MyDocMenuElement from "@/components/doc_menu";
import { history } from "umi";
import { motion } from "framer-motion";
import { SearchButton } from "@/components/search";
import MenuSvgIcon from "./menu_svg_icon";
import { categoryStore } from "@/providers/category";
import CompactSystemMonitor from "./system_monitor_compact";

const AppbarTitle: React.FC = () => {
  const GetShowTitle = () => {
    return "典典博客";
  };

  const title = GetShowTitle();
  return (
    <>
      <NavLink to={"/"} className="text-xl font-bold">
        <motion.p
          key={title} // 使用 key 来触发动画
          initial={{ opacity: 0, y: 10 }} // 初始状态：透明且稍微向下
          animate={{ opacity: 1, y: 0 }} // 动画到：完全显示且位置恢复
          exit={{ opacity: 0, y: -10 }} // 离开时的动画：透明且向上
          transition={{ duration: 0.5 }} // 过渡时间
        >
          {title}
        </motion.p>
      </NavLink>
    </>
  );
};
const useScrollShadow = (threshold = 10) => {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowShadow(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return showShadow;
};
export default function AppBar() {
  const menus = appMenuStore((state) => state.menus);
  const docs = categoryStore((state) => state.data?.ideaDocs) ?? [];
  const showShadow = useScrollShadow(10);
  useEffect(() => {
    const unListen = history.listen(() => { });

    return () => {
      unListen();
    };
  }, []);


  return (
    <header className={`navbar fixed bg-base-100 z-10 ${showShadow ? 'shadow-2xl' : 'shadow-none'}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            {" "}
            <MenuSvgIcon />{" "}
          </div>
        </div>
        <div className={"flex flex-row gap-2 text-center items-center"}>
          <AppbarTitle />
          <div className={"dropdown dropdown-bottom hidden lg:inline"}>
            <span
              tabIndex={0}
              role="button"
              className={
                "badge badge-accent badge-outline hover:bg-accent hover:text-secondary-content cursor-pointer"
              }
            >
              在小程序打开
            </span>
            <MiniAppWidget />

          </div>
          {/* <MobileAppNavbar closeMenu={function (): void {}} /> */}
          <div className="hidden lg:block"><CompactSystemMonitor /></div>
        </div>
      </div>
      <div className="navbar-center">
        <ul tabIndex={0} className="menu menu-horizontal px-1">
          {menus.map((item, index) => {
            if (item.isDoc && docs.length === 0) {
              return null;
            }
            return <li key={`item:${item.title}-${index}`}>
              {item.href && !item.isDoc && (
                <NavLink
                  onClick={(_) => {
                    // @ts-ignore
                    document.activeElement?.blur();
                  }}
                  to={item.href}
                >
                  {item.title}
                </NavLink>
              )}
              {item.isDoc && docs.length > 0 && <MyDocMenuElement />}
            </li>
          })}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <SearchButton />
        <button
          type="button"
          onClick={() => showDialogModal("ds")}
          className="btn btn-sm"
        >
          打赏
        </button>
      </div>
    </header>
  );
}
