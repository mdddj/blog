import { Blog } from "@/models/blog";
import { create } from "zustand";
import { blogStore } from "@/providers/blog";


type Props = {
    blogs: Blog[],
    doFilter: (run: (blogs: Blog[]) => Blog[]) => void,
    selectLabel: string | undefined
}

///过滤博客列表
const filterBlogsProvider = create<Props>((set) => {
    return ({
        blogs: [],
        doFilter: run => {
            const blogs = blogStore.getState().blogs
            const newBlogs = run(blogs)
            set((state) => ({ ...state, blogs: newBlogs }))
        },
        selectLabel: undefined
    })
})

export default filterBlogsProvider