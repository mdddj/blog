import { Blog, Category } from "@/models/blog";
import React from "react";
import { fromNow } from "@/tools/date";
import { useNavigate } from "@@/exports";
import { motion } from "framer-motion";
import { GlassCard } from "./glass";
import { cn } from "@/lib/utils";

/**
 * BlogCard - 液态玻璃风格博客卡片组件
 * 
 * 基于 GlassCard 封装
 * - 精简布局：标题2行、描述1行
 * - 内容高度限制：120px
 * - 标签截断：最多3个，超出显示 +N
 * - 悬停动画：translateY(-4px) + 玻璃光泽度增强
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

// 分类组件
const CategoryWidget: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5",
        "bg-white/10 dark:bg-white/5",
        "rounded-md border border-white/20 dark:border-white/10",
        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
        "transition-all duration-[var(--transition-fast)] hover:bg-white/20 dark:hover:bg-white/10",
        "backdrop-blur-sm"
      )}
    >
      <div className="w-4 h-4 rounded-full overflow-hidden ring-1 ring-white/20">
        <img
          src={category.logo}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-xs font-medium text-foreground/80">
        {category.name}
      </span>
    </div>
  );
};

// 标签组件 - 玻璃药丸样式
const TagWidget: React.FC<{ tag: { id: number; name: string } }> = ({ tag }) => {
  return (
    <span
      data-testid="tag"
      className={cn(
        "inline-flex items-center px-2 py-0.5",
        "text-xs font-medium text-foreground/60",
        "bg-white/10 dark:bg-white/5 rounded-full",
        "border border-white/10 dark:border-white/5",
        "hover:bg-white/20 dark:hover:bg-white/10",
        "hover:text-foreground/80",
        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
        "transition-all duration-[var(--transition-fast)]"
      )}
    >
      #{tag.name}
    </span>
  );
};

// 标签溢出指示器
const TagOverflow: React.FC<{ count: number }> = ({ count }) => {
  return (
    <span
      data-testid="tag-overflow"
      className={cn(
        "inline-flex items-center px-2 py-0.5",
        "text-xs font-medium text-foreground/50",
        "bg-white/5 dark:bg-white/5 rounded-full",
        "border border-white/10 dark:border-white/5"
      )}
    >
      +{count}
    </span>
  );
};

// 博客卡片主组件
const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const nav = useNavigate();

  // 标签截断逻辑：最多显示3个，超出显示 +N
  const maxTags = 3;
  const visibleTags = blog.tags.slice(0, maxTags);
  const overflowCount = blog.tags.length - maxTags;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }} // Requirements 3.2: translateY(-4px)
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      onClick={() => nav(`/detail/${blog.id}`)}
      className="cursor-pointer"
    >
      <GlassCard
        interactive
        blur="md"
        opacity={0.15}
        size="md"
        className={cn(
          "group overflow-hidden",
          // Hover: 玻璃光泽度增强
          "hover:bg-white/20 dark:hover:bg-white/10",
          "hover:shadow-lg hover:shadow-primary/5"
        )}
      >
        {/* 内容区域 - 限制高度为 120px */}
        <div
          className="relative"
          style={{ maxHeight: '120px' }}
          data-testid="blog-card-content"
        >
          {/* 标题：最多2行 */}
          <h4
            className={cn(
              "text-base font-medium leading-tight",
              "text-foreground group-hover:text-primary",
              // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
              "transition-colors duration-[var(--transition-fast)]",
              "line-clamp-2 wrap-break-word"
            )}
          >
            {blog.title}
          </h4>

          {/* 描述：最多1行 */}
          {blog.description && (
            <p
              className={cn(
                "mt-1.5 text-sm text-foreground/70",
                "line-clamp-1",
                "group-hover:text-foreground/80",
                // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                "transition-colors duration-[var(--transition-fast)]"
              )}
            >
              {blog.description}
            </p>
          )}

          {/* 元信息：日期 + 分类 */}
          <div className="flex items-center gap-2 mt-2 text-xs text-foreground/50">
            <span>{fromNow(blog.createTime)}</span>
            <span className="text-foreground/30">•</span>
            <CategoryWidget category={blog.category} />
          </div>

          {/* 标签区域 */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {visibleTags.map((tag) => (
                <TagWidget key={tag.id} tag={tag} />
              ))}
              {overflowCount > 0 && <TagOverflow count={overflowCount} />}
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BlogCard;
