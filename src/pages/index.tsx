import { blogStore } from "@/providers/blog";
import { useShallow } from "zustand/react/shallow";
import BlogCard from "@/components/blog";
import { Spinner } from "@nextui-org/react";


export default function HomePage() {
  document.title = "梁典典的博客, ";
  const [blogs, isLoading] = blogStore(
    useShallow((state) => [state.blogs, state.isLoading])
  );
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {blogs.length > 0 && (
        <div className="flex flex-col gap-4">
          {blogs.map((v) => {
            return <BlogCard blog={v} key={v.id} />;
          })}
        </div>
      )}
    </>
  );
}
