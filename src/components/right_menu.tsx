import {categoryStore} from "@/providers/category";
import React, {PropsWithChildren, ReactNode} from "react";
import {Card, CardHeader, Link} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import filterBlogsProvider from "@/providers/filter_blog";
import {useShallow} from "zustand/react/shallow";
import {useNavigate} from "@@/exports";


/**
 * 右侧导航
 * @constructor
 */
const RightMenu: React.FC = () => {

    const data = categoryStore((state) => state.data)
    let cates=  data?.categoryList??[]
    let tags = data?.tags ??[]
    let arts = data?.archiveModels??[]


    const [filter] = filterBlogsProvider(useShallow(state => [state.doFilter]))
    const nav = useNavigate()


    return <div>

        <Item title={'分类'}>
            <ul>
                {
                    cates.map(value => {
                        return <li key={value.id} className={'cursor-pointer'}><Link showAnchorIcon onClick={()=>{
                            filter.call(undefined,(v)=>v.filter(value1 => value1.category.name === value.name))
                            filterBlogsProvider.setState(state => ({...state,selectLabel: value.name}))
                            nav("/category")
                        }} key={value.id}>{value.name}</Link></li>
                    })
                }
            </ul>
        </Item>

        <Item title={'标签'}>
            <ul>
                {
                    tags.map(value => {
                        return <li key={value.id} className={'cursor-pointer'}><Link onClick={() => {
                            filter.call(undefined,(v)=>v.filter(value1 => value1.tags.some((t)=>t.name === value.name)))
                            filterBlogsProvider.setState(state => ({...state,selectLabel: value.name}))
                            nav('/tags')
                        }} showAnchorIcon key={value.id}>{value.name}</Link></li>
                    })
                }
            </ul>
        </Item>

        <Item title={'归档'}>
            <ul>
                {
                    arts.map(value => {
                        return <li key={value.months} className={'cursor-pointer'}><Link showAnchorIcon onClick={()=>{
                            nav('/all')
                        }} >{value.months}</Link></li>
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