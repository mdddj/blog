import React from "react";
import { categoryStore } from "@/providers/category";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import { blogStore } from "@/providers/blog";

export default function Page() {
  document.title = "标签";
  const tags = categoryStore((state) => state.data?.tags) ?? [];
  const [filter, label] = filterBlogsProvider(
    useShallow((state) => [state.doFilter, state.selectLabel]),
  );

  // 计算每个标签的文章数量
  const tagCounts = tags.map((tag) => {
    const count =
      blogStore
        .getState()
        .blogs.filter((mc) =>
          mc.tags.map((v) => v.name).includes(`${tag.name}`),
        )
        .reduce((acc, curr) => acc + 1, 0) || 0;
    return { ...tag, count };
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-base-content">
            文章标签
          </h1>
          <p className="text-xl text-base-content/70">
            共 <span className="font-bold text-primary">{tags.length}</span>{" "}
            个标签
          </p>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {tagCounts.map((value) => (
              <motion.div
                key={value.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  className={`btn btn-lg transition-all duration-300 ${
                    label === value.name
                      ? "btn-primary"
                      : "btn-ghost hover:bg-base-200"
                  }
                    `}
                  onClick={() => {
                    filter.call(undefined, (b) =>
                      b.filter((blog) =>
                        blog.tags.some((v) => v.name === value.name),
                      ),
                    );
                    filterBlogsProvider.setState({ selectLabel: value.name });
                  }}
                >
                  {value.name}
                  <span
                    className={`ml-2 text-sm font-bold ${label === value.name ? "text-primary-content" : "text-base-content/60"}`}
                  >
                    {value.count}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-12"
        >
          <FilterBlogs
            ending={(blog) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((value) => (
                    <span
                      key={value.id}
                      className="badge badge-sm badge-secondary badge-outline"
                    >
                      {value.name}
                    </span>
                  ))}
                </div>
              );
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
