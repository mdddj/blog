import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],

  npmClient: "pnpm",
  tailwindcss: {
    tailwindCssFilePath: "@/tailwind.css",
    tailwindConfigFilePath: "tailwind.config.js",
  },
  plugins: ["@umijs/plugins/dist/tailwindcss"],
  esbuildMinifyIIFE: true,
});
