import React from "react";
import { categoryStore } from "@/providers/category";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  document.title = "标签";
  const tags = categoryStore((state) => state.data?.tags) ?? [];
  const [filter, label] = filterBlogsProvider(
    useShallow((state) => [state.doFilter, state.selectLabel])
  );

  return (
    <div>
      <div>
        <CardTitle title={"标签"} />
      </div>
      <div />
      <div>
        <div className={"flex flex-wrap gap-5"}>
          {tags.map((value) => (
            <div
              color={label === value.name ? "primary" : undefined}
              className={"cursor-pointer"}
              key={value.id}
              onClick={() => {
                filter.call(undefined, (b) =>
                  b.filter((blog) =>
                    blog.tags.some((v) => v.name === value.name)
                  )
                );
                filterBlogsProvider.setState({ selectLabel: value.name });
              }}
            >
              {value.name}
            </div>
          ))}
        </div>
        <FilterBlogs
          ending={(blog) => {
            return (
              <span className={"flex gap-2"}>
                {blog.tags.map((value) => (
                  <span key={value.id} className={"text-sm text-default-500"}>
                    {value.name}
                  </span>
                ))}
              </span>
            );
          }}
        />
      </div>
    </div>
  );
}
