import React from 'react';
import MarkdownIt from 'markdown-it'
import "highlight.js/styles/github.css";
import hljs from 'highlight.js'
import {useParams, useSelectedRoutes} from "@@/exports";
import {blogStore} from "@/providers/blog";
import {Button, Card, CardHeader, Divider} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import CardTitle from "@/components/title";
import {ReactComponent as BackIcon} from "@/assets/back.svg";
import 'github-markdown-css/github-markdown-light.css'

const mdParser = new MarkdownIt({
    highlight: (str, lang) => {
        let code: any = mdParser.utils.escapeHtml(str)
        if (lang && hljs.getLanguage(lang)) {
            code = hljs.highlight(lang, str, true).value
        }
        return `<pre class="hljs"><code>${code}</code></pre>`
    },
    html: true,

})

interface IPros {
    text: string
}

const MarkDown: React.FC<IPros> = ({text}) => {

    return (
        <div className={'markdown-body'} dangerouslySetInnerHTML={{__html: mdParser.render(text)}}></div>
    )
}
export default function Page() {
    const params = useParams<{ id: string }>()
    const blog = blogStore((state) => state.blogs).find(value => `${value.id}` == params.id)
    return (
        <div>

            <Card>
                <CardHeader>
                    <div className={'flex items-center'}>
                        <Button isIconOnly size={'sm'} className={'mr-2'} aria-label="Like" onClick={()=>history.back()}>
                            <BackIcon className={'text-sm ml-1'}/>
                        </Button>

                        <CardTitle title={blog?.title ?? ''}/>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody className={'px-5'}>
                     <MarkDown text={blog?.content ?? ""}/>
                </CardBody>
            </Card>
        </div>
    );
}



