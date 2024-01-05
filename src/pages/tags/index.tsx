import React from 'react';
import styles from './index.less';
import {categoryStore} from "@/providers/category";
import {Card, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Image} from "@nextui-org/image";
import CardTitle from "@/components/title";

export default function Page() {
    const tags = categoryStore((state) => state.data?.tags) ?? []

    return (
        <Card>
            <CardHeader>
                <CardTitle title={'标签'} />
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className={'flex flex-wrap gap-5'}>
                    {
                        tags.map(value => <Chip key={value.id}>{value.name}</Chip>)
                    }
                </div>
            </CardBody>
        </Card>
    );
}
