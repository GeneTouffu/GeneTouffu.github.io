import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "blog",
  outDir: "dist/blog",
  base: '/blog/',
  cleanUrls: true,
  title: "Blog",
  description: "A VitePress Site",
  ignoreDeadLinks: true
})
