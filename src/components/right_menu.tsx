import {categoryStore} from "@/providers/category";
import React, {PropsWithChildren, ReactNode} from "react";
import {Card, CardHeader, Link} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";


/**
 * 右侧导航
 * @constructor
 */
const RightMenu: React.FC = () => {

    const data = categoryStore((state) => state.data)
    let cates=  data?.categoryList??[]
    let tags = data?.tags ??[]
    let arts = data?.archiveModels??[]
    return <div>

        <Item title={'分类'}>
            <ul>
                {
                    cates.map(value => {
                        return <li key={value.id} className={'cursor-pointer'}><Link showAnchorIcon key={value.id}>{value.name}</Link></li>
                    })
                }
            </ul>
        </Item>

        <Item title={'标签'}>
            <ul>
                {
                    tags.map(value => {
                        return <li key={value.id} className={'cursor-pointer'}><Link showAnchorIcon key={value.id}>{value.name}</Link></li>
                    })
                }
            </ul>
        </Item>

        <Item title={'归档'}>
            <ul>
                {
                    arts.map(value => {
                        return <li key={value.months} className={'cursor-pointer'}><Link showAnchorIcon >{value.months}</Link></li>
                    })
                }
            </ul>
        </Item>
    </div>

}

type Prop = {
    title: string
}

const Item: React.FC<PropsWithChildren<Prop>> = (props) => {
    return <Card shadow={'none'}>
        <CardHeader>
            <div>{props.title}</div>
        </CardHeader>
        <CardBody>{props.children}</CardBody>
    </Card>
}

export default RightMenu