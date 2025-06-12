import React, { useEffect } from "react";
import { categoryStore } from "@/providers/category";
import { history, useMatch, useNavigate } from "@@/exports";
import { motion } from "framer-motion";
import DropdownMenu from "./dropdown_menu";

type Type = {
    onClick?: () => void
}
const MyDocMenuElement: React.FC<Type> = ({ onClick }) => {
    const docs = categoryStore((state) => state.data?.ideaDocs) ?? [];
    const match = useMatch('/idea/:title')
    const nav = useNavigate()
    const docTitle = match ? match.params.title : undefined;

    const closeMenu = () => {
        console.log(`document active element is ${document.activeElement}`)
        let activeElement = document.activeElement;
        if (activeElement instanceof HTMLBodyElement || activeElement instanceof HTMLUListElement) {
            activeElement.blur()
        }
    }


    useEffect(() => {
        const unListen = history.listen(() => {
            closeMenu()
        });
        window.addEventListener("scroll", closeMenu)
        return () => {
            unListen();
            window.removeEventListener("scroll", closeMenu)
        };
    }, [history]);

    if (docs.length === 0) {
        return <></>
    }


    const GetShowTitle = () => {
        if (docTitle) {
            return docTitle
        }
        return "笔记"
    }

    const title = GetShowTitle()

    return <DropdownMenu items={docs.map((doc) => ({
        label: doc,
        to: `/idea/${doc}`
    }))}  >
        <span>笔记</span>
    </DropdownMenu>

    return (<li className={match ? 'active' : ''}>
        <details className={'dropdown'}>
            <summary>
                <motion.p
                    key={title} // 使用 key 来触发动画
                    initial={{ opacity: 0, y: 10 }}  // 初始状态：透明且稍微向下
                    animate={{ opacity: 1, y: 0 }}   // 动画到：完全显示且位置恢复
                    exit={{ opacity: 0, y: -5 }}    // 离开时的动画：透明且向上
                    transition={{ duration: 0.5 }}   // 过渡时间
                >{title}</motion.p>
            </summary>
            <ul className={'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'}>
                {
                    docs.map((doc) => (<li key={doc} onClick={() => {
                        closeMenu()
                        onClick?.()
                    }}><a onClick={() => {
                        closeMenu()
                        nav(`/idea/${doc}`)
                    }}>{doc}</a></li>))
                }
            </ul>
        </details>
    </li>)

}

export default MyDocMenuElement;