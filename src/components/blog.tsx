import { Blog } from "@/models/blog";
import { Card } from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "umi";
import { useNavigate } from "@@/exports";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  let nav = useNavigate();

  return (
    <Card
      onClick={() => nav(`/detail/${blog.id}`)}
      className="py-4 px-4 cursor-pointer relative border border-gray-300 transition-transform duration-300 hover:border-blue-500 hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none"
    >
      <CardBody>
        <Link to={`/detail/${blog.id}`}>
          <h4 className="font-bold text-large">{blog.title}</h4>
        </Link>
        <div className={"text-xs text-default-500 mt-1"}>
          梁典典发布于{dayjs(blog.createTime).locale("zh-cn").fromNow()}
        </div>
        <div className={"flex flex-wrap gap-2 items-center mt-3"}>
          <Chip size={"sm"} avatar={<Avatar src={blog.category.logo} />}>
            {blog.category.name}
          </Chip>{" "}
          {blog.tags.map((tag) => (
            <span className={"text-default-500 text-sm"} key={tag.id}>
              #{tag.name}
            </span>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
