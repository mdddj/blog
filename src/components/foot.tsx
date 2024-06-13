import React from "react";

const Foot: React.FC = () => {
    return <>
        <footer className="footer footer-center p-4  text-base-content flex-none">
            <div>
                <p>Copyright © 2024 - All right reserved by 梁典典 Ltd</p>
                <p className={'flex flex-wrap items-center justify-center gap-2'}>
                    <a href={"https://github.com/mdddj"} rel={'noreferrer'} target={"_blank"}
                       className={'link'}>
                        Github
                    </a>
                    <a href={"https://admin.itbug.shop"} rel={'noreferrer'} target={"_blank"}
                       className={'link'}>
                        后台
                    </a>
                    <a className={'link'}
                       href={'https://apifox.com/apidoc/shared-6f74775d-40ca-4a07-ad1e-dd9c8480f927'} rel={'noreferrer'} target={"_blank"}>Api</a>
                    <a href={'https://beian.miit.gov.cn/#/Integrated/recordQuery'} target={'_blank'} className={"text-content3-foreground text-small link"}>赣ICP备17011549号-1</a>
                </p>
            </div>

        </footer>
    </>
};

export default Foot;
