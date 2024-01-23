const host = "https://api.itbug.shop";
// const host = "http://localhost:8082";
export namespace Api {
  export const blogsApi = `${host}/api/blog/list`;
  export const categoryApi  = `${host}/api/blog/statistics`
  export const friendApi = `${host}/api/public/friend/all`
  export const textApi = `${host}/api/blog/text`
}
