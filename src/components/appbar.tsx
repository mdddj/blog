import React, {useEffect, useRef} from "react";
import {appMenuStore} from "@/providers/menu";
import {showDialogModal} from "@/tools/fun";
import {NavLink, useMatch} from "@@/exports";
import MiniAppWidget from "@/components/mini_app_widget";
import MyDocMenuElement from "@/components/doc_menu";
import { history } from 'umi';
import { motion } from "framer-motion";
import {SearchButton} from "@/components/search";
import MobileAppNavbar from "./mobile";
import MenuSvgIcon from "./menu_svg_icon";


const AppbarTitle : React.FC = () => {
    const GetShowTitle = () => {
        return "典典博客"
    }

    const title = GetShowTitle()
    return <>
        <NavLink to={"/"} className="text-xl font-bold">
            <motion.p
                key={title} // 使用 key 来触发动画
                initial={{ opacity: 0, y: 10 }}  // 初始状态：透明且稍微向下
                animate={{ opacity: 1, y: 0 }}   // 动画到：完全显示且位置恢复
                exit={{ opacity: 0, y: -10 }}    // 离开时的动画：透明且向上
                transition={{ duration: 0.5 }}   // 过渡时间
            >
                {title}
            </motion.p>
        </NavLink>
    </>
}

export default function AppBar() {
    const menus = appMenuStore((state) => state.menus);
    const ref = useRef<HTMLDivElement>(null);


    //关闭弹出菜单
    const closeMenu = () => {
        if (ref.current) {
            ref.current.removeAttribute("open")
        }
    }

    useEffect(() => {
        const unListen = history.listen(() => {
            closeMenu()
        });

        return () => {
            unListen();
        };
    }, [history]);

    return (
        <header className="navbar fixed bg-base-100 z-10 shadow-2xl">
            <div className="navbar-start">
                <div className="dropdown" ref={ref}>
                    <div tabIndex={0}  role="button"  className="btn btn-ghost lg:hidden">   <MenuSvgIcon />   </div>
                    <ul tabIndex={0}
                    className="menu dropdown-content  bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        {menus.map((item, index) => (
                            <li key={`item:${item.title}-${index}`}>
                                {
                                    item.href && <li onClick={closeMenu}>
                                        <NavLink to={item.href}>{item.title}</NavLink>
                                    </li>
                                }
                                {item.isDoc && <MyDocMenuElement onClick={closeMenu}/>}
                            </li>


                        ))}
                    </ul>
                </div>
                <div className={'flex flex-row gap-2 text-center items-center'}>
                    <AppbarTitle />
                    <div className={'dropdown dropdown-bottom hidden lg:inline'}>
                        <span tabIndex={0} role="button"
                              className={'badge badge-accent badge-outline hover:bg-accent hover:text-secondary-content cursor-pointer'}>在小程序打开</span>
                        <MiniAppWidget/>
                    </div>
                </div>
            </div>
            <MobileAppNavbar  closeMenu={closeMenu}/>
            <div className="navbar-end gap-4">
                <SearchButton />
                <button
                    type="button"
                    onClick={() => showDialogModal('ds')}
                    className="btn btn-sm"
                >
                    打赏
                </button>
            </div>
        </header>
    );
}
