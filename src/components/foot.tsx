import React from "react";
import { ReactComponent as Github } from "@/assets/github.svg";
import { ReactComponent as Admin } from "@/assets/admin.svg";

const Foot: React.FC = () => {
  return (
    <div>
      <div
        className={"flex justify-between gap-2 text-sm items-center pt-2 px-2"}
      >
        <div className={"flex gap-2"}>
          <a href={"https://github.com/mdddj"} target={"_blank"}>
            <Github className={"size-4  hover:scale-125  cursor-pointer"} />
          </a>
          <a href={"https://admin.itbug.shop"} target={"_blank"}>
            <Admin className={"size-4  hover:scale-125  cursor-pointer"} />
          </a>
        </div>

        <div>
          <span className={"text-content3-foreground text-small"}>
            赣ICP备17011549号-1
          </span>
        </div>
      </div>
    </div>
  );
};

export default Foot;
