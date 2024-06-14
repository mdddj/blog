import React from "react";
import BeiAnSvg from "@/components/beian_svg";

const Foot: React.FC = () => {
    return <>
        <footer className="footer footer-center p-4 text-base text-base-content flex-none">
            <div>
                <p>Copyright © 2024 - All right reserved by 典典博客 Ltd</p>
                <p className={'flex flex-wrap items-center justify-center gap-6 mb-5'}>
                    <a href={"https://github.com/mdddj"} rel={'noreferrer'} target={"_blank"}
                       className={'link my-foot-link'}>
                        Github
                    </a>
                    <a href={"https://admin.itbug.shop"} rel={'noreferrer'} target={"_blank"}
                       className={'link my-foot-link'}>
                        管理后台
                    </a>
                    <a className={'link my-foot-link'}
                       href={'https://apifox.com/apidoc/shared-6f74775d-40ca-4a07-ad1e-dd9c8480f927'} rel={'noreferrer'}
                       target={"_blank"}>开放API接口</a>

                    <span>
                        博客源码 (<a className={'link'} href={'https://github.com/mdddj/blog'}>前端</a>)(<a
                        href={'https://github.com/mdddj/dd_server'} className={'link'}>后端</a>)
                    </span>

                    <a href={'https://beian.miit.gov.cn/#/Integrated/recordQuery'} target={'_blank'}
                       className={"my-foot-link link flex gap-0.5 items-center"}><BeiAnSvg/>赣ICP备17011549号-1</a>
                </p>
            </div>

        </footer>
    </>
};

export default Foot;
