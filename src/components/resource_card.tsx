import React from "react";
import {Resource} from "@/models/base";
import {fromNow} from "@/tools/date";

type Prop = {
    item: Resource
}

const ResourceCard: React.FC<Prop> = ({item}) => {
    const {content,category: {name},user: {picture,nickName,enterprise},createDate,images} = item

    let enterpriseName = enterprise?.name

    return <div className={'card bg-base-100 shadow'}>
        <div className={'card-body'}>
            <div className={'flex flex-row gap-5 items-start'}>
                <div className={'flex-none w-16'}>
                    <img className={'avatar w-16 rounded-full'} src={picture} alt={nickName}/>
                </div>
                <div className={'grow flex flex-col gap-5'}>
                    <div className={'h-16 flex flex-col items-start justify-evenly'}>
                        <h2 className={'text-lg font-bold'}>{nickName}</h2>
                        <div className={'text-base-content/60'}> {enterpriseName ? `@${enterpriseName}` : ''} {fromNow(createDate)}</div>
                    </div>
                    <p className={'prose'}>
                        {content}
                    </p>

                    {
                        images.length !== 0 && <div className={'grid md:grid-cols-6 grid-cols-2 gap-2'}>
                            {
                                images.map(value => <img className={'rounded aspect-[1/1]'} src={value.url} alt={value.url} key={value.id} />)
                            }
                        </div>
                    }

                    <div className="badge badge-outline badge-lg">#{name}</div>
                </div>
            </div>
        </div>
    </div>
}
export default ResourceCard