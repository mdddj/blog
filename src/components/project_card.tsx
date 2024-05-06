import {Project} from "@/models/project";
import React from "react";


const ProjectCard: React.FC<{project: Project}> = ({ project }) => {

    return <div>
        <div className="flex gap-3">
            <img
                alt={project.logo}
                src={project.logo}
                className={'object-cover h-10 w-10'}
            />
            <div className="flex flex-col">
                <p className="text-md font-bold">{project.name}</p>
                <p className="text-small text-default-500">Number:{project.id}</p>
            </div>
        </div>
        <div/>
        <div>
            {project.description}
        </div>
        <div>
            <div className={'border-sm rounded-sm w-full border-default-200 dark:border-gray-100'}>
                <ul  color={'default'}>
                    <li key="download"><a href={project.github}>Github</a></li>
                    <li key="download"><a href={project.downloadUrl}>下载</a></li>
                    <li key="download"><a href={project.previewUrl}>预览</a></li>
                </ul>
            </div>
        </div>
    </div>
}

export default ProjectCard;

