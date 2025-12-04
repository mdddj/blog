import React, { ReactNode } from "react";
import filterBlogsProvider from "@/providers/filter_blog";
import { Link } from "umi";
import { Blog } from "@/models/blog";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { GlassCard } from "./glass";
import { cn } from "@/lib/utils";

type Props = {
  ending?: (blog: Blog) => ReactNode;
};

/**
 * FilterBlogs - 筛选博客列表组件
 * 
 * 液态玻璃风格
 * - 单列布局
 * - 移动端减少内边距 (Requirements 6.3)
 */
const FilterBlogs: React.FC<Props> = ({ ending }) => {
  const blogs = filterBlogsProvider((state) => state.blogs);
  return (
    // Mobile: reduced gap (Requirements 6.3)
    <div className="flex flex-col gap-3 md:gap-4">
      {blogs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">-empty-</div>
          <p className="text-foreground/70">空空如也</p>
        </div>
      )}
      {blogs.map((value, index) => {
        return (
          <motion.div
            key={value.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <GlassCard
              interactive
              blur="md"
              opacity={0.15}
              size="md"
              className={cn(
                "overflow-hidden",
                "hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              <Link
                className={cn(
                  "block text-lg md:text-xl font-bold mb-2",
                  "text-foreground hover:text-primary",
                  // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                  "transition-colors duration-[var(--transition-fast)]"
                )}
                to={`/detail/${value.id}`}
              >
                {value.title}
              </Link>
              <div className="text-sm text-foreground/60 mb-3">
                {dayjs(value.createTime).format("YYYY-MM-DD HH:mm")}
              </div>
              {ending && (
                <div className="mt-2">{ending(value)}</div>
              )}
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FilterBlogs;
