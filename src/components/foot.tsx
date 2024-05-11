import React from "react";
import {ReactComponent as Github} from "@/assets/github.svg";
import {ReactComponent as Admin} from "@/assets/admin.svg";

const Foot: React.FC = () => {
    return <>
        <footer className="footer footer-center p-4  text-base-content flex-none">
            <div>
                <p>Copyright © 2024 - All right reserved by 梁典典 Ltd</p>
                <p className={'flex gap-2'}>
                    <a href={"https://github.com/mdddj"} rel={'noreferrer'} target={"_blank"} className={'link link-hover'}>
                        <Github className={"size-4 cursor-pointer"}/>
                    </a>
                    <a href={"https://admin.itbug.shop"} rel={'noreferrer'} target={"_blank"} className={'link link-hover'}>
                        <Admin className={"size-4 cursor-pointer"}/>
                    </a>
                    <span className={"text-content3-foreground text-small"}>
            赣ICP备17011549号-1
          </span>
                </p>
            </div>

        </footer>
    </>
};

export default Foot;
