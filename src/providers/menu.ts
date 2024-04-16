import { create } from "zustand";

export const appMenuStore = create<{
    menus: { title: string, href: string }[]
}>(() => {
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
                title: '项目',
                href: '/projects'
            },
            {
                title: '关于',
                href: '/about'
            }
        ]
    })
})