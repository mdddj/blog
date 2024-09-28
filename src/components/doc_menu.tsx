import React from "react";
import {categoryStore} from "@/providers/category";
import {NavLink} from "@@/exports";

const MyDocMenuElement: React.FC = () => {
    const docs = categoryStore((state) => state.data?.ideaDocs) ?? [];
    if (docs.length === 0) {
        return <></>
    }
    return <>
        <li>
            <details>
                <summary>学习笔记</summary>
                <ul className="p-2">
                    {
                        docs.map((doc) => (<li className={'w-52'}><NavLink to={`/idea/${doc}`}>{doc}</NavLink></li>))
                    }
                </ul>
            </details>
        </li>
    </>
}

export default MyDocMenuElement;