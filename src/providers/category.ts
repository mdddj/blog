import axios from "axios";
import {Api} from "@/tools/api";
import {ApiResponse} from "@/models/base";
import {CategoryResult} from "@/models/category";
import {create} from "zustand";


type Prop = {
    data: CategoryResult | undefined
    fetchData: () => void
}


/**
 * 加载归档数据
 */
async function fetchAllCategorys(): Promise<ApiResponse<CategoryResult>> {
    const response = await axios.get<ApiResponse<CategoryResult>>(Api.categoryApi)
    return response.data
}


/**
 * 分类
 */
export const categoryStore = create<Prop>((set) => {
    return ({
        data: undefined,
        fetchData: async () => {
            const result = await fetchAllCategorys()
            set((_) => ({data: result.data}))
        }
    })
})

categoryStore.getState().fetchData()