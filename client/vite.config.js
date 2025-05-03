// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     allowedHosts: ["r9rz7s-3000.csb.app"], // Add your host here
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // Allow external access
//     strictPort: true,
//     port: 3000, // Make sure it's running on the correct port
//     cors: true,
//     allowedHosts: ['dataprivecy-4.onrender.com'],
//   },
//   build: {
//     outDir: "dist", // Ensure build output goes to the correct folder
//   },
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
