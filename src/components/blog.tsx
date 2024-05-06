import {Blog} from "@/models/blog";
import React from "react";
import {Link} from "umi";
import {useNavigate} from "@@/exports";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);

const BlogCard: React.FC<{ blog: Blog }> = ({blog}) => {
    let nav = useNavigate();

    return (
        <div
            onClick={() => nav(`/detail/${blog.id}`)}
            className="card py-4 px-4 cursor-pointer relative border border-gray-300 transition-transform duration-300 hover:border-blue-500 hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none"
        >
            <div>
                <Link to={`/detail/${blog.id}`}>
                    <h4 className="font-bold text-large">{blog.title}</h4>
                </Link>
                <div className={"text-xs text-default-500 mt-1"}>
                    梁典典发布于{dayjs(blog.createTime).locale("zh-cn").fromNow()}
                </div>
                <div className={"flex flex-wrap gap-2 items-center mt-3"}>
                    <div className="badge badge-outline">
                        <div className="avatar">
                            <div className="w-4 rounded">
                                <img src={blog.category.logo} alt={blog.category.name}/>
                            </div>
                        </div>
                        <span className={'ml-1'}>{blog.category.name}</span>
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
