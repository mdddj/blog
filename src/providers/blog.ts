import { create } from "zustand";
import { Blog } from "@/models/blog";
import axiosInstance, { blogsApi } from "@/tools/api";
import { ApiResponse } from "@/models/base";
type Props = {
  blogs: Blog[];
  isLoading: boolean;
  fetchAll: () => void;
};
export const blogStore = create<Props>((set) => ({
  blogs: [],
  isLoading: true,
  fetchAll: async () => {
    const response = await axiosInstance.get<ApiResponse<Blog[]>>(
      blogsApi);
    if (response.status === 200) {
      const data = response.data;
      if (data.success) {
        const blogs = data.data;
        set((state) => ({ ...state, blogs: [...state.blogs, ...blogs], isLoading: false }));
      }
    } else {
      set((old) => ({ ...old, isLoading: false }))
    }

  },
}));

blogStore.getState().fetchAll()
