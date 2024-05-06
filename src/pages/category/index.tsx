import { categoryStore } from "@/providers/category";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Card, CardHeader, Divider } from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
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
    <Card>
      <CardHeader>
        <CardTitle title={"分类"} />
      </CardHeader>
      <Divider />
      <CardBody>
        <div className={"flex flex-wrap gap-5"}>
          {categorys.map((value) => (
            <Chip
              color={label === value.name ? "primary" : undefined}
              className={"cursor-pointer"}
              key={value.id}
              onClick={() => {
                filter.call(undefined, (b) =>
                  b.filter((blog) => blog.category.name === value.name)
                );
                filterBlogsProvider.setState({ selectLabel: value.name });
              }}
              avatar={<Image src={value.logo} />}
            >
              {value.name}
            </Chip>
          ))}
        </div>
        <FilterBlogs />
      </CardBody>
    </Card>
  );
}
