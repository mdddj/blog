import React from "react";
import { categoryStore } from "@/providers/category";
import { Card, CardHeader, Divider } from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
import { Link } from "umi";
import CardTitle from "@/components/title";
import dayjs from "dayjs";

export default function Page() {
  const archives = categoryStore((state) => state.data?.archiveModels) ?? [];
  document.title = "归档";
  return (
    <div>
      {archives.map((value) => (
        <Card key={value.months} className={"mb-2"}>
          <CardHeader>
            <CardTitle title={value.months} />
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              {value.blogs.map((blog) => (
                <Link
                  key={blog.id}
                  className={"text-foreground"}
                  to={`/detail/${blog.id}`}
                >
                  <div key={blog.id}>
                    <span className={"mr-2 text-default-500"}>
                      {dayjs(blog.createTime).format("YYYY-MM-DD")}
                    </span>
                    <span className={"text-secondary"}>{blog.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
