import React from "react";
import gaw from '../assets/gaw.png'
import {motion} from "framer-motion";

const BeianInfo: React.FC = () => {
    return (
        <motion.div className="gap-2 hidden md:block fixed flex-col left-1 bottom-1 p-2 rounded text-sm text-accent-content"
                    initial={{opacity: 0, y: 10}}  // 初始状态：透明且稍微向下
                    animate={{opacity: 1, y: 0}}   // 动画到：完全显示且位置恢复
                    exit={{opacity: 0, y: -5}}    // 离开时的动画：透明且向上
                    transition={{duration: 0.5}}   // 过渡时间
        >

            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44011302004470" rel="noreferrer"
               className={'flex items-center'} target="_blank"><img src={gaw}
                                                                    className={'w-3 h-3 object-cover'}
                                                                    alt={'备案'}/>粤公网安备44011302004470</a>
            <a href={'https://beian.miit.gov.cn/#/Integrated/recordQuery'} target={'_blank'} rel={'noreferrer'}
               className={""}>备案号: 赣ICP备17011549号-1</a>
        </motion.div>
    );
};

export default BeianInfo;