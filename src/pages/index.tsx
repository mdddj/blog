import { Button, Card, CardHeader } from "@nextui-org/react";
import yayJpg from "../assets/yay.jpg";
import { useEffect } from "react";
import { blogStore } from "@/providers/blog";
import { useShallow } from "zustand/react/shallow";

export default function HomePage() {
  const [blogs, fetchBlogs] = blogStore(
    useShallow((state) => [state.blogs, state.fetchAll])
  );
  useEffect(() => {
    fetchBlogs();
  }, []);
  console.log("build...");
  return (
    <div className="grid grid-cols-4 gap-4">
      {blogs.map((v) => {
        return (
          <Card key={v.id} className="py-4">
            <CardHeader>
              <h4 className="font-bold text-large">{v.title}</h4>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
