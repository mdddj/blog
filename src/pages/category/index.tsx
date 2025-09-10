import { categoryStore } from "@/providers/category";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import React from "react";
import {blogStore} from "@/providers/blog";

export default function Page() {
  const categorys = categoryStore((state) => state.data?.categoryList) ?? [];
  document.title = "分类";
  const [filter, label] = filterBlogsProvider(
    useShallow((state) => [state.doFilter, state.selectLabel])
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">文章分类</h1>
          <p className="text-lg text-base-content/70">
            共 {categorys.length} 个分类
          </p>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {categorys.map((value) => (
              <motion.div
                key={value.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div
                  className={`card bg-base-100 shadow-lg rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${label === value.name
                      ? "ring-2 ring-primary bg-primary/10"
                      : "hover:shadow-xl"
                    }`}
                  onClick={() => {
                    filter.call(undefined, (b) =>
                      b.filter((blog) => blog.category.name === value.name)
                    );
                    filterBlogsProvider.setState({ selectLabel: value.name });
                  }}
                >
                  <div className="avatar flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {value.logo ? (
                        <img src={value.logo} alt={value.name} className="w-8 h-8" />
                      ) : (
                        <span className="text-primary font-bold text-lg">
                          {value.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-base-content">{value.name}</h3>
                  <p className="text-sm text-base-content/60 mt-1">
                    {blogStore.getState().blogs
                      .filter(mc => mc.category.name == value.name)
                      .reduce((acc, curr) => acc + 1, 0) || 0} 篇文章
                  </p>
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
          <FilterBlogs />
        </motion.div>
      </motion.div>
    </div>
  );
}
