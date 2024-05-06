import { categoryStore } from "@/providers/category";
import React from "react";
import { Link } from "@nextui-org/react";
import filterBlogsProvider from "@/providers/filter_blog";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "@@/exports";
import MyMenuItem from "./menu_item";

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
      <MyMenuItem title={"分类"}>
        <>
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
        </>
      </MyMenuItem>

      <MyMenuItem title={"标签"}>
        <>
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
        </>
      </MyMenuItem>

      <MyMenuItem title={"归档"}>
        <>
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
        </>
      </MyMenuItem>
    </div>
  );
};

export default RightMenu;
