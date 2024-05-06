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
    },
    {
      path: "/tags",
      component: "tags/index",
    },
    {
      path: "/all",
      component: "all/index",
    },
    {
      path: "/links",
      component: "links/index",
    },
    {
      path: "/about",
      component: "about/index",
      title: "关于"
    },
    {
      path: "/projects",
      component: "project/index"
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
  publicPath: '/'
});
