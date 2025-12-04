import { blogStore } from "@/providers/blog";
import { useShallow } from "zustand/react/shallow";
import BlogCard from "@/components/blog";
import { BlogCardSkeleton } from "@/components/blog_skeleton";
import { motion } from "framer-motion";

/**
 * HomePage - 首页组件
 * 
 * 液态玻璃风格首页布局
 * - 使用 BlogCard 组件展示博客列表
 * - 列表项渐入动画（staggered fade-in）
 * - 玻璃风格加载骨架屏
 * 
 * Requirements: 7.1, 7.2
 */

// 列表容器动画配置
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 每个子元素延迟 100ms
      delayChildren: 0.05,
    },
  },
};

// 列表项动画配置
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1] as const, // easeOut cubic-bezier
    },
  },
};

export default function HomePage() {
  document.title = "梁典典的博客";
  const [blogs, isLoading] = blogStore(
    useShallow((state) => [state.blogs, state.isLoading]),
  );

  // 加载状态：显示玻璃风格骨架屏
  // Mobile: reduced gap (Requirements 6.3)
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // 博客列表：带渐入动画
  // Mobile: single column with reduced gap (Requirements 6.3)
  return (
    <motion.div
      className="flex flex-col gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          variants={itemVariants}
          custom={index}
          style={{
            // 渐进式动画延迟
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <BlogCard blog={blog} />
        </motion.div>
      ))}
    </motion.div>
  );
}
