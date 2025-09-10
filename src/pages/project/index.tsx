import { projectStore } from "@/providers/project";
import { useShallow } from "zustand/react/shallow";
import ProjectCard from "@/components/project_card";
import CardTitle from "@/components/title";
import { motion } from "framer-motion";
import React from "react";

export default function Page() {
    const [projects] = projectStore(useShallow((state) => [state.data]));

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">项目展示</h1>
                        <p className="text-base-content/70">
                            共 {projects.length} 个项目
                        </p>
                    </div>
                </div>

                {projects.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        {projects.map((value, index) => (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <ProjectCard project={value} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold mb-2">暂无项目</h3>
                        <p className="text-base-content/70">还没有添加任何项目</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
