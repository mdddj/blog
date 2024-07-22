import React, {useEffect} from "react";



/// 只显示一次,关掉后就不会显示了
const Ad: React.FC = () => {


    const [showAd, setShowAd] = React.useState(false);


    useEffect(() => {
        let isShow = localStorage.getItem("donTShowAgain")
        if (isShow == null) {
            setShowAd(true);
        }
    }, [showAd]);


    const donTShowAgain = () => {
        localStorage.setItem("donTShowAgain", "1");
        setShowAd(false);
    }
    if (!showAd) {
        return <></>
    }

    return <div className={'fixed hidden glass lg:block shadow-xl card bottom-2 left-2 bg-base-100 w-72'}>
        <div className={'card-body'}>
            <h6 className={'card-title'}>广告</h6>
            <ul>
                <li><a className={'link'} href={'https://3.cn/-22AJ5rC'}>京东服务器58一年</a></li>
            </ul>
            <div className={'card-actions justify-end'}>
                <button onClick={donTShowAgain} className={'btn-sm btn-outline'}>不再显示</button>
            </div>
        </div>
    </div>
}

export default Ad