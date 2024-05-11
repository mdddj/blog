import {useEffect} from "react";
import {useNavigate, useParams} from "@@/exports";
import {blogStore} from "@/providers/blog";
import CardTitle from "@/components/title";
import MarkdownComponent from "@/components/markdown";
import {fromNow} from "@/tools/date";
import BackSvg from "@/components/back_svg";

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
                    blog && <div className={'flex gap-2 items-center mt-2 badge badge-ghost p-3'}><img src={blog.category.logo} alt={blog.category.name} className={'w-5 h-5 rounded-full'}/><span>{blog.category.name}</span></div>
                }
            </div>
            <div className={'h-10'}/>
            <div className="relative">
                    <div className="fixed -ml-28 mt-5">
                        <button type={'button'} className="btn btn-circle" onClick={()=>nav(-1)}>
                            <BackSvg/>
                        </button>
                    </div>
                <MarkdownComponent text={blog?.content ?? ""}/>
            </div>
        </div>
    );
}
