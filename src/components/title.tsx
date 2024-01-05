import React from "react";

const CardTitle:React.FC<{
    title: string
}> = ({title}) => {
    return <div className={'text-large font-bold text-foreground'}>{title}</div>
}
export default CardTitle