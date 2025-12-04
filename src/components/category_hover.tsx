import React, { useState, useRef, useEffect, PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@@/exports";
import { fromNow } from "@/tools/date";
import { Blog } from "@/models/blog";

// 组件Props类型
interface CategoryHoverProps {
  getBlogsByCategory: () => Promise<Blog[]> | Blog[];
  className?: string;
  maxItems?: number;
  renderHerder: (blogs: Blog[], closePopover: () => void) => React.ReactNode;
}

// 博客项组件
const BlogItem: React.FC<{ blog: Blog; onNavigate: () => void }> = ({
  blog,
  onNavigate,
}) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/detail/${blog.id}`);
    onNavigate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="
        group cursor-pointer p-3 rounded-xl
        hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5
        border border-transparent hover:border-primary/20
        transition-all duration-[var(--transition-slow)]
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-base-content group-hover:text-primary transition-colors duration-[var(--transition-normal)] line-clamp-2 leading-relaxed mb-1">
            {blog.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-base-content/60">
            {blog.author && (
              <>
                <span>{blog.author}</span>
                <span>•</span>
              </>
            )}
            <span>{fromNow(blog.createTime)}</span>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-0.5 text-xs bg-base-200/50 text-base-content/70 rounded-md"
                >
                  #{tag.name}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="px-2 py-0.5 text-xs text-base-content/50">
                  +{blog.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="shrink-0 text-base-content/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-[var(--transition-normal)]">
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// 加载状态组件
const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center gap-2 text-base-content/60">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
      />
      <span className="text-sm">加载中...</span>
    </div>
  </div>
);

// 空状态组件
const EmptyState: React.FC = () => (
  <div className="text-center py-8">
    <div className="text-3xl mb-2">📝</div>
    <p className="text-sm text-base-content/60">该分类下暂无文章</p>
  </div>
);

// 主组件
const CategoryHover: React.FC<PropsWithChildren<CategoryHoverProps>> = ({
  children,
  getBlogsByCategory,
  className = "",
  maxItems = 5,
  renderHerder,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  // 获取博客列表
  const fetchBlogs = async () => {
    if (loading || blogs.length > 0) return;

    setLoading(true);
    try {
      const result = await getBlogsByCategory();
      setBlogs(Array.isArray(result) ? result.slice(0, maxItems) : []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // 计算浮层位置
  const calculatePosition = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = 400; // 预估浮层宽度
    const popoverHeight = 300; // 预估浮层高度

    let x = rect.left;
    let y = rect.bottom + 8;

    // 水平位置调整
    if (x + popoverWidth > viewportWidth) {
      x = rect.right - popoverWidth;
    }
    if (x < 8) {
      x = 8;
    }

    // 垂直位置调整
    if (y + popoverHeight > viewportHeight) {
      y = rect.top - popoverHeight - 8;
    }

    setPosition({ x, y });
  };

  // 鼠标进入处理
  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      calculatePosition();
      fetchBlogs();
    }, 300); // 300ms延迟显示
  };

  // 鼠标离开处理
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      // 清空数据以便下次重新加载
      setTimeout(() => {
        setBlogs([]);
      }, 300);
    }, 200); // 200ms延迟隐藏
  };

  // 浮层鼠标进入处理
  const handlePopoverMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  // 浮层鼠标离开处理
  const handlePopoverMouseLeave = () => {
    handleMouseLeave();
  };

  // 关闭浮层
  const closePopover = () => {
    setIsHovered(false);
    setBlogs([]);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (isHovered) {
        calculatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHovered]);

  return (
    <>
      <div
        ref={containerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50"
            style={{
              left: position.x,
              top: position.y,
            }}
            onMouseEnter={handlePopoverMouseEnter}
            onMouseLeave={handlePopoverMouseLeave}
          >
            <div className="w-96 max-h-80 bg-gradient-to-br from-base-100 to-base-50 rounded-2xl shadow-2xl border border-base-200/50 backdrop-blur-xl overflow-hidden">
              {/* 头部 */}
              <div className="p-4 border-b border-base-200/50 bg-gradient-to-r from-primary/5 to-secondary/5">
                {renderHerder(blogs, closePopover)}
              </div>

              {/* 内容区域 */}
              <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {loading ? (
                  <LoadingState />
                ) : blogs.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="p-2">
                    {blogs.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <BlogItem blog={blog} onNavigate={closePopover} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* 底部装饰 */}
              <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-60"></div>
            </div>

            {/* 三角箭头指示器 */}
            <div className="absolute -top-2 left-6">
              <div className="w-4 h-4 bg-gradient-to-br from-base-100 to-base-50 border-l border-t border-base-200/50 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoryHover;
