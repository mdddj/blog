import React from 'react';
import styles from './index.less';
import {categoryStore} from "@/providers/category";
import {Card, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Image} from "@nextui-org/image";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";

export default function Page() {
    const tags = categoryStore((state) => state.data?.tags) ?? []
    const filter = filterBlogsProvider((state)=>state.doFilter)
    return (
        <Card>
            <CardHeader>
                <CardTitle title={'标签'} />
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className={'flex flex-wrap gap-5'}>
                    {
                        tags.map(value => <Chip key={value.id} onClick={()=>{
                            filter.call(undefined,(b)=>b.filter((blog)=>blog.tags.some((v)=>v.name==value.name)))
                        }}>{value.name}</Chip>)
                    }
                </div>
                <FilterBlogs/>
            </CardBody>
        </Card>
    );
}
