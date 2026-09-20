import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Optional: named palette for reuse
        ink: "#0a0a0a", // black
        cream: "#f5f5f0", // off-white
        accent: "#f97316", // orange-500
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
