import React, { useEffect } from "react";
import { useParams } from "@@/exports";
import { blogStore } from "@/providers/blog";
import { Button, Card, CardHeader, Divider } from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
import CardTitle from "@/components/title";
import { ReactComponent as BackIcon } from "@/assets/back.svg";
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
    <div>
      <Card>
        <CardHeader>
          <div className={"flex items-center"}>
            <Button
              isIconOnly
              size={"sm"}
              className={"mr-2"}
              aria-label="Like"
              onClick={() => history.back()}
            >
              <BackIcon className={"text-sm ml-1"} />
            </Button>

            <CardTitle title={blog?.title ?? ""} />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className={"px-5"}>
          <MarkdownComponent text={blog?.content ?? ""} />
        </CardBody>
      </Card>
    </div>
  );
}
