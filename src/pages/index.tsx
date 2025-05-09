import { blogStore } from "@/providers/blog";
import { useShallow } from "zustand/react/shallow";
import BlogCard from "@/components/blog";
import LoadingWidget from "@/loading";


export default function HomePage() {
  document.title = "典典博客";
  const [blogs, isLoading] = blogStore(
    useShallow((state) => [state.blogs, state.isLoading])
  );
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <LoadingWidget/>
        </div>
      )}
      {blogs.length > 0 && (
        <div className="flex flex-col gap-10">
          {blogs.map((v) => {
            return <BlogCard blog={v} key={v.id} />;
          })}
        </div>
      )}
            {/*<BeianInfo />*/}
    </>
  );
}
