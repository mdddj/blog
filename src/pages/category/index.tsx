import React from 'react';
import styles from './index.less';
import {categoryStore} from "@/providers/category";
import {Chip} from "@nextui-org/chip";
import {Image} from "@nextui-org/image";
import {Card, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";

export default function Page() {
    const categorys = categoryStore((state) => state.data?.categoryList) ?? []

    const filter = filterBlogsProvider((state)=>state.doFilter)
    return (
        <Card>
            <CardHeader>
                <CardTitle title={'分类'}/>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className={'flex flex-wrap gap-5'}>
                    {
                        categorys.map(value => <Chip key={value.id} onClick={()=>{
                          filter.call(undefined,(b)=> b.filter((blog)=>blog.category.name === value.name) )
                        }}
                                                     avatar={<Image src={value.logo}/>}>{value.name}</Chip>)
                    }
                </div>
                <FilterBlogs/>
            </CardBody>
        </Card>
    );
}
