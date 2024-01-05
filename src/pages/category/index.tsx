import React from 'react';
import styles from './index.less';
import {categoryStore} from "@/providers/category";
import {Chip} from "@nextui-org/chip";
import {Image} from "@nextui-org/image";
import {Card, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import CardTitle from "@/components/title";

export default function Page() {
    const categorys = categoryStore((state) => state.data?.categoryList) ?? []

    return (
        <Card>
            <CardHeader>
                <CardTitle title={'分类'}/>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className={'flex flex-wrap gap-5'}>
                    {
                        categorys.map(value => <Chip key={value.id}
                                                     avatar={<Image src={value.logo}/>}>{value.name}</Chip>)
                    }
                </div>
            </CardBody>
        </Card>
    );
}
