import {useEffect} from "react";
import {useNavigate, useParams} from "@@/exports";
import {blogStore} from "@/providers/blog";
import CardTitle from "@/components/title";
import MarkdownComponent from "@/components/markdown";
import {fromNow} from "@/tools/date";
import BackSvg from "@/components/back_svg";
import ApiSvg from "@/components/api_svg";

export default function Page() {
    const params = useParams<{ id: string }>();
    const nav = useNavigate()
    const blog = blogStore((state) => state.blogs).find(
        (value) => `${value.id}` === params.id
    );

    const updateTitle = () => {
        if (blog) {
            document.title = blog.title;
        }
    };

    useEffect(() => {
        updateTitle();
    }, [blog?.title]);

    return (
        <div>
            <CardTitle title={blog?.title ?? ""}/>
            <div className={'mt-2'}>
                {
                    blog && <span className={'text-base-content'}>{blog.author}发布于 {fromNow(blog.createTime)}</span>
                }
                {
                    blog &&
                    <div className={'flex justify-between'}>
                        <div className={'flex gap-2 items-center mt-2 badge badge-ghost p-3'}><img
                            src={blog.category.logo}
                            alt={blog.category.name}
                            className={'w-5 h-5 rounded-full'}/><span>{blog.category.name}</span>
                        </div>
                        <a className={'text-base-content'} target={'_blank'} href={`https://admin.itbug.shop/blog/add?update=${blog.id}`}>编辑</a>
                    </div>
                }
                {
                    blog && blog.tags.length > 0 && <div className={'flex flex-wrap gap-2 mt-4 items-center'}>
                        <span>标签:</span>
                        {
                            blog.tags.map(tag => <span key={tag.id} className={'badge'}>#{tag.name}</span>)
                        }
                    </div>
                }
            </div>
            <div className={'h-10'}/>
            <div className="relative">
                <div className="fixed -ml-28 mt-5 flex flex-col gap-5">
                    <div className={'tooltip tooltip-left'} data-tip={'返回'}>
                        <button type={'button'} className="btn btn-circle" onClick={() => nav(-1)}>
                            <BackSvg/>
                        </button>
                    </div>
                    <div className={'tooltip tooltip-left'} data-tip={'API接口'}>
                        <a target={'_blank'} href={`https://api.itbug.shop/api/blog/get/${params?.id}`}>
                            <button type={'button'} className={'btn btn-circle btn-ghost'}>
                                <ApiSvg/>
                            </button>
                        </a>
                    </div>

                </div>
                <MarkdownComponent text={blog?.content ?? ""}/>
            </div>
        </div>
    );
}
