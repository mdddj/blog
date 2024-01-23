import React from "react";
import {ApiResponse} from "@/models/base";
import {TextModel} from "@/models/text";
import axios from "axios";
import {Api} from "@/tools/api";
import useRequest from "@ahooksjs/use-request";
import {Spinner} from "@nextui-org/react";
import MarkdownComponent from "@/components/markdown";


type Prop = {
    textKey: string
}

async function getTextModelByName(name: string) : Promise<ApiResponse<TextModel>> {
    const response =  await axios.get<ApiResponse<TextModel>>(Api.textApi,{params: {name}})
    return response.data
}

///字典组件
const TextComponent: React.FC<Prop> = ({textKey}) => {

    const {loading,data,error} = useRequest(()=>getTextModelByName(textKey))
    return <>
        {
            error && <span>{error.message}</span>
        }
        {
            loading && <Spinner />
        }
        {
            data && <MarkdownComponent text={data.data.context} />
        }
    </>
}


export default TextComponent

