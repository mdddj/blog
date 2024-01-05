import { Button, Card, CardHeader } from "@nextui-org/react";
import { useEffect } from "react";
import { blogStore } from "@/providers/blog";
import { useShallow } from "zustand/react/shallow";
import {CardBody, CardFooter} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Link} from "umi";
import BlogCard from "@/components/blog";

export default function HomePage() {
  const [blogs] = blogStore(
    useShallow((state) => [state.blogs, state.fetchAll])
  );
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((v) => {
        return (
          <BlogCard blog={v} key={v.id}/>
        );
      })}
    </div>
  );
}
