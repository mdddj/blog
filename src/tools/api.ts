import axios from 'axios';
const host = "https://api.itbug.shop";
 // const host = "http://localhost:8082";

export const blogsApi = `/api/blog/all`;
export const categoryApi = `/api/blog/statistics`
export const friendApi = `/api/public/friend/all`
export const friendAddApi = `/api/friend/save`
export const textAllApi = '/api/blog/getTextAll'
export const projectListApi = "/api/blog/projects"
export const groupListApi = "/api/rc/cates"
export const groupResourceList = "/api/app/resource/findByCateId"
export const docGet = "/api/public/directory/doc/"

//自定义错误信息
class BizException extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }

    toString(): string {
        return this.message
    }
}

// 创建 Axios 实例
const axiosInstance = axios.create({
    baseURL: host, // 你的 API 地址
    timeout: 5000, // 请求超时时间
});

// 响应拦截器  
axiosInstance.interceptors.response.use(
    (response) => {
        const { state, message } = response.data;
        if (state !== 200 && message !== undefined) {
            throw new BizException(message)
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
