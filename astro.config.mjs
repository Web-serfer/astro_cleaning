// @ts-check
import { defineConfig } from "astro/config";
import solidJs from '@astrojs/solid-js';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    integrations: [icon(), solidJs()],
    vite: {
        plugins: [tailwindcss()],
    },
    output: 'server',
    adapter: vercel(),
});