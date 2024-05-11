import {FriendLink} from "@/models/friend";
import React from "react";


///
const LinkItemLayout: React.FC<{ link: FriendLink }> = ({link}) => {

    return <>
        <div className={'card shadow bg-base-100'}>
            <figure className={'aspect-[1/1] '}><img alt={link.name} src={link.logo} className={'aspect-[1/1] object-cover'}/></figure>
            <div className={'card-body'}>
                <h2 className={'card-title'}><a href={link.url} target={'_blank'} rel={'noreferrer'} className={'link'}>{link.name}</a></h2>
                <p>{link.intro}</p>
                <div className={'card-actions justify-end'}>

                </div>
            </div>
        </div>
    </>
}

export default LinkItemLayout