import React from "react";
import {useParams} from "@@/exports";
import useAxios from "axios-hooks";
import {groupResourceList} from "@/tools/api";
import Loading from "@/components/loading";
import {ApiResponse, Resource} from "@/models/base";
import ResourceCard from "@/components/resource_card";

const ResourceListWidget: React.FC = () => {
    const params = useParams()
    const id = params.id
    if (!id) {
        return <div>not found</div>
    }

    const [{data,loading}] = useAxios<ApiResponse<Resource[]>>({url: groupResourceList,params:{id}})
    if(loading) return <Loading />
    return <div className={'flex flex-col gap-5'}>
        {
            data?.data?.map(value => <ResourceCard item={value} key={value.id} />)
        }
        {
            data && data.data.length === 0 && <div className={'text-center h-max text-base-content/60'}>正在创作中</div>
        }
    </div>
}

export default ResourceListWidget