import { Blog, Category } from "@/models/blog";
import React from "react";
import { fromNow } from "@/tools/date";
import { useNavigate } from "@@/exports";
import { motion } from "framer-motion";

// 博客卡片
const CategoryWidget: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
        inline-flex items-center gap-2 px-2 py-1
        bg-base-100
        rounded-md border border-base-300/50
        transition-all duration-300 hover:shadow-sm hover:border-primary/30
        backdrop-blur-sm
      "
    >
      <div className="avatar">
        <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-base-300">
          <img
            src={category.logo}
            alt={category.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <span className="text-sm font-medium text-base-content/80">
        {category.name}
      </span>
    </motion.div>
  );
};

// 标签组件
const TagWidget: React.FC<{ tag: { id: number; name: string } }> = ({
  tag,
}) => {
  return (
    <motion.span
      whileHover={{ scale: 1.1, y: -2 }}
      className="
        inline-flex items-center px-2 py-0.5
        text-xs font-medium text-base-content/60
        bg-base-200/30 rounded-md
        hover:bg-base-200 hover:text-base-content
        transition-all duration-200 cursor-pointer
      "
    >
      #{tag.name}
    </motion.span>
  );
};

// 博客卡片主组件
const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={() => nav(`/detail/${blog.id}`)}
      className="
        group relative cursor-pointer
        bg-base-100
        rounded-xl shadow-md border border-base-300/50
        hover:shadow-lg hover:border-primary/20
        transition-all duration-300 overflow-hidden
        backdrop-blur-sm
      "
    >
      <div className="relative p-6">
        {/* 标题部分 */}
        <div className="mb-4">
          <h4
            className="
            text-xl font-bold leading-tight mb-2
            text-base-content group-hover:text-primary
            transition-colors duration-300 line-clamp-2
            break-words
          "
          >
            {blog.title}
          </h4>

          <p className="
            mt-2 text-base-content/70 text-sm
            line-clamp-2
            group-hover:text-base-content/90 transition-colors duration-300
            ">
            {blog.description}
          </p>

          {/* 发布信息 */}
          <div className="flex items-center gap-2 text-sm text-base-content/60 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-content">
                  梁
                </span>
              </div>
              <span>梁典典</span>
            </div>
            <span className="text-base-content/40">•</span>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{fromNow(blog.createTime)}</span>
            </div>
          </div>
        </div>

        {/* 分类和标签 */}
        <div className="flex flex-wrap gap-2 items-center">
          <CategoryWidget category={blog.category} />

          <div className="flex flex-wrap gap-1.5">
            {blog.tags.map((tag) => (
              <TagWidget key={tag.id} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
