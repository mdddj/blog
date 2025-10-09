
export default function  ColumnText({title,value}:{title: string,value: string}){
    return <div className={'flex flex-col '}>
        <span className={'text-[10px] text-base-300'}>{title}</span>
        <span className={'text-[8px]'}>{value}</span>
    </div>
}