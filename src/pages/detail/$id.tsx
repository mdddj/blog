import {useEffect} from "react";
import {useParams} from "@@/exports";
import {blogStore} from "@/providers/blog";
import CardTitle from "@/components/title";
import {ReactComponent as BackIcon} from "@/assets/back.svg";
import MarkdownComponent from "@/components/markdown";

export default function Page() {
    const params = useParams<{ id: string }>();
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
        <>
            <CardTitle title={blog?.title ?? ""}/>
            <div className={'divider'}/>
            <MarkdownComponent text={blog?.content ?? ""}/>
        </>
    );
}
