import {create} from "zustand";
import axiosInstance, {projectListApi} from "@/tools/api";
import {ApiResponse} from "@/models/base";
import {Project} from "@/models/project";


type Props = {
    data: Project[],
    fetchData: () => void
}

export const projectStore = create<Props>((set) => {
    return {
        data: [],
        fetchData: async () => {
            try{
                const { data: { data } } = await axiosInstance.get<ApiResponse<Project[]>>(projectListApi)
                set((state) => ({ ...state, data: data }))
            }catch(error) {
                set((state) => ({ ...state, data: [] }))
            }
        }
    }
})

projectStore.getState().fetchData()