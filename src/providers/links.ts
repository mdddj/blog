import { create } from "zustand";
import { FriendLink } from "@/models/friend";
import { ApiResponse } from "@/models/base";
import axiosInstance, { friendAddApi, friendApi } from "@/tools/api";

async function fetchData(): Promise<ApiResponse<FriendLink[]>> {
    const response = await axiosInstance.get<ApiResponse<FriendLink[]>>(friendApi);
    return response.data;
}

async function saveFriendLink(link: FriendLink): Promise<ApiResponse<FriendLink>> {
    const response = await axiosInstance.post<ApiResponse<FriendLink>>(friendAddApi, link);
    return response.data
}


type Props = {
    data: FriendLink[],
    fetchAll: () => void,
    add: (friend: FriendLink) => Promise<void>
}

export const linkStore = create<Props>((set) => {
    return {
        data: [],
        fetchAll: () => {
            fetchData().then(({ data }) => {
                set((v) => ({ ...v, data: data }))
            })
        },
        add: async friend => {
            await saveFriendLink(friend)
        }
    }
})

linkStore.getState().fetchAll()