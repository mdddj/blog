import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    {
      path: "/detail/:id",
      component: "detail/$id.tsx",
    },
    {
      path: "/category",
      component: "category/index",
      title: "分类"
    },
    {
      path: "/single/:key",
      component: "single/$key.tsx",
      title: "单页"
    },
    {
      path: "/tags",
      component: "tags/index",
      title: "标签"
    },
    {
      path: "/idea/:title",
      component: "doc/doc_page",
      title: "学习笔记"
    },
    {
      path: "/all",
      component: "all/index",
      title: "归档"
    },
    {
      path: "/links",
      component: "links/index",
      title: "友链"
    },
    {
      path: "/about",
      component: "about/index",
      title: "关于"
    },
    {
      path: "/projects",
      component: "project/index",
      title: "项目"
    },
    {
      path: '/g',
      component: 'group/index',
      title: '群组',
      routes: [
        {
          path: '/g/:id',
          component: 'group/list',
        }
      ]
    }
  ],
  title: '典典的博客',
  npmClient: "pnpm",
  tailwindcss: {
    tailwindCssFilePath: 'tailwind.css',
    tailwindConfigFilePath: "tailwind.config.js",
  },
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  esbuildMinifyIIFE: true,
  publicPath: '/',
  favicons: [
    "/favicon.ico",
  ],
  metas: [
    { name: 'keywords', content: '典典博客,梁典典,梁典典的博客,flutter博客,flutter' },
    { name: 'description', content: '欢迎来到典典博客，这里是梁典典的个人博客，专注于Flutter开发教程和心得分享。如果你对Flutter开发感兴趣，请关注梁典典的博客，获取最新的Flutter资讯和技术分享。' },
  ],
  //  mako: {}
});
