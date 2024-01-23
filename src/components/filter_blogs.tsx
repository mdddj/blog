import React, {ReactNode} from "react";
import filterBlogsProvider from "@/providers/filter_blog";
import {Link} from "umi";
import {Blog} from "@/models/blog";
import blog from "@/components/blog";

type  Props = {
    ending?: (blog: Blog) => ReactNode
}
const FilterBlogs: React.FC<Props> = ({ending}) => {
    const blogs = filterBlogsProvider(state => state.blogs)
    return <ol className={'flex flex-col gap-2 mt-5'}>
        {
            blogs.map(value => {
                return <li key={value.id}
                           className={'transform ease-in-out hover:-translate-y-1 duration-400 hover:text-primary font-bold mb-2'}>
                    <Link to={`/detail/${value.id}`}>{value.title}</Link>
                    {ending && ending(value)}
                </li>
            })
        }
    </ol>
}

export default FilterBlogs