import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import db from "@astrojs/db";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), solidJs()],
  output: "server",
  adapter: cloudflare(),
  experimental: {
    serverIslands: true,
  },
});
