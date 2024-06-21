import TextComponent from "@/components/text";


///微信小程序打开
const MiniAppWidget = () => {
    return <div tabIndex={0} className={'card compact dropdown-content z-[1] shadow-2xl bg-base-100 rounded-box w-96 p-5 border border-gray-200'}>
        <TextComponent textKey={'web-mini-app'} isShadow={false} />
    </div>
}
export default MiniAppWidget