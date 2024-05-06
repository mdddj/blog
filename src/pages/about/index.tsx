import React from "react";
import CardTitle from "@/components/title";
import TextComponent from "@/components/text";

export default function Page() {
  document.title = "关于";
  return (
    <div>
      <div>
        <CardTitle title={"关于"} />
      </div>
      <div />
      <div>
        <TextComponent textKey={"about"} />
      </div>
    </div>
  );
}
