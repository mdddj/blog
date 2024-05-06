import React from "react";

const CardTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  return <h1 className={"font-bold  text-foreground"}>{title}</h1>
};
export default CardTitle;
