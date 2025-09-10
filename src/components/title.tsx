import React from "react";

const CardTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <h2 className={"font-bold text-2xl text-foreground border-l-4 border-primary pl-3"}>
      {title}
    </h2>
  );
};
export default CardTitle;
