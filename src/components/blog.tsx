import {Blog} from "@/models/blog";
import {Card, CardHeader} from "@nextui-org/react";
import {Link} from "@@/exports";
import {CardBody, CardFooter} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import React from "react";
import {ReactComponent as TagIcon} from "@/assets/tag.svg"
import {Avatar} from "@nextui-org/avatar";

const BlogCard: React.FC<{ blog: Blog }> = ({blog}) => {
    return <Card key={blog.id}
                 className="py-4 cursor-pointer relative border border-gray-300 transition-transform duration-300 hover:border-blue-500 hover:transform hover:-translate-y-1 focus-within:border-green-500 focus-within:transform focus-within:-translate-y-1 focus-within:outline-none">
        <CardHeader>
            <Link to={`/detail/${blog.id}`}><h4 className="font-bold text-large">{blog.title}</h4></Link>
        </CardHeader>
        <CardBody>
            <div className={'flex flex-wrap gap-2'}>
                <Chip avatar={<Avatar src={blog.category.logo}/>}>{blog.category.name}</Chip> {
                blog.tags.map(tag => <Chip avatar={<TagIcon/>}>{tag.name}</Chip>)
            }
            </div>
        </CardBody>
    </Card>
}

export default BlogCard