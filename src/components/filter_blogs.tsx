import React, {ReactNode} from "react";
import filterBlogsProvider from "@/providers/filter_blog";
import {Link} from "umi";
import {Blog} from "@/models/blog";

type Props = {
    ending?: (blog: Blog) => ReactNode;
};
const FilterBlogs: React.FC<Props> = ({ending}) => {
    const blogs = filterBlogsProvider((state) => state.blogs);
    return (
        <div className={"flex flex-col gap-2 mt-5"}>
            {blogs.length === 0 && <div className="text-center">空空如也</div>}
            {blogs.map((value) => {
                return (
                    <div
                        key={value.id}
                        className={"card shadow-2xl rounded-2xl "}
                    >
                        <div className={'card-body'}>
                            <Link className={'card-title link link-hover'} to={`/detail/${value.id}`}>{value.title}</Link>
                            {ending && <div className={'card-actions'}>{ending(value)}</div>}

                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FilterBlogs;
