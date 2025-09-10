import React from "react";
import { categoryStore } from "@/providers/category";
import { Link } from "umi";
import CardTitle from "@/components/title";
import dayjs from "dayjs";
import { motion } from "framer-motion";

export default function Page() {
    const archives = categoryStore((state) => state.data?.archiveModels) ?? [];
    document.title = "归档";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">文章归档</h1>
                    <p className="text-lg text-base-content/70">
                        共 {archives.reduce((acc, curr) => acc + curr.count, 0)} 篇文章
                    </p>
                </div>

                <div className="space-y-8">
                    {archives.map((value) => (
                        <motion.div
                            key={value.months}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden"
                        >
                            <div className="card-body p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <CardTitle title={value.months} />
                                    <span className="badge badge-primary badge-outline">
                                        {value.count} 篇
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {value.blogs.map((blog) => (
                                        <motion.div
                                            key={blog.id}
                                            whileHover={{ x: 10 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <Link to={`/detail/${blog.id}`}>
                                                <div className="flex items-center p-3 rounded-lg hover:bg-base-200 transition-colors duration-200 cursor-pointer">
                                                    <div className="flex-shrink-0 w-16 text-center mr-4">
                                                        <div className="text-sm font-medium text-base-content/60">
                                                            {dayjs(blog.createTime).format("MM-DD")}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-medium text-base-content hover:text-primary transition-colors duration-200">
                                                            {blog.title}
                                                        </h3>
                                                    </div>
                                                    <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/30" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
