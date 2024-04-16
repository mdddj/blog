import { categoryStore } from "@/providers/category";
import React, { PropsWithChildren } from "react";
import { Card, CardHeader, Link } from "@nextui-org/react";
import { CardBody } from "@nextui-org/card";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "@@/exports";

type Prop = {
  title: string;
};

const Item: React.FC<PropsWithChildren<Prop>> = (props) => {
  return (
    <Card shadow={"none"}>
      <CardHeader>
        <div>{props.title}</div>
      </CardHeader>
      <CardBody>{props.children}</CardBody>
    </Card>
  );
};

/**
 * 右侧导航
 * @constructor
 */
const RightMenu: React.FC = () => {
  const data = categoryStore((state) => state.data);
  let cates = data?.categoryList ?? [];
  let tags = data?.tags ?? [];
  let arts = data?.archiveModels ?? [];

  const [filter] = filterBlogsProvider(useShallow((state) => [state.doFilter]));
  const nav = useNavigate();

  return (
    <div>
      <Item title={"分类"}>
        <div>
          {cates.map((value) => {
            return (
              <div key={value.id} className={"cursor-pointer"}>
                <Link
                  showAnchorIcon
                  onClick={() => {
                    filter.call(undefined, (v) =>
                      v.filter((value1) => value1.category.name === value.name)
                    );
                    filterBlogsProvider.setState((state) => ({
                      ...state,
                      selectLabel: value.name,
                    }));
                    nav("/category");
                  }}
                  key={value.id}
                >
                  {value.name}
                </Link>
              </div>
            );
          })}
        </div>
      </Item>

      <Item title={"标签"}>
        <div>
          {tags.map((value) => {
            return (
              <div key={value.id} className={"cursor-pointer"}>
                <Link
                  onClick={() => {
                    filter.call(undefined, (v) =>
                      v.filter((value1) =>
                        value1.tags.some((t) => t.name === value.name)
                      )
                    );
                    filterBlogsProvider.setState((state) => ({
                      ...state,
                      selectLabel: value.name,
                    }));
                    nav("/tags");
                  }}
                  showAnchorIcon
                  key={value.id}
                >
                  {value.name}
                </Link>
              </div>
            );
          })}
        </div>
      </Item>

      <Item title={"归档"}>
        <div>
          {arts.map((value) => {
            return (
              <div key={value.months} className={"cursor-pointer"}>
                <Link
                  showAnchorIcon
                  onClick={() => {
                    nav("/all");
                  }}
                >
                  {value.months}
                </Link>
              </div>
            );
          })}
        </div>
      </Item>
    </div>
  );
};

export default RightMenu;
