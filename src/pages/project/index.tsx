import { projectStore } from "@/providers/project";
import { useShallow } from "zustand/react/shallow";
import ProjectCard from "@/components/project_card";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Loading from "@/components/loading";

const GithubProjectCard = ({ repo }: { repo: any }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
      className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-6 flex flex-col h-full"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="grow"
      >
        <h3 className="text-xl font-bold text-primary mb-2 truncate">
          {repo.name}
        </h3>
        <p className="text-base-content/70 text-sm mb-4 h-10 overflow-hidden">
          {repo.description || "No description provided."}
        </p>
      </a>
      <div className="flex items-center justify-between text-sm text-base-content/60 mt-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.446a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.37-2.446a1 1 0 00-1.175 0l-3.37 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.34 9.392c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.965z" />
            </svg>
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H5a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {repo.forks_count}
          </span>
        </div>
        <span className="text-xs px-2 py-1 bg-base-200 rounded-full">
          {repo.language}
        </span>
      </div>
    </motion.div>
  );
};

export default function Page() {
  const [projects] = projectStore(useShallow((state) => [state.data]));

  const [{ data, loading }] = useAxios(
    "https://api.github.com/search/repositories?q=user:mdddj&sort=stars&order=desc&per_page=100",
  );

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (data && data.items) {
      setRepos(data.items);
    }
  }, [data]);

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

            <p className="text-base-content/70">共 {projects.length} 个项目</p>
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
                transition={{
                  duration: 0.3,

                  delay: index * 0.1,
                }}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">GitHub Repositories</h2>

          <p className="text-base-content/70">我在 GitHub 上的开源项目</p>
        </div>

        {loading && <Loading />}

        {repos.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {repos.map((repo: any, index: number) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,

                  delay: index * 0.1,
                }}
              >
                <GithubProjectCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
