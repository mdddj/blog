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
      path: "/tags",
      component: "tags/index",
      title: "标签"
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
    }
  ],
  title: '梁典典的博客',
  npmClient: "pnpm",
  tailwindcss: {
    tailwindCssFilePath: 'tailwind.css',
    tailwindConfigFilePath: "tailwind.config.js",
  },
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  esbuildMinifyIIFE: true,
  publicPath: '/',
});
