import React, {useEffect, useRef} from "react";
import {appMenuStore} from "@/providers/menu";
import ThemeSetting from "./theme_setting";
import {showDialogModal} from "@/tools/fun";
import {NavLink, useMatch} from "@@/exports";
import MiniAppWidget from "@/components/mini_app_widget";
import MyDocMenuElement from "@/components/doc_menu";
import { history } from 'umi';
import { motion } from "framer-motion";



const AppbarTitle : React.FC = () => {
    const match = useMatch('/idea/:title')
    const docTitle = match ? match.params.title : undefined;

    const GetShowTitle = () => {
        if(docTitle){
            return "典典博客-"+docTitle
        }
        return "典典博客"
    }

    const title = GetShowTitle()
    return <>
        <NavLink to={"/"} className="btn btn-ghost text-xl">
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
    const ref = useRef<HTMLDetailsElement>(null);


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
        <header className="navbar fixed bg-base-100 z-10 shadow">
            <div className="navbar-start ">
                <details className="dropdown" ref={ref}>
                    <summary tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </summary>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52"
                    >
                        {menus.map((item, index) => (
                            <>
                                {
                                    item.href && <li onClick={closeMenu} key={`${item.href}-${index}`}>
                                        <NavLink to={item.href}>{item.title}</NavLink>
                                    </li>
                                }
                                {item.isDoc && <MyDocMenuElement onClick={closeMenu}/>}
                            </>


                        ))}
                    </ul>
                </details>
                <div className={'flex flex-row gap-2 text-center items-center'}>
                    <AppbarTitle />
                    <div className={'dropdown dropdown-bottom hidden lg:inline'}>
                        <span tabIndex={0} role="button"
                              className={'badge badge-accent badge-outline hover:bg-accent hover:text-secondary-content cursor-pointer'}>在小程序打开</span>
                        <MiniAppWidget/>
                    </div>
                </div>
            </div>
            <nav className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menus.map((item, index) => (
                        <>
                            {item.href && <li key={`${item.href}-${index}`}>
                                <NavLink to={item.href}>{item.title}</NavLink>
                            </li>}
                            {item.isDoc && <MyDocMenuElement onClick={closeMenu} />}
                        </>
                    ))}
                </ul>
            </nav>
            <div className="navbar-end gap-4">
                <ThemeSetting/>
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
