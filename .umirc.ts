import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {path: "/", component: "index"},
        {
            path: '/detail/:id', component: 'detail/$id.tsx'
        },
        {
            path: '/category', component: 'category/index'
        },
        {
            path: '/tags',component: 'tags/index'
        },
        {
            path: '/all',component: 'all/index'
        },
        {
            path: '/links',component: 'links/index'
        },
        {
            path: '/about',component: 'about/index'
        }
    ],

    npmClient: "pnpm",
    tailwindcss: {
        tailwindCssFilePath: "@/tailwind.css",
        tailwindConfigFilePath: "tailwind.config.js",
    },
    plugins: ["@umijs/plugins/dist/tailwindcss"],
    esbuildMinifyIIFE: true,
});
