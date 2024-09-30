import React, {useRef} from "react";
import {categoryStore} from "@/providers/category";
import {NavLink} from "@@/exports";
type Type = {
    onClick?: () => void
}
const MyDocMenuElement: React.FC<Type> = ({onClick}) => {
    const docs = categoryStore((state) => state.data?.ideaDocs) ?? [];
    const ref = useRef<HTMLDetailsElement>(null);
    if (docs.length === 0) {
        return <></>
    }
    return <>
        <li>
            <details ref={ref}>
                <summary>学习笔记</summary>
                <ul >
                    {
                        docs.map((doc) => (<li onClick={()=>{
                            //关闭弹窗
                            if (ref.current) {
                                ref.current.removeAttribute("open")
                            }
                            onClick?.()
                        }} className={''}><NavLink to={`/idea/${doc}`}>{doc}</NavLink></li>))
                    }
                </ul>
            </details>
        </li>
    </>
}

export default MyDocMenuElement;