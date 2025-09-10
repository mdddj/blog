import React, { ReactNode } from "react";
import filterBlogsProvider from "@/providers/filter_blog";
import { Link } from "umi";
import { Blog } from "@/models/blog";
import { motion } from "framer-motion";
import dayjs from "dayjs";

type Props = {
    ending?: (blog: Blog) => ReactNode;
};
const FilterBlogs: React.FC<Props> = ({ ending }) => {
    const blogs = filterBlogsProvider((state) => state.blogs);
    return (
        <div className={"flex flex-col gap-4"}>
            {blogs.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-5xl mb-4">-empty-</div>
                    <p className="text-base-content/70">空空如也</p>
                </div>
            )}
            {blogs.map((value, index) => {
                return (
                    <motion.div
                        key={value.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className={"card bg-base-100 shadow-xl rounded-2xl overflow-hidden"}>
                            <div className={'card-body p-6'}>
                                <Link
                                    className={'card-title link link-hover text-xl font-bold mb-2'}
                                    to={`/detail/${value.id}`}
                                >
                                    {value.title}
                                </Link>
                                <div className="text-sm text-base-content/60 mb-3">
                                    {dayjs(value.createTime).format("YYYY-MM-DD HH:mm")}
                                </div>
                                {ending && <div className={'card-actions'}>{ending(value)}</div>}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FilterBlogs;
