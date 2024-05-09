import React from "react";

const CardTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  return <h1 className={"font-bold mb-2 text-3xl text-foreground"}>{title}</h1>;
};
export default CardTitle;
