import React from "react";
import MarkdownComponent from "@/components/markdown";
import { textStore } from "@/providers/text";

type Prop = {
  textKey: string,
  isShadow?: boolean
};

///字典组件
const TextComponent: React.FC<Prop> = ({ textKey,isShadow }) => {
  const list = textStore((state) => state.data);
  const find = list.find((item) => item.name === textKey);

  if(!find){
    return <p>暂无数据</p>
  }
  return <>{find && <MarkdownComponent text={find.context} isShadow={isShadow} />}</>;
};

export default TextComponent;
