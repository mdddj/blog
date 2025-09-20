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
      setIsScrolled(window.scrollY > 100);
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
    <div className="min-h-screen bg-gradient-to-br from-base-200/30 to-base-100">
      {/* 主要内容区域 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 文章头部 */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-base-100 to-base-50 rounded-3xl shadow-2xl border border-base-200/50 overflow-hidden"
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
          <div className="bg-gradient-to-br from-base-100 to-base-50 rounded-3xl shadow-xl border border-base-200/50 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="prose prose-lg max-w-none prose-primary">
                <MarkdownComponent text={blog.content} id="md-body" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 浮动操作按钮 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
      >
        {/* 返回按钮 */}
        <div className="tooltip tooltip-right" data-tip="返回">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => nav(-1)}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary-focus text-primary-content shadow-lg hover:shadow-xl border border-primary/20 flex items-center justify-center transition-all duration-300"
          >
            <BackSvg />
          </motion.button>
        </div>

        {/* API接口按钮 */}
        <div className="tooltip tooltip-right" data-tip="API接口">
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            rel="noreferrer"
            target="_blank"
            href={`https://api.itbug.shop/api/blog/get/${params?.id}`}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content shadow-lg hover:shadow-xl border border-secondary/20 flex items-center justify-center transition-all duration-300"
          >
            <ApiSvg />
          </motion.a>
        </div>

        {/* 目录切换按钮 */}
        <div
          className="tooltip tooltip-right"
          data-tip={showTOC ? "隐藏目录" : "显示目录"}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowTOC(!showTOC)}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent to-accent-focus text-accent-content shadow-lg hover:shadow-xl border border-accent/20 flex items-center justify-center transition-all duration-300"
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>

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
            <div className="bg-gradient-to-br from-base-100 to-base-50 rounded-2xl shadow-2xl border border-base-200/50 backdrop-blur-sm overflow-hidden">
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

      {/* 移动端浮动按钮 */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => nav(-1)}
          className="w-12 h-12 rounded-full bg-primary text-primary-content shadow-lg flex items-center justify-center"
        >
          <BackSvg />
        </motion.button>
      </div>

      {/* 滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left z-50"
        style={{
          scaleX: isScrolled ? 1 : 0,
        }}
        initial={{ scaleX: 0 }}
        animate={{
          scaleX:
            typeof window !== "undefined"
              ? Math.min(
                  window.scrollY /
                    (document.documentElement.scrollHeight -
                      window.innerHeight),
                  1,
                )
              : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}
