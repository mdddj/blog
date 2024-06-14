import {Blog} from "@/models/blog";
import React from "react";
import {Link} from "umi";
import {fromNow} from "@/tools/date";
import {useNavigate} from "@@/exports";

const BlogCard: React.FC<{ blog: Blog }> = ({blog}) => {

    const nav = useNavigate()
    return (
        <div onClick={() => nav(`/detail/${blog.id}`)}
             className="card hover:border-l-2 hover:border-l-primary shadow-xl bg-base cursor-pointer relative transition-transform duration-300  hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none">
            <div className={"card-body"}>
                <h4 className="font-bold text-xl hover:text-primary">{blog.title}</h4>
                <div className={"text-xs text-default-500 mt-1"}>
                    梁典典发布于{fromNow(blog.createTime)}
                </div>
                <div className={"flex flex-wrap gap-2 items-center mt-3"}>
                    <div className="badge badge-outline py-3">
                        <div className="avatar">
                            <div className="w-4 rounded">
                                <img src={blog.category.logo} alt={blog.category.name}/>
                            </div>
                        </div>
                        <span className={"ml-1"}>{blog.category.name}</span>
                    </div>
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
