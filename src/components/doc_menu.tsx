import React, {useEffect, useRef} from "react";
import {categoryStore} from "@/providers/category";
import {history, NavLink, useMatch} from "@@/exports";
import {motion} from "framer-motion";

type Type = {
    onClick?: () => void
}
const MyDocMenuElement: React.FC<Type> = ({onClick}) => {
    const docs = categoryStore((state) => state.data?.ideaDocs) ?? [];
    const ref = useRef<HTMLDetailsElement>(null);
    const match = useMatch('/idea/:title')
    const docTitle = match ? match.params.title : undefined;

    const closeMenu = () => {
        if (ref.current) {
            ref.current.removeAttribute("open")
        }
    }


    useEffect(() => {
        const unListen = history.listen(() => {
            closeMenu()
        });
        window.addEventListener("scroll",closeMenu)
        return () => {
            unListen();
            window.removeEventListener("scroll",closeMenu)
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

    return (<li className={match ? 'active' : ''}>
        <details ref={ref} className={'dropdown dropdown-end'}>
            <summary>
                <motion.p
                    key={title} // 使用 key 来触发动画
                    initial={{opacity: 0, y: 10}}  // 初始状态：透明且稍微向下
                    animate={{opacity: 1, y: 0}}   // 动画到：完全显示且位置恢复
                    exit={{opacity: 0, y: -5}}    // 离开时的动画：透明且向上
                    transition={{duration: 0.5}}   // 过渡时间
                >{title}</motion.p>
            </summary>
            <ul  className={'menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'}>
                {
                    docs.map((doc) => (<li key={doc} onClick={() => {
                        closeMenu()
                        onClick?.()
                    }}><NavLink to={`/idea/${doc}`}>{doc}</NavLink></li>))
                }
            </ul>
        </details>
    </li>)

}

export default MyDocMenuElement;