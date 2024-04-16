import {Project} from "@/models/project";
import React from "react";
import {Card, CardHeader, Divider, Image, Link, Listbox, ListboxItem} from "@nextui-org/react";
import {CardBody, CardFooter} from "@nextui-org/card";


const ProjectCard: React.FC<{project: Project}> = ({ project }) => {

    return <Card>
        <CardHeader className="flex gap-3">
            <Image
                alt={project.logo}
                radius="sm"
                src={project.logo}
                className={'object-cover h-10 w-10'}
            />
            <div className="flex flex-col">
                <p className="text-md font-bold">{project.name}</p>
                <p className="text-small text-default-500">Number:{project.id}</p>
            </div>
        </CardHeader>
        <Divider/>
        <CardBody>
            {project.description}
        </CardBody>
        <CardFooter>
            <div className={'border-sm rounded-sm w-full border-default-200 dark:border-gray-100'}>
                <Listbox variant={'shadow'} color={'default'}>
                    <ListboxItem key="download"><Link href={project.github}>Github</Link></ListboxItem>
                    <ListboxItem key="download"><Link href={project.downloadUrl}>下载</Link></ListboxItem>
                    <ListboxItem key="download"><Link href={project.previewUrl}>预览</Link></ListboxItem>
                </Listbox>
            </div>
        </CardFooter>
    </Card>
}

export default ProjectCard;

