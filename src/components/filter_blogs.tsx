import React from "react";
import filterBlogsProvider from "@/providers/filter_blog";
import BlogCard from "@/components/blog";
import {Link} from "umi";


const FilterBlogs: React.FC = () => {
    const blogs = filterBlogsProvider(state => state.blogs)
    return <div className={'flex flex-col gap-2 mt-5'}>
        {
            blogs.map(value => <div key={value.id} className={''}><Link to={`/detail/${value.id}`}>{value.title}</Link></div>)
        }
    </div>
}

export default FilterBlogs