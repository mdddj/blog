import React from "react";
import { categoryStore } from "@/providers/category";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import {blogStore} from "@/providers/blog";

export default function Page() {
  document.title = "标签";
  const tags = categoryStore((state) => state.data?.tags) ?? [];
  const [filter, label] = filterBlogsProvider(
    useShallow((state) => [state.doFilter, state.selectLabel])
  );

  // 计算每个标签的文章数量
  const tagCounts = tags.map(tag => {
    const count = blogStore.getState().blogs
      .filter(mc => mc.tags.map((v)=>v.name).includes(`${tag.name}`))
      .reduce((acc, curr) => acc + 1, 0) || 0;
    return { ...tag, count };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">文章标签</h1>
          <p className="text-lg text-base-content/70">
            共 {tags.length} 个标签
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {tagCounts.map((value) => (
              <motion.div
                key={value.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div
                  className={`badge badge-lg cursor-pointer transition-all duration-300 ${label === value.name
                      ? "badge-primary badge-outline scale-110"
                      : "badge-secondary badge-outline hover:scale-105"
                    }`}
                  onClick={() => {
                    filter.call(undefined, (b) =>
                      b.filter((blog) =>
                        blog.tags.some((v) => v.name === value.name)
                      )
                    );
                    filterBlogsProvider.setState({ selectLabel: value.name });
                  }}
                >
                  {value.name}
                  <span className="badge badge-sm ml-2">{value.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
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
