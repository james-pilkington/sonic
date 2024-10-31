import { defineConfig } from "vite";

export default defineConfig({
    build: { outDir: '..' },
  // needed for github pages just put the repo name here
  base: '/sonic/', 
});