import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // Carpeta raíz del proyecto
  base: "/", // Configuración de la ruta base para despliegue
  server: {
    port: 5173, // Puerto por defecto de Vite
  },
  build: {
    outDir: "dist", // Directorio donde se guardará la compilación
    rollupOptions: {
      input: {
        main: "./public/index.html", // Ruta al archivo HTML principal
        match: "./public/match.html", // Ruta a otros archivos HTML
        profile: "./public/profile.html", // Ruta a otros archivos HTML
      },
    },
  },
});
