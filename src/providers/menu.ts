import {create} from "zustand";


type AppBaseMenu = {
    menus: BaseMenu[]
}

export const appMenuStore = create<AppBaseMenu>((set)=>{
    return ({
        menus: [
            {
                title: '首页',
                href: '/'
            },
            {
                title: '分类',
                href: '/category'
            },
            {
                title: '标签',
                href: '/tags'
            },
            {
                title: '归档',
                href: '/all'
            },
            {
                title: '友链',
                href: '/links'
            },
            {
                title: '关于',
                href: '/about'
            }
        ]
    })
})