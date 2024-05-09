import {Project} from "@/models/project";
import React from "react";


const ProjectCard: React.FC<{ project: Project }> = ({project}) => {

    return <div className={'card shadow-xl'}>
        <figure>
            <img
                alt={project.logo}
                src={project.logo}
                className={'object-cover'}
            />
        </figure>
        <div className="card-body">

            <div className={'card-title'}>
                {project.name}
            </div>
            <p>
                {project.description}
            </p>
            <div className={'card-actions justify-end'}>
                <a className={'link link-hover'} href={project.github}>Github</a>
                <a className={'link link-hover'} href={project.downloadUrl}>下载</a>
                <a className={'link link-hover'} href={project.previewUrl}>预览</a>
            </div>
        </div>
        <div/>
    </div>
}

export default ProjectCard;

