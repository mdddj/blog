import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@@/exports";
import { blogStore } from "@/providers/blog";
import MarkdownComponent from "@/components/markdown";
import { fromNow } from "@/tools/date";
import ApiSvg from "@/components/api_svg";
import Documents from "@/components/md_header";
import { motion, AnimatePresence } from "framer-motion";
import CategoryHover from "@/components/category_hover";
import { Blog } from "@/models/blog";
import HoverCategoryHeader from "@/components/hover_category_herder";
import HoverTagHeader from "@/components/hover_tag_header";
import { GlassPanel, GlassCard } from "@/components/glass";
import { cn } from "@/lib/utils";

/**
 * Article Detail Page - Liquid Glass Redesign
 * 
 * Requirements:
 * - 4.1: Article content max-width 720px, line-height 1.75
 * - 4.2: Glass-style metadata header with author, date, category, tags
 * - 4.3: Reading progress indicator at top
 * - 4.4: Floating TOC panel on right (>1280px)
 * - 4.5: Floating action buttons on left after scroll
 */

export default function Page() {
  const params = useParams<{ id: string }>();
  const nav = useNavigate();
  const [showTOC, setShowTOC] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const blog = blogStore((state) => state.blogs).find(
    (value) => `${value.id}` === params.id,
  );
  const blogs = blogStore((state) => state.blogs);

  // Update document title
  useEffect(() => {
    if (blog?.title) {
      document.title = blog.title;
    }
  }, [blog]);

  // Scroll listener for progress and floating actions
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      setScrollProgress(progress);
      // Show floating actions after scrolling past header (Requirements 4.5)
      setShowFloatingActions(scrollTop > headerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  // Measure header height for floating actions trigger
  useEffect(() => {
    const header = document.getElementById("article-header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, [blog?.id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard blur="lg" opacity={0.2} className="text-center p-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-xl text-muted-foreground">文章未找到</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Reading Progress Indicator - Requirements 4.3 */}
      <ReadingProgressBar progress={scrollProgress} />

      {/* Main Content Area */}
      <div className="max-w-(--article-max-width) mx-auto px-4 sm:px-6 py-8">
        {/* Article Header - Requirements 4.2 */}
        <ArticleHeader
          blog={blog}
          blogs={blogs}
          id="article-header"
        />

        {/* Article Content - Requirements 4.1 */}
        <ArticleContent blog={blog} />
      </div>

      {/* Floating Action Buttons - Requirements 4.5 */}
      <FloatingActions
        show={showFloatingActions}
        blog={blog}
        showTOC={showTOC}
        onToggleTOC={() => setShowTOC(!showTOC)}
        onBack={() => nav(-1)}
        scrollProgress={scrollProgress}
        params={params}
      />

      {/* Table of Contents Sidebar - Requirements 4.4 */}
      <TOCSidebar
        show={showTOC}
        content={blog.content}
        onClose={() => setShowTOC(false)}
      />

      {/* Mobile Floating Actions */}
      <MobileFloatingActions
        show={showFloatingActions}
        showTOC={showTOC}
        onToggleTOC={() => setShowTOC(!showTOC)}
        onBack={() => nav(-1)}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}


/**
 * Reading Progress Bar Component
 * Requirements 4.3: Thin line progress indicator at top of viewport
 */
function ReadingProgressBar({ progress }: { progress: number }) {
  return (
    <motion.div
      data-testid="reading-progress"
      className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
      style={{
        background: "linear-gradient(to right, var(--color-primary), var(--color-accent))",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.1, ease: "linear" }}
    />
  );
}

/**
 * Article Header Component
 * Requirements 4.2: Glass-style metadata with author, date, category, tags
 */
function ArticleHeader({
  blog,
  blogs,
  id
}: {
  blog: Blog;
  blogs: Blog[];
  id?: string;
}) {
  return (
    <motion.header
      id={id}
      data-testid="article-header"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel
        blur="lg"
        opacity={0.15}
        className="rounded-2xl overflow-hidden"
      >
        {/* Decorative top accent */}
        <div
          className="h-1"
          style={{
            background: "linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-accent))"
          }}
        />

        <div className="p-6 lg:p-8 space-y-6">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {blog.title}
          </h1>

          {/* Author and Date - Metadata Section */}
          <div
            data-testid="article-metadata"
            className="flex flex-wrap items-center gap-4 text-sm"
          >
            {/* Author */}
            <div
              data-testid="article-author"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  color: "var(--color-primary-foreground)"
                }}
              >
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-foreground">{blog.author}</span>
            </div>

            {/* Separator */}
            <span className="text-muted-foreground/50">·</span>

            {/* Date */}
            <time
              data-testid="article-date"
              className="text-muted-foreground flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {fromNow(blog.createTime)}
            </time>
          </div>

          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category */}
            <CategoryHover
              getBlogsByCategory={() =>
                blogs.filter((item) => item.category.id === blog.category.id)
              }
              renderHerder={(blogs, closePopover) => (
                <HoverCategoryHeader
                  blogs={blogs}
                  closePopover={closePopover}
                  category={blog.category}
                />
              )}
            >
              <GlassPanel
                data-testid="article-category"
                blur="sm"
                opacity={0.2}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              >
                {blog.category.logo && (
                  <img
                    src={blog.category.logo}
                    alt={blog.category.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                  {blog.category.name}
                </span>
              </GlassPanel>
            </CategoryHover>

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div
                data-testid="article-tags"
                className="flex flex-wrap items-center gap-2"
              >
                {blog.tags.map((tag, index) => (
                  <CategoryHover
                    key={tag.id}
                    getBlogsByCategory={() =>
                      blogs.filter((b) => b.tags.some((t) => t.id === tag.id))
                    }
                    renderHerder={(blogs, closePopover) => (
                      <HoverTagHeader
                        blogs={blogs}
                        closePopover={closePopover}
                        tag={tag}
                      />
                    )}
                  >
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer",
                        "bg-muted/50 text-muted-foreground",
                        "hover:bg-muted hover:text-foreground",
                        // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                        "transition-colors duration-[var(--transition-fast)]"
                      )}
                    >
                      #{tag.name}
                    </motion.span>
                  </CategoryHover>
                ))}
              </div>
            )}
          </div>

          {/* Edit Button */}
          <div className="pt-2">
            <a
              href={`https://manager.itbug.shop/blog/add?update=${blog.id}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
                "bg-muted/30 text-muted-foreground",
                "hover:bg-muted/50 hover:text-foreground",
                // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                "transition-colors duration-[var(--transition-fast)]"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              编辑文章
            </a>
          </div>
        </div>
      </GlassPanel>
    </motion.header>
  );
}


/**
 * Article Content Component
 * Requirements 4.1: max-width 720px, line-height 1.75
 */
function ArticleContent({ blog }: { blog: Blog }) {
  return (
    <motion.article
      data-testid="article-content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-8"
    >
      <GlassPanel blur="md" opacity={0.1} className="rounded-2xl overflow-hidden">
        <div className="p-6 lg:p-8">
          {/* Article body with optimized typography - Requirements 4.1 */}
          <div
            className="prose prose-lg max-w-none"
            style={{
              maxWidth: "var(--article-max-width)",
              lineHeight: 1.75,
            }}
          >
            <MarkdownComponent text={blog.content} id="md-body" />
          </div>
        </div>
      </GlassPanel>
    </motion.article>
  );
}

/**
 * Floating Action Buttons Component
 * Requirements 4.5: Glass-style buttons on left side after scroll
 */
function FloatingActions({
  show,
  blog,
  showTOC,
  onToggleTOC,
  onBack,
  scrollProgress,
  params,
}: {
  show: boolean;
  blog: Blog;
  showTOC: boolean;
  onToggleTOC: () => void;
  onBack: () => void;
  scrollProgress: number;
  params: { id?: string };
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="floating-actions"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        >
          <GlassPanel blur="xl" opacity={0.2} className="rounded-2xl p-3">
            <div className="flex flex-col gap-3">
              {/* Back Button */}
              <FloatingActionButton
                onClick={onBack}
                tooltip="返回"
                variant="primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </FloatingActionButton>

              {/* API Button */}
              <FloatingActionButton
                as="a"
                href={`https://api.itbug.shop/api/blog/get/${params?.id}`}
                target="_blank"
                rel="noreferrer"
                tooltip="API接口"
                variant="secondary"
              >
                <ApiSvg />
              </FloatingActionButton>

              {/* TOC Toggle Button */}
              <FloatingActionButton
                onClick={onToggleTOC}
                tooltip={showTOC ? "隐藏目录" : "显示目录"}
                variant={showTOC ? "destructive" : "accent"}
              >
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showTOC ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={showTOC ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 10h16M4 14h16M4 18h16"}
                  />
                </motion.svg>
              </FloatingActionButton>

              {/* Scroll to Top Button */}
              <FloatingActionButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                tooltip="回到顶部"
                variant="info"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </FloatingActionButton>

              {/* Share Button */}
              <FloatingActionButton
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: blog.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                tooltip="分享文章"
                variant="success"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </FloatingActionButton>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-2">
                <div className="relative w-10 h-10">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                    <circle
                      cx="20" cy="20" r="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      className="text-muted/30"
                    />
                    <circle
                      cx="20" cy="20" r="16"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 16}`}
                      strokeDashoffset={`${2 * Math.PI * 16 * (1 - scrollProgress)}`}
                      strokeLinecap="round"
                      // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                      className="transition-all duration-[var(--transition-fast)]"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/**
 * Floating Action Button Component
 */
function FloatingActionButton({
  children,
  onClick,
  tooltip,
  variant = "default",
  as: Component = "button",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  tooltip: string;
  variant?: "default" | "primary" | "secondary" | "accent" | "destructive" | "info" | "success";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}) {
  const variantStyles = {
    default: "bg-muted/50 text-foreground hover:bg-muted",
    primary: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
    secondary: "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]",
    accent: "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]",
    destructive: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)]",
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
  };

  return (
    <motion.div className="group relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Component
        onClick={onClick}
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center",
          // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
          "shadow-md transition-all duration-[var(--transition-fast)]",
          "hover:shadow-lg",
          variantStyles[variant]
        )}
        {...props}
      >
        {children}
      </Component>
      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background">
        {tooltip}
      </span>
    </motion.div>
  );
}

/**
 * Table of Contents Sidebar Component
 * Requirements 4.4: Floating glass panel on right for screens >1280px
 */
function TOCSidebar({
  show,
  content,
  onClose,
}: {
  show: boolean;
  content: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          data-testid="toc-sidebar"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.25 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 w-72 z-30 hidden xl:block"
        >
          <GlassPanel blur="xl" opacity={0.2} className="rounded-2xl overflow-hidden">
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  目录导航
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-6 h-6 rounded-md flex items-center justify-center bg-muted/50 hover:bg-destructive/20 hover:text-destructive transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* TOC Content */}
              <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                <Documents md={content} />
              </div>
            </div>
          </GlassPanel>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/**
 * Mobile Floating Actions Component
 */
function MobileFloatingActions({
  show,
  showTOC,
  onToggleTOC,
  onBack,
  scrollProgress,
}: {
  show: boolean;
  showTOC: boolean;
  onToggleTOC: () => void;
  onBack: () => void;
  scrollProgress: number;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="lg:hidden fixed bottom-6 right-6 z-40"
        >
          <div className="flex flex-col gap-3 items-end">
            {/* Secondary Actions */}
            <div className="flex flex-col gap-2">
              {/* Scroll to Top */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg backdrop-blur-xl bg-white/10 border border-white/20 text-foreground"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>

              {/* TOC Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleTOC}
                className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center shadow-lg backdrop-blur-xl border border-white/20",
                  showTOC ? "bg-destructive/80 text-white" : "bg-white/10 text-foreground"
                )}
              >
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showTOC ? 45 : 0 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={showTOC ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 10h16M4 14h16M4 18h16"}
                  />
                </motion.svg>
              </motion.button>
            </div>

            {/* Main Back Button with Progress Ring */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  color: "var(--color-primary-foreground)"
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>

                {/* Progress Ring */}
                <svg className="absolute inset-0 w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="25" stroke="white" strokeWidth="2" fill="transparent" strokeOpacity="0.2" />
                  <circle
                    cx="28" cy="28" r="25"
                    stroke="white"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 25}`}
                    strokeDashoffset={`${2 * Math.PI * 25 * (1 - scrollProgress)}`}
                    strokeOpacity="0.8"
                    strokeLinecap="round"
                    // Using unified transition duration (150ms) within 150ms-300ms range (Requirements 7.1)
                    className="transition-all duration-[var(--transition-fast)]"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
