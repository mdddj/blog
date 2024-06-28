import React from "react";
import gaw from '../assets/gaw.png'

const Foot: React.FC = () => {
    return <>
        <footer className="footer footer-center p-4 text-base text-base-content flex-none">
            <div>
                <p>Copyright © 2024 - All right reserved by 典典博客 Ltd</p>
                <p className={'flex flex-wrap items-center justify-center gap-4 mb-5'}>
                    <a href={"https://github.com/mdddj"} rel={'noreferrer'} target={"_blank"}
                    >
                        Github
                    </a>
                    <a href={"https://admin.itbug.shop"} rel={'noreferrer'} target={"_blank"}>
                        管理后台
                    </a>
                    <a
                        href={'https://apifox.com/apidoc/shared-6f74775d-40ca-4a07-ad1e-dd9c8480f927'}
                        rel={'noreferrer'}
                        target={"_blank"}>开放API接口</a>

                    <span>
                        博客源码 (<a href={'https://github.com/mdddj/blog'}>前端</a>)(<a
                        href={'https://github.com/mdddj/dd_server'}>后端</a>)
                    </span>


                    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44011302004470" rel="noreferrer"
                       className={'flex gap-1 items-center'} target="_blank"><img src={gaw}
                                                                                  className={'w-4 h-4 object-cover'}
                                                                                  alt={'备案'}/>粤公网安备44011302004470</a>
                    <a href={'https://beian.miit.gov.cn/#/Integrated/recordQuery'} target={'_blank'}
                       className={""}>赣ICP备17011549号-1</a>
                </p>
            </div>

        </footer>
    </>
};

export default Foot;
