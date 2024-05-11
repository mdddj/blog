import React, {useRef} from "react";
import {appMenuStore} from "@/providers/menu";
import {Link} from "@@/exports";
import ThemeSetting from "./theme_setting";
import {showDialogModal} from "@/tools/fun";

export default function AppBar() {
    const menus = appMenuStore((state) => state.menus);
    const ref = useRef<HTMLDetailsElement>(null);

    return (
        <header className="navbar fixed bg-base-100 shadow-2xl z-10">
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
                            <li onClick={() => {
                                //关闭弹窗
                                if (ref.current) {
                                    ref.current.removeAttribute("open")
                                }

                            }} key={`${item.href}-${index}`}>
                                <Link to={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </details>
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
                <ThemeSetting/>
                <button
                    onClick={() => showDialogModal('ds')}
                    className="btn btn-sm"
                >
                    打赏
                </button>
            </div>
        </header>
    );
}
