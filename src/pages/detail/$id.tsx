import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@@/exports";
import { blogStore } from "@/providers/blog";
import CardTitle from "@/components/title";
import MarkdownComponent from "@/components/markdown";
import { fromNow } from "@/tools/date";
import BackSvg from "@/components/back_svg";
import ApiSvg from "@/components/api_svg";
import Documents from "@/components/md_header";
import { motion, AnimatePresence } from "framer-motion";
import CategoryHover from "@/components/category_hover";
import { Blog } from "@/models/blog";
import HoverCategoryHeader from "@/components/hover_category_herder";
import HoverTagHeader from "@/components/hover_tag_header";

export default function Page() {
  const params = useParams<{ id: string }>();
  const nav = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const blog = blogStore((state) => state.blogs).find(
    (value) => `${value.id}` === params.id,
  );
  const blogs = blogStore((state) => state.blogs);

  const updateTitle = () => {
    if (blog) {
      document.title = blog.title;
    }
  };

  // 监听滚动状态
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      const progress = Math.min(
        window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight),
        1,
      );

      setIsScrolled(scrolled);
      setScrollProgress(progress);
      setShowFloatingActions(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    updateTitle();
  }, [blog?.title]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 rounded-2xl bg-base-100 shadow-xl border border-base-200"
        >
          <div className="text-4xl mb-4">📝</div>
          <p className="text-xl text-base-content/70">文章未找到</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  from-base-200/30 to-base-100">
      {/* 主要内容区域 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 文章头部 */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" from-base-100 to-base-50 rounded-3xl shadow-2xl border border-base-200/50 overflow-hidden"
        >
          {/* 装饰性顶部条 */}
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

          <div className="p-8 lg:p-12">
            {/* 标题部分 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <CardTitle title={blog.title} />

              {/* 作者和发布时间 */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-base-content/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-primary-content">
                      {blog.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-base-content">
                      {blog.author}
                    </p>
                    <p className="text-sm flex items-center gap-1">
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
                      发布于 {fromNow(blog.createTime)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 分类和标签区域 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {/* 分类和编辑按钮 */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <CategoryHover
                  getBlogsByCategory={function (): Promise<Blog[]> | Blog[] {
                    return blogs.filter(
                      (item) => item.category.id === blog.category.id,
                    );
                  }}
                  renderHerder={function (
                    blogs: Blog[],
                    closePopover: () => void,
                  ): React.ReactNode {
                    return (
                      <HoverCategoryHeader
                        blogs={blogs}
                        closePopover={closePopover}
                        category={blog.category}
                      />
                    );
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-primary/30">
                      <img
                        src={blog.category.logo}
                        alt={blog.category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="font-medium text-primary">
                      {blog.category.name}
                    </span>
                  </motion.div>
                </CategoryHover>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  rel="noreferrer"
                  target="_blank"
                  href={`https://manager.itbug.shop/blog/add?update=${blog.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent hover:from-accent/20 hover:to-accent/10 rounded-xl border border-accent/20 transition-all duration-300 hover:shadow-lg"
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  编辑文章
                </motion.a>
              </div>

              {/* 标签 */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-base-content/60 flex items-center gap-1">
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    标签:
                  </span>
                  {blog.tags.map((tag, index) => (
                    <CategoryHover
                      getBlogsByCategory={function ():
                        | Promise<Blog[]>
                        | Blog[] {
                        return blogs.filter((blog) =>
                          blog.tags.map((tag) => tag.id).includes(tag.id),
                        );
                      }}
                      renderHerder={function (
                        blogs: Blog[],
                        closePopover: () => void,
                      ): React.ReactNode {
                        return (
                          <HoverTagHeader
                            blogs={blogs}
                            closePopover={closePopover}
                            tag={tag}
                          />
                        );
                      }}
                    >
                      <motion.span
                        key={tag.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 text-sm font-medium bg-base-200/60 hover:bg-base-200 text-base-content/80 rounded-lg border border-base-300/50 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      >
                        #{tag.name}
                      </motion.span>
                    </CategoryHover>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.article>

        {/* 内容区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 mb-12"
        >
          <div className="from-base-100 to-base-50 rounded-3xl shadow-xl border border-base-200/50 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none prose-primary">
                <MarkdownComponent text={blog.content} id="md-body" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 现代化浮动操作按钮组 */}
      <AnimatePresence>
        {showFloatingActions && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              staggerChildren: 0.1,
            }}
            className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
          >
            {/* 主操作容器 */}
            <div className="relative">
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5 rounded-3xl blur-xl transform scale-110" />

              <div className="relative flex flex-col gap-3 p-3 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
                {/* 返回按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="tooltip tooltip-right"
                  data-tip="返回"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.15,
                      rotate: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => nav(-1)}
                    className="relative group w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary-focus text-white shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* API接口按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="tooltip tooltip-right"
                  data-tip="API接口"
                >
                  <motion.a
                    whileHover={{
                      scale: 1.15,
                      rotate: 8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    rel="noreferrer"
                    target="_blank"
                    href={`https://api.itbug.shop/api/blog/get/${params?.id}`}
                    className="relative group w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary via-secondary to-secondary-focus text-white shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ApiSvg />
                  </motion.a>
                </motion.div>

                {/* 目录切换按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="tooltip tooltip-right"
                  data-tip={showTOC ? "隐藏目录" : "显示目录"}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTOC(!showTOC)}
                    className={`relative group w-14 h-14 rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden ${
                      showTOC
                        ? "from-error via-error to-error-focus text-white"
                        : "from-accent via-accent to-accent-focus text-white"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: showTOC ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          showTOC
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 10h16M4 14h16M4 18h16"
                        }
                      />
                    </motion.svg>
                  </motion.button>
                </motion.div>

                {/* 回到顶部按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="tooltip tooltip-right"
                  data-tip="回到顶部"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="relative group w-14 h-14 rounded-2xl bg-gradient-to-br from-info via-info to-info-focus text-white shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* 分享按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="tooltip tooltip-right"
                  data-tip="分享文章"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                    className="relative group w-14 h-14 rounded-2xl bg-gradient-to-br from-success via-success to-success-focus text-white shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* 进度指示器 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="relative mx-auto mt-2"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-base-200/50 to-base-300/50 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="relative w-8 h-8">
                      <svg
                        className="w-8 h-8 transform -rotate-90"
                        viewBox="0 0 32 32"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          className="text-base-content/20"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 12}`}
                          strokeDashoffset={`${2 * Math.PI * 12 * (1 - scrollProgress)}`}
                          className="text-primary transition-all duration-300"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-base-content/70">
                          {Math.round(scrollProgress * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 目录侧边栏 */}
      <AnimatePresence>
        {showTOC && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 z-30 hidden xl:block"
          >
            <div className="from-base-100 to-base-50 rounded-2xl shadow-2xl border border-base-200/50 backdrop-blur-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    目录导航
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowTOC(false)}
                    className="w-6 h-6 rounded-lg bg-base-200/50 hover:bg-error/10 hover:text-error transition-colors flex items-center justify-center"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                  <Documents md={blog.content} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 移动端现代化浮动按钮 */}
      <AnimatePresence>
        {showFloatingActions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="lg:hidden fixed bottom-6 right-6 z-40"
          >
            <div className="flex flex-col gap-4 items-end">
              {/* 次要操作按钮组 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-3"
              >
                {/* 回到顶部 */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-base-content shadow-xl flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </motion.button>

                {/* 目录切换 */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTOC(!showTOC)}
                  className={`w-12 h-12 rounded-full backdrop-blur-2xl border border-white/20 shadow-xl flex items-center justify-center transition-colors ${
                    showTOC
                      ? "bg-error/80 text-white"
                      : "bg-white/10 text-base-content"
                  }`}
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
                      d={
                        showTOC
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 10h16M4 14h16M4 18h16"
                      }
                    />
                  </motion.svg>
                </motion.button>
              </motion.div>

              {/* 主返回按钮 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                className="relative"
              >
                {/* 装饰光环 */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full blur-lg opacity-30 animate-pulse" />

                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => nav(-1)}
                  className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-primary-focus text-white shadow-2xl flex items-center justify-center border-2 border-white/20 backdrop-blur-sm"
                >
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>

                  {/* 进度环 */}
                  <svg
                    className="absolute inset-0 w-16 h-16 transform -rotate-90"
                    viewBox="0 0 64 64"
                  >
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="white"
                      strokeWidth="2"
                      fill="transparent"
                      strokeOpacity="0.2"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="white"
                      strokeWidth="2"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress)}`}
                      strokeOpacity="0.8"
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 增强滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-50 shadow-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
        style={{
          boxShadow:
            scrollProgress > 0.1 ? "0 0 20px rgba(var(--p), 0.5)" : "none",
        }}
      />

      {/* 顶部装饰光效 */}
      {scrollProgress > 0.1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-49"
        />
      )}
    </div>
  );
}
