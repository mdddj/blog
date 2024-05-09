import { categoryStore } from "@/providers/category";
import CardTitle from "@/components/title";
import FilterBlogs from "@/components/filter_blogs";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const categorys = categoryStore((state) => state.data?.categoryList) ?? [];
  document.title = "分类";
  const [filter, label] = filterBlogsProvider(
    useShallow((state) => [state.doFilter, state.selectLabel])
  );
  return (
    <div>
      <div>
        <CardTitle title={"分类"} />
      </div>
      <div />
      <div>
        <div className={"flex flex-wrap gap-5"}>
          {categorys.map((value) => (
            <div
              className={"cursor-pointer" + `${label === value.name ? "text-secondary link" : ""}`}
              key={value.id}
              onClick={() => {
                filter.call(undefined, (b) =>
                  b.filter((blog) => blog.category.name === value.name)
                );
                filterBlogsProvider.setState({ selectLabel: value.name });
              }}
            >
              {value.name}
            </div>
          ))}
        </div>
        <FilterBlogs />
      </div>
    </div>
  );
}
