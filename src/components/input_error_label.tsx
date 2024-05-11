import React from "react";

export default function InputErrorLabel(message: string | undefined)     {

    return <>
        {
            message &&
            <div className={'label'}>
                <div className={'label-text-alt'}>{message}</div>
            </div>
        }
    </>
}

export  function InputErrorClass(message: string | undefined) : string {
    return message ? 'input-error' : ''
}