import React from 'react';
import {categoryStore} from "@/providers/category";
import {Card, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";
import {useShallow} from "zustand/react/shallow";

export default function Page() {
    const tags = categoryStore((state) => state.data?.tags) ?? []
    const [filter,label] = filterBlogsProvider(useShallow(state => [state.doFilter,state.selectLabel]))

    return (
        <Card>
            <CardHeader>
                <CardTitle title={'标签'} />
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className={'flex flex-wrap gap-5'}>
                    {
                        tags.map(value => <Chip color={label===value.name ? 'primary' : undefined} className={'cursor-pointer'} key={value.id} onClick={()=>{
                            filter.call(undefined,(b)=>b.filter((blog)=>blog.tags.some((v)=>v.name==value.name)))
                            filterBlogsProvider.setState({selectLabel: value.name})
                        }}>{value.name}</Chip>)
                    }
                </div>
                <FilterBlogs ending={blog => {
                    return <span className={'flex gap-2'}>
                        {
                            blog.tags.map(value => <span key={value.id} className={'text-sm text-default-500'}>{value.name}</span>)
                        }
                    </span>
                }} />
            </CardBody>
        </Card>
    );
}
