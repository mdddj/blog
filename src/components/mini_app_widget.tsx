import TextComponent from "@/components/text";


///微信小程序打开
const MiniAppWidget = () => {
    return <div tabIndex={0} className={'bg-base-100 dropdown-content z-[1] w-80'}>
        <TextComponent textKey={'web-mini-app'} isShadow={false} />
    </div>
}
export default MiniAppWidget