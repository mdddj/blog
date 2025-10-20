import React from "react";
import { categoryStore } from "@/providers/category";
import { Link } from "umi";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export default function Page() {
  const archives = categoryStore((state) => state.data?.archiveModels) ?? [];
  document.title = "归档";

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 text-base-content">
            文章归档
          </h1>
          <p className="text-xl text-base-content/70">
            共{" "}
            <span className="font-bold text-primary">
              {archives.reduce((acc, curr) => acc + curr.count, 0)}
            </span>{" "}
            篇文章
          </p>
        </div>

        <div className="space-y-12">
          {archives.map((value) => (
            <motion.div
              key={value.months}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-base-content">
                {value.months}{" "}
                <span className="text-base-content/50 text-xl">
                  ({value.count} 篇)
                </span>
              </h2>

              <div className="space-y-4">
                {value.blogs.map((blog) => (
                  <Link to={`/detail/${blog.id}`} key={blog.id}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center p-4 rounded-lg hover:bg-base-200 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-20 text-left mr-4">
                        <div className="text-sm font-mono text-base-content/60">
                          {dayjs(blog.createTime).format("YYYY-MM-DD")}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-base-content hover:text-primary transition-colors duration-200">
                          {blog.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
