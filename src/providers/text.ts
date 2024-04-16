import { create } from "zustand";
import axiosInstance, { textAllApi } from "@/tools/api";
import { ApiResponse } from "@/models/base";
import { TextModel } from "@/models/text";


type Props = {
    data: TextModel[],
    fetchData: () => void
}

export const textStore = create<Props>((set) => {
    return {
        data: [],
        fetchData: async () => {
            const { data: { data } } = await axiosInstance.get<ApiResponse<TextModel[]>>(textAllApi)
            set((state) => ({ ...state, data: data }))
        }
    }
})

textStore.getState().fetchData()