import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Replace with your backend server URL
        changeOrigin: true,
      },
    },
  },
  define: {
    "import.meta.env.REACT_APP_AUTH0_DOMAIN": JSON.stringify(
      "dev-m6gpc6c3duro7fwe.uk.auth0.com"
    ),
    "import.meta.env.REACT_APP_AUTH0_CLIENT_ID": JSON.stringify(
      "iNlWtish7j7fALX1SXQPg3efTLXydlIk"
    ),
  },
});
