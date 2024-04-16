import axiosInstance, { categoryApi } from "@/tools/api";
import { ApiResponse } from "@/models/base";
import { CategoryResult } from "@/models/category";
import { create } from "zustand";


type Prop = {
    data: CategoryResult | undefined
    fetchData: () => void
}

/**
 * 加载归档数据
 */
async function fetchAllCategorys(): Promise<ApiResponse<CategoryResult>> {
    const response = await axiosInstance.get<ApiResponse<CategoryResult>>(categoryApi)
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
            set((state) => ({ ...state, data: result.data }))
        }
    })
})

categoryStore.getState().fetchData()