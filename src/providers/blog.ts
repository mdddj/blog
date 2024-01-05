import { create } from "zustand";
import { Blog } from "@/models/blog";
import axios from "axios";
import { Api } from "@/tools/api";
import { ApiResponse } from "@/models/base";
type Props = {
  blogs: Blog[];
  fetchAll: () => void;
};
export const blogStore = create<Props>((set) => ({
  blogs: [],
  fetchAll: async () => {
    const response = await axios.get<ApiResponse<{ list: Blog[] }>>(
      Api.blogsApi,
      { params: { page: 1, pageSize: 10 } }
    );
    if (response.status === 200) {
      const data = response.data;
      if (data.success) {
        const blogs = data.data.list;
        set((state) => ({ blogs: [...state.blogs, ...blogs] }));
      }
    }
  },
}));

blogStore.getState().fetchAll()
