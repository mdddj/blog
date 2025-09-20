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
        inline-flex items-center gap-2 px-3 py-1.5
        bg-gradient-to-r from-primary/10 to-secondary/10
        rounded-full border border-primary/20
        transition-all duration-300 hover:shadow-md hover:border-primary/40
        backdrop-blur-sm
      "
    >
      <div className="avatar">
        <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-primary/30">
          <img
            src={category.logo}
            alt={category.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <span className="text-sm font-medium text-primary">{category.name}</span>
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
        inline-flex items-center px-2.5 py-1
        text-xs font-medium text-base-content/70
        bg-base-200/50 rounded-lg border border-base-300/50
        hover:bg-base-200 hover:text-base-content hover:border-primary/30
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
        bg-gradient-to-br from-base-100 to-base-50
        rounded-3xl shadow-lg border border-base-200/50
        hover:shadow-2xl hover:border-primary/30
        transition-all duration-300 overflow-hidden
        backdrop-blur-sm
      "
    >
      {/* 顶部装饰条 */}
      <div
        className="
        absolute top-0 left-0 w-full h-1
        bg-gradient-to-r from-primary via-secondary to-accent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      "
      />

      {/* 左侧装饰线 */}
      <div
        className="
        absolute left-0 top-0 w-1 h-0
        bg-gradient-to-b from-primary to-secondary
        group-hover:h-full transition-all duration-500 ease-out
      "
      />

      {/* 背景装饰 */}
      <div
        className="
        absolute top-4 right-4 w-20 h-20
        bg-gradient-to-br from-primary/5 to-secondary/5
        rounded-full blur-xl opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      "
      />

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

          {/* 发布信息 */}
          <div className="flex items-center gap-2 text-sm text-base-content/60">
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

        {/* 底部装饰 */}
        <div
          className="
          absolute bottom-0 right-0 w-12 h-12
          bg-gradient-to-tl from-primary/10 to-transparent
          rounded-tl-full opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        />
      </div>

      {/* 悬浮时的光效 */}
      <div
        className="
        absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
        bg-gradient-to-br from-primary/5 via-transparent to-secondary/5
        transition-opacity duration-300 pointer-events-none
      "
      />
    </motion.div>
  );
};

export default BlogCard;
