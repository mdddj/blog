import React from "react";
import MarkdownComponent from "@/components/markdown";
import { textStore } from "@/providers/text";

type Prop = {
  textKey: string;
};

///字典组件
const TextComponent: React.FC<Prop> = ({ textKey }) => {
  const list = textStore((state) => state.data);
  const find = list.find((item) => item.name === textKey);

  return <>{find && <MarkdownComponent text={find.context} />}</>;
};

export default TextComponent;
