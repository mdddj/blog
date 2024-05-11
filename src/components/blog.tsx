import { Blog } from "@/models/blog";
import React from "react";
import { Link } from "umi";
import { fromNow } from "@/tools/date";

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {

  return (
    <div className="card shadow-xl bg-base-100 cursor-pointer relative transition-transform duration-300  hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none">
      <div className={"card-body"}>
        <Link
          className={"link link-hover card-title"}
          to={`/detail/${blog.id}`}
        >
          <h4 className="font-bold text-large">{blog.title}</h4>
        </Link>
        <div className={"text-xs text-default-500 mt-1"}>
          梁典典发布于{fromNow(blog.createTime)}
        </div>
        <div className={"flex flex-wrap gap-2 items-center mt-3"}>
          <div className="badge badge-outline py-3">
            <div className="avatar">
              <div className="w-4 rounded">
                <img src={blog.category.logo} alt={blog.category.name} />
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
