import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { copyFileSync } from "fs"
import { defineConfig, type Plugin } from "vite"

const notFoundPage = (): Plugin => ({
  name: "not-found-page",
  apply: "build",
  closeBundle() {
    copyFileSync("dist/index.html", "dist/404.html")
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), notFoundPage()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})