import React from "react";
import {categoryStore} from "@/providers/category";
import {Link} from "umi";
import CardTitle from "@/components/title";
import dayjs from "dayjs";

export default function Page() {
    const archives = categoryStore((state) => state.data?.archiveModels) ?? [];
    document.title = "归档";
    return (
        <div>
            {archives.map((value) => (
                <div key={value.months} className={"mb-5"}>
                    <div>
                        <CardTitle title={value.months}/>
                    </div>
                    <div>
                        {value.blogs.map((blog) => (
                            <Link
                                key={blog.id}
                                className={"text-foreground"}
                                to={`/detail/${blog.id}`}
                            >
                                <div key={blog.id}>
                    <span className={"mr-2 text-neutral"}>
                      {dayjs(blog.createTime).format("YYYY-MM-DD")}
                    </span>
                                    <span className={"text-primary"}>{blog.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
