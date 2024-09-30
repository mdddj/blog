import {Blog, Category} from "@/models/blog";
import React from "react";
import {fromNow} from "@/tools/date";
import {useNavigate} from "@@/exports";
import HoverPanel from "@/components/hover_panel";


const CategoryWidget: React.FC<{ category: Category }> = ({category}) => {
    return <div className="rounded-full border-gray-200 border-2 flex gap-2 px-4 py-1">
            <div className="avatar">
                <div className="w-6 h-6 rounded">
                    <img src={category.logo} alt={category.name}/>
                </div>
            </div>
            <span className={''}>{category.name}</span>
    </div>
}


const BlogCard: React.FC<{ blog: Blog }> = ({blog}) => {

    const nav = useNavigate()
    return (
        <div onClick={() => nav(`/detail/${blog.id}`)}
             className="card hover:border-l-2 shadow hover:shadow-xl hover:border-l-primary bg-base cursor-pointer relative transition-transform duration-300  hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none">
            <div className={"card-body"}>
                <h4 className="font-bold text-xl hover:text-primary card-title">{blog.title}</h4>
                <div className={"text-xs text-default-500 mt-1"}>
                    梁典典发布于{fromNow(blog.createTime)}
                </div>
                <div className={"flex flex-wrap gap-2 items-center mt-3"}>
                    <CategoryWidget category={blog.category}/>
                    {blog.tags.map((tag) => (
                        <span className={"text-default-500 text-sm"} key={tag.id}>
              #{tag.name}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
