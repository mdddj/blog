import { Project } from "@/models/project";
import React from "react";
import { motion } from "framer-motion";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="h-full flex flex-col"
    >
      <div className={"card shadow-xl bg-base-100 rounded-2xl overflow-hidden h-full flex flex-col"}>
        <figure className="aspect-[16/9]">
          <img
            alt={project.name}
            src={project.logo}
            className={"object-cover w-full h-full"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"><rect width="400" height="225" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23999" text-anchor="middle" dy=".3em">No Image</text></svg>';
            }}
          />
        </figure>
        <div className="card-body flex flex-col flex-grow p-6">
          <h2 className={"card-title text-xl font-bold mb-2"}>{project.name}</h2>
          <p className="text-base-content/70 flex-grow">{project.description || '暂无描述'}</p>
          <div className={"card-actions justify-end mt-4 space-x-2"}>
            {project.github && (
              <a
                className={"btn btn-sm btn-outline"}
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            )}
            {project.downloadUrl && (
              <a
                className={"btn btn-sm btn-primary"}
                href={project.downloadUrl}
                target="_blank"
                rel="noreferrer"
              >
                下载
              </a>
            )}
            {project.previewUrl && (
              <a
                className={"btn btn-sm btn-secondary"}
                href={project.previewUrl}
                target="_blank"
                rel="noreferrer"
              >
                预览
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
